//Create the base object
window.UI = (function (window) {
  var UI = {
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
    /**
    * This function puts UI.baseURL and @param {string} path togheter.
    * @param {string} path A path relative to UI.js
    * @return {string} An url.
    */
    getURL: function (URL) {
      return this.basePath + URL;
    },
    /**
    * This function returns an object that can be used in a load row.
    * @example
    * UI.$().get('test').run('test',{test:'test'}).end(function(data){console.log(data)})
    * @example
    * UI.test = {test:function(a){return a}};
    * @return {object} The object or this.
    */
    $:function(){
      return {
        object:UI,
        paused:false,
        queue:[],
        __proto__:UI.$fn,
      }
    },
    $fn:{
      /**
      * This function loads an subObject.
      * @param {string} objectName The name of the subObject.
      * @return {this}
      */
      get: function (objectName) {
        if (this.paused) {
          this.pauseList.push({
            fn: this.get,
            param: objectName,
          });
        }else if (objectName in this.object) {
          this.object = this.object[objectName];
        }else{
          var callback = function (th) {
            th.start();
          };
          this.loadScript({
            objectName: objectName,
            callback: callback,
          });
          this.pause();
        }
        return this;
      },
      /**
      * This function runs the callback when the pointer is there loaded.
      * @example
      * UI.test = {name:'Hello'};
      * UI.test.name //'Hello'
      * @example
      * UI.$().get('test').fn(function(){this.name = 'World'})
      * UI.test.name //'World'
      * @param {function} callback This function is executed when the previous thing are loaded.
      * - @this the object
      * - @param {object} object the UI.$() object.
      * @return {this}
      */
      fn: function (callback) {
        if (this.paused) {
          this.pauseList.push({
            fn: this.get,
            param: callback,
          });
        }else{
          callback.call(this.object,this);
        }
        return this;
      },
      /**
      * This function runs the callback when the loadrow is fully loaded.
      * @param {function} callback This function is executed when the previous thing are loaded.
      * @return {this}
      */
      run: function (callback){
        
      },
    },
    //use .run() if you want ot add the fn to the pauseList otherwise when you want to run it directly
    //Todo: run may not load scripts
    run: function (fnName, param) {
      var th = this;
      var pauseFn = function () {
        if (!th[fnName]) {
          var callback = function (th) {
            th.start();
          };
          th.loadScript({
            objectName: fnName,
            callback: callback,
          });
          th.pause();
          th.pauseList.splice(0, 0, {
            fn: pauseFn,
            param: param
          });
        } else {
          return th[fnName](param);
        }
      };
      if (this.paused) {
        this.pauseList.push({
          fn: pauseFn,
          param: param
        });
      } else {
        pauseFn();
      }
      return this;
    },
    /**
    * This function pauses the UI
    * @return {object} The object or this.
    */
    pause: function () {
      this.paused = true;
      this.pauseList = [
      ];
      return this;
    },
    start: function () {
      this.paused = false;
      while (!(!this.pauseList.length || this.paused)) {
        var method = this.pauseList.splice(0, 1) [0];
        var answ = method.fn.call(this, method.param);
      }
      return this;
    },
    name: 'UI',
    getPath: function () {
      if (this.parent) {
        return this.parent.getPath() + '/' + this.name;
      } else {
        return this.name;
      }
    },
    getFullPath: function (param) {
      return this.basePath + '/' + this.getPath() + '/' + param.objectName + '.js';
    },
    //this is a test fn
    loadScript: function (param) {
      var th = this;
      var script = document.createElement('script');
      var anotherscript = document.getElementsByTagName('script') [0];
      var once = false;
      script.type = 'text/javascript';
      script.src = this.getFullPath(param);
      script.onload = script.onreadystatechange = function () {
        if (!once && (!this.readyState || this.readyState == 'complete')) {
          once = true;
          if (param.callback) {
            param.callback(th);
          }
        }
      };
      anotherscript.parentNode.insertBefore(script, anotherscript);
    },
  };
  return UI;
}) (window);

