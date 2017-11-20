//Create the base object
window.UI = (function (window) {
  var UIobj = {
    //get the basePath of UI.js 
    basePath: (function (window) {
      var scripts = document.getElementsByTagName('script');
      var basePath;
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.split('UI.js').length > 1) {
          basePath = scripts[i].src.split('UI.js') [0];
        }
      }
      return basePath;
    }) (window),
    path: 'UI',
    /**
    * @function UI.loadScript();
    * This fuction loads a script;
    * @param {object} src the src
    * @return {Promise}
    */
    loadScript: function (src,testFn) {
      if(!UI.loadScript.scripts){
        UI.loadScript.scripts = {};
      }
      if(src in UI.loadScript.scripts){
        var script = UI.loadScript.scripts[src];
        if(script.state === 'fail'){
          return new Promise(function(resolve,reject){
            reject(script.scriptElement);
          });
        }else if(script.state === 'succes'){
          return new Promise(function(resolve,reject){
            resolve(script.scriptElement);
          });
        }else if(script.state === 'loading'){
          return new Promise(function(resolve,reject){
            script.queue.push([resolve,reject]);
          });
        }
      }
      return new Promise(function(realResolve,realReject){
        UI.loadScript.scripts[src] = {
          state:'loading',
          queue:[],
        };
        var script = UI.loadScript.scripts[src];
        function resolve(el){
          script.state = 'succes';
          script.scriptElement = el;
          realResolve(el);
          for (var i = 0; i < script.queue.length; i++) {
            script.queue[i][0](el);
          }
        };
        function reject(el){
          script.state = 'fail';
          script.scriptElement = el;
          realReject(el);
          for (var i = 0; i < script.queue.length; i++) {
            script.queue[i][1](el);
          }
        };
        try{
          var scriptElement = document.createElement('script');
          var anotherScript = document.getElementsByTagName('script') [0];
          scriptElement.type = 'text/javascript';
          if(scriptElement.onload === undefined || scriptElement.onerror === undefined){//IE
            scriptElement.onreadystatechange = function () {
              if (!this.readyState || this.readyState == 'complete') {
                setTimeout(function(){
                  try{
                    if(testFn && !testFn(scriptElement)){
                      reject(scriptElement);
                      return;
                    }
                    resolve(scriptElement);
                  }catch(err){
                    reject(scriptElement);
                  }
                },0) 
              }
            };
          }else{
            scriptElement.onload = function () {
              if(testFn){
                if(!testFn(scriptElement)){
                  reject(scriptElement);
                  return;
                }
              }
              resolve(scriptElement);
            };
            scriptElement.onerror = function() {
              reject(scriptElement);
            }
          }
          let parentNode = anotherScript ? anotherScript.parentNode : document.head;
          anotherScript.parentNode.insertBefore(scriptElement, anotherScript);
          scriptElement.src = src;
        }catch(err){
          reject(err);
        }
      });
    },
  };
  var UI = function(obj,isPromise){
    if(!obj){
      obj = UI;
    }
    if(isPromise){
      var pr = new Promise(obj);
    }else{
      var pr = new Promise(function(resolve,reject){
        resolve(obj);
      });
    }
    pr.__proto__.__proto__ = UI.prototype;
    for(var i in obj.fn){
      
    }
    return pr;
  };
  for(var i in UIobj){
    UI[i] = UIobj[i];
  }
  UI.prototype.get = function(subObjectName){
    return this.then(function(obj){
      return UI(function(resolve,reject){
        if(obj[subObjectName]){
          resolve(obj[subObjectName]);
        }else{
          if(obj.path){
            UI.loadScript(UI.basePath + '/' + obj.path + '/' + subObjectName + '.js').then(function(){
              resolve(obj[subObjectName])
            });
          }else{
            reject(obj);
          }
        }
      },true);
    })
  };
  UI.prototype.fn = function(fn){
    return this.then(function(obj){
      if('promise' in obj){
        var arr = [];
        for(var i in obj){
          arr.push(i);
        }
        if(arr.length == 1){
          obj = obj['promise'];
        }
      }
      return UI(function(resolve,reject){
        var result = fn(obj,resolve,reject);
        if(result){
          if(result.then && typeof result.then === "function"){
            resolve({promise:result})
          }else{
            resolve(result);
          }
        }
      },true);
    })
  };
  UI.prototype.run = function(param){
    return this.fn(function(obj,resolve,reject){
      var result = obj(param);
      return result ? result : obj;
    })
  };
  UI.prototype.get = function(subObjectName){//changing get to fn
    return this.fn(function(obj,resolve,reject){
      if(obj[subObjectName]){
        resolve(obj[subObjectName]);
      }else{
        if(obj.path){
          var loadScriptPromsie = UI.loadScript(UI.basePath + '' + obj.path + '/' + subObjectName + '.js',function(){
            if(obj[subObjectName]){
              return true;
            }
            return false;
          });
          loadScriptPromsie.then(function(){
            if(obj[subObjectName]){
              obj[subObjectName].path = obj.path + '/' + subObjectName;
              resolve(obj[subObjectName])
            }else{
              reject(obj)
            }
          });
          loadScriptPromsie['catch'](function(){
            reject(obj);
          });
        }else{
          reject(obj);
        }
      }
    })
  };
  UI.subClass = function(){
    return;
  };
  UI.subClass.path = 'UI/subclass';
  UI.subClass.prototype.get = function(subObjectName){
    var th = this;
    if(this[subObjectName]){
      return UI(th,false).get(subObjectName);
    }else{
      var proto = this.__proto__;
      return UI(function(resolve,reject){
        var loadProtoScript = function(){
          let loadScriptPromsie = UI.loadScript(UI.basePath + '' + proto.constructor.path + '/prototype/' + subObjectName + '.js',function(){
            if(th[subObjectName]){
              return true;
            }
            return false;
          });
          loadScriptPromsie['catch'](function(){
            proto = proto.__proto__;
            if(proto === {}.__proto__){
              reject();
              return;
            }
            loadProtoScript();
          });
          loadScriptPromsie.then(function(){
            resolve(th[subObjectName])
          });
        }
        loadProtoScript();
      },true)
    }
  };
  return UI;
}) (window); 
