UI.color = function(name){
  var obj = {};
  if(name in UI.color.colors){
    obj.color = UI.color.colors[name]
  }
  obj.__proto__ = UI.color.prototype;
  return obj;
};
UI.color.colors = {
  'carrot':[230, 126, 34,1], // all colors in [R,G,B,A]
};
UI.color.prototype.RGBA = function(){
  var arr = this.color;
  return 'rgba('+arr[0]+','+arr[1]+','+ arr[2]+','+arr[3]+')';
}
