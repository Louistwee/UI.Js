//Create the base object
window.UI = (function(window){
  var UI = {
    //get thebasePath of UI.js 
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
    loadScript:function(URL){
      if(document.readyState){
        //when the document if fully loaded
        var script = document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", URL);
        //apend the script element
        document.getElementsByTagName("head")[0].appendChild(script);
      }else{
        //when the document is still loading
        document.write('<script src="'+URL+'" type="text/javascript></script>"')
      }
    },
    //combination of getURL and loadScript
    loadURL:function(URL){
      this.loadScript(this.getURL(URL))
    },
    //add an subObject script to UI
    addSubObject:function(){
      
    },
    get:function(){
      
    },
    example:function(){
      
    };
  }
  return UI;
})(window)
