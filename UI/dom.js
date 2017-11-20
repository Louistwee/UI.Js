(function(UI){
UI.dom = function(object){
  this.call
  if(object){
    this.$ = object;
  }
}
UI.dom.isElement = function(element){
  return typeof HTMLElement === "object" ? element instanceof HTMLElement : element && typeof element === "object" && element !== null && element.nodeType === 1 && typeof element.nodeName==="string"
}
// var button = new UI.dom(document.createElement('button')) 
// button.get('equals').run(button).fn(function(a){if(a){alert('they are the same')}})
UI.dom.prototype.__proto__ = UI.subClass.prototype;
})(UI)
