(function(UI){
UI.dom = function(object){
  this.call
  if(object){
    this.$ = object;
  }
}
// var button = new UI.dom(document.createElement('button')) 
// button.get('equals').run(button).fn(function(a){if(a){alert('they are the same')}})
UI.dom.prototype.__proto__ = UI.subClass.prototype;
})(UI)
