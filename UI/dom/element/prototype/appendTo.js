UI.dom.element.prototype.appendTo = function(parent){
  this.parent = parent;
  if(parent.then){
    parent.then(function(){
      this.parent.$.appendChild(this.$);
    })
  }else{
    this.parent.$.appendChild(this.$);
  }
  return this;
};
