UI.dom.prototype.equals = function(object){
  if(object.$ === this.$){
    return true;
  }
  return false;
}
