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
    obj.$ = document.createElement(obj.type);
  }
  if(obj.parent){
    UI.dom.element.prototype.appendTo.call(obj,obj.parent);
  }
  return obj;
};
UI.dom.element.prototype.appendTo = function(parent){
  console.log(this);
  console.log(parent);
  this.parent = parent.$ ? parent : UI.dom.element(parent);
  this.parent.$.appendChild(this.$);
  console.log(this.parent);
  return this;
};
UI.dom.element.prototype.__proto__ = UI.dom.prototype;
