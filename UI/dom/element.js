UI(UI.dom).get('isElement');
UI.dom.element = function(obj){
  if(typeof obj === 'string'){
    var obj = {
      type:obj, 
      $:document.createElement(obj),
    };
  }else if(UI.dom.isElement(obj)){
    obj = {
      $:obj,
    };
  }else{
    obj.$ = document.createElement(obj);
  }
  if(obj.parent){
    obj.parent.get('append').run(obj);
  }
  return obj;
};
UI.dom.element.prototype.append = function(parent){
  this.parent = parent.$ ? parent : UI.dom(parent);
  this.parent.$.appendChild(this.$);
};
UI.dom.element.prototype.__proto__ = UI.dom.prototype;
