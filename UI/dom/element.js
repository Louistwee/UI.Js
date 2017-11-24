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
  }else if(!obj.$){
    obj.$ = document.createElement(obj.type);
  }
  if(obj.parent){
    if(obj.parent.then){
      obj.parent.then(function(parent){
        UI.dom.element.prototype.appendTo.call(obj,parent);
      });
    }else{
      UI.dom.element.prototype.appendTo.call(obj,obj.parent);
    }
  }
  return obj;
};
UI.dom.element.prototype.appendTo = function(parent){
  this.parent = parent;
  this.parent.$.appendChild(this.$);
  return this;
};
UI.dom.element.prototype.__proto__ = UI.dom.prototype;
