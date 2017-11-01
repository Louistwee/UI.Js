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
    * @function UI.getURL
    * This function puts UI.baseURL and @param {string} path togheter.
    * @param {string} path A path relative to UI.js
    * @return {string} An url.
    */
    getURL: function (URL) {
      return this.basePath + URL;
    },
    /**
    * @function $
    * This function returns an object that can be used in a load row.
    * @example
    * UI.$().get('test').run('test',{test:'test'}).end(function(data){console.log(data)})
    * @example
    * UI.test = {test:function(a){return a}};
    * @return {object} The object or this.
    */
    $:function(obj){
      return {
        object:obj ? obj : UI,
        paused:false,
        queue:[],
        __proto__:UI.$fn,
      }
    },
    $fn:{
      /**
      * @function UI.$fn.get
      * This function loads an subObject.
      * @param {string} objectName The name of the subObject.
      * @return {this}
      */
      get: function (objectName) {
        if (this.paused) {
          this.queue.push({
            fn: this.get,
            param: objectName,
          });
        }else if (objectName in this.object) {
          this.object = this.object[objectName];
        }else{
          var th = this;
          var callback = function () {
            th.start();
          };
          UI.loadScript({
            url: UI.basePath + this.object.path + '/' + objectName + '.js',
            callback: callback,
          });
          this.pause();
        }
        return this;
      },
      /**
      * @function UI.$fn.fn
      * This function runs the callback when the pointer is there loaded.
      * @example
      * UI.test = {name:'Hello'};
      * UI.test.name //'Hello'
      * @example
      * UI.$().get('test').fn(function(){this.name = 'World'})
      * UI.test.name //'World'
      * @param {function} callback This function is executed when the previous thing are loaded.
      * - @this object that you are manipulating (UI)
      * - @param {object} object the UI.$() object.
      * @return {this}
      */
      fn: function (callback) {
        if (this.paused) {
          this.queue.push({
            fn: this.get,
            param: callback,
          });
        }else{
          this.object = callback.call(this.object,this);
        }
        return this;
      },
      /**
      * @function UI.$fn.run
      * This function runs a sub function of the selected object;
      * @example
      * UI.test = {test:function(param){alert(param.word)}};
      * @example
      * UI.$().get('test').run('test',{word:'World'});
      * @param {string} name callback This function is executed when the previous thing are loaded.
      * @param {object} param object that will be passed to the called function
      * @return {this}
      */
      run: function (name,param){
        this.fn(function(){
          return this[name](param);
        })
      },
      /**
      * @function UI.$fn.pause
      * This function pauses the row;
      * @return {this}
      */
      pause: function () {
        this.paused = true;
        return this;
      },
      /**
      * @function UI.$fn.start
      * This function pauses the row;
      * @return {this}
      */
      start: function () {
        this.paused = false;
        while (!(!this.queue.length || this.paused)) {
          var method = this.queue.splice(0, 1) [0];
          method.fn.call(this, method.param);
        }
        return this;
      },
    },
    path: 'UI',
    /**
    * @function UI.getFullPath();
    * This fuction loads a script;
    * @param {object} param
    * - @param {String} path the path
    * - @param {function} callback the callback function
    */
    loadScript: function (param) {
      var th = this;
      var script = document.createElement('script');
      var anotherScript = document.getElementsByTagName('script') [0];
      script.type = 'text/javascript';
      script.src = param.url;
      script.onload = script.onreadystatechange = function () {
        if (!once && (!this.readyState || this.readyState == 'complete')) {
          if (param.callback) {
            setInterval(function(){
              param.callback();
            },0)
          }
        }
      };
      anotherScript.parentNode.insertBefore(script, anotherScript);
    },
  };
  return UI;
}) (window);

