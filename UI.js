//Create the base object
window.UI = (function(window){
  var UI = {
    //get the base URL of UI.js
    baseURL:(function(window){
      var i;
      var basePath;
      var scripts = document.getElementsByTagName("script");
      for (i = 0; i < scripts.length; i+=1) {
        if(scripts[i].src.split("UI.js").length > 1){
          basePath = scripts[i].src.split("UI.js")[0];
        }
      }
      return basePath;
    })(window),
    /**
    * This function puts UI.baseURL and @param {string} path togheter.
    * @param {string} path A path relative to UI.js
    * @return {string} An url.
    */
    getFullURL:function(path){
      return this.baseURL + path;
    },
    scriptLoader:{
      /**
      * This functions loads a script.
      * @param {string} url An URL pointing to the script.
      * @param {function} allback A function called when the script is loaded.
      * @return {boolean} True when the script is loaded already.
      */
      load:function(url,callback){
        var script = document.createElement("script");
        var anotherscript = document.getElementsByTagName("script")[0];
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        script.onload = script.onreadystatechange = function(){
          if (!this.readyState || this.readyState == "complete"){
            setTimeout( function() {
              callback( true );
            }, 0 );
          }
        };
        anotherscript.parentNode.insertBefore(script, anotherscript);
        return ;
      },
    },
  };
  return UI;
})(window);
