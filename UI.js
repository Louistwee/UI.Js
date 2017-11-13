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
    loadScript: function (src) {
      return new Promise(function(resolve,reject){
        var scriptElement = document.createElement('script');
        var anotherScript = document.getElementsByTagName('script') [0];
        scriptElement.type = 'text/javascript';
        scriptElement.src = src;
        scriptElement.onload = scriptElement.onreadystatechange = function () {
          if (!this.readyState || this.readyState == 'complete') {
            resolve();
          }
        };
        anotherScript.parentNode.insertBefore(scriptElement, anotherScript);
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
      return UI(function(resolve,reject){
        var result = fn(obj,resolve,reject);
        console.log(result);
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
    return this.fn(function(obj){
      var result = obj(param);
      console.log(result);
      return result;
    })
  };
  return UI;
}) (window); 
