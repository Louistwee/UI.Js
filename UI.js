var logindex = 0;
function l(a){
  console.log((logindex++) + a);
}
//Create the base object
window.UI = (function(window){
  var UI = {
    //get the basePath of UI.js 
    basePath:(function(window){
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        if(scripts[i].src.split('UI.js').length > 1){
          var basePath = scripts[i].src.split('UI.js')[0];
        }
      }
      return basePath;
    })(window),
    //URL: string relative to 
    getURL:function(URL){
      return this.basePath + URL;
    },
    //Load a script
    loadScript:function(URL,callback){
      var script = document.createElement('script');
      var anotherscript = document.getElementsByTagName('script')[0];
      var once = false;
      script.type = 'text/javascript';
      script.src = URL;
      script.onload = script.onreadystatechange = function(){
        if ( !once && (!this.readyState || this.readyState == 'complete') ){
          once = true;
          if(callback){
            callback();
          }
        }
      }
      anotherscript.parentNode.insertBefore(script, anotherscript);
    },
    //combination of getURL and loadScript
    loadURL:function(URL,callback){
      this.loadScript(this.getURL(URL),callback)
    },
    //list of all functions that are appended when an object is created;
    createobject:function(){
      var a = {};
      a.__proto__ = this.fn;
      return a;
    },
    fn:{
      //get/load an object from the UI 
      get:function(objectName){
        if(this.paused){
          this.pauseList.push({fn:this.get,param:objectName});
          return this;
        }
        if(this[objectName]){
          return this[objectName];
          //return this;
        }else{
          function callback(th){
            th.start();
          }
          this.loadScript({
            objectPath:objectName+'.js',
            callback:callback,
          });
          return this.pause();
        }
      },
      //use .run() if you want ot add the fn to the pauseList otherwise when you want to run it directly
      run:function(fnName,param){
        l('run')
        var th = this;
        var pauseFn = function(){
          l('pauseFn')
          if(!th[fnName]){
            l('notloaded')
            function callback(th){
              l('start')
              th.start();
            }
            th.loadScript({
              objectPath:fnName+'.js',
              callback:callback,
            });
            th.pause();
            th.pauseList.splice(0,0,{fn:pauseFn,param:param})
          }else{
            l('isloading')
            return th[fnName](param);
          }
        }
        if(this.paused){
          l('ispaused');
          this.pauseList.push({fn:pauseFn,param:param});
        }else{
          l('notpaused');
          pauseFn();
        }
        return this;
      },
      pause:function(){
        this.paused = true;
        this.pauseList = [];
        return this;
      },
      start:function(){
        this.paused = false;
        while (!(!this.pauseList.length||this.paused)) {
          var method = this.pauseList.splice(0, 1)[0];
          var answ = method.fn.call(this,method.param);
        }
        return this;
      },
      //this is a test fn
      loadScript:function(param){
        var th = this;
        if(param.objectPath === 'say.js'){
          setTimeout(function(){
            th.say = function(param){
              alert(param.word);
            }
            param.callback(th);
          },1000)
        }
      }
    },
  }
  return UI;
})(window);
//example
UI.createobject().run('say',{word:'hi1'}).run('say',{word:'hi2'});
