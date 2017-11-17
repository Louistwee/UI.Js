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
      return new Promise(function(resolve,reject){
        var scriptElement = document.createElement('script');
        var anotherScript = document.getElementsByTagName('script') [0];
        scriptElement.type = 'text/javascript';
        scriptElement.src = src;
        if(scriptElement.readyState){//IE
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
        };
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
          UI.loadScript(UI.basePath + '/' + obj.path + '/' + subObjectName + '.js').then(function(){
            resolve(obj[subObjectName])
          })['catch'](function(){
            //working here ----
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
  UI.subClass.prototype.get = function(subObjectName){
    if(this[subObjectName]){
      return UI(this,false).get(subObjectName);
    }else{
      while(false){
        //working here ----
      }
    }
  };
  return UI;
}) (window); 
