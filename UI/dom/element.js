/**
  @function UI.dom.element
  @param obj
    1 String --> create Element
    1 Object
      * type - ElementName --> create Element
      ~ $ - Element --> Element
      ~ parent - Element --> parent of the Element
    1 Element --> add the element prototype to the Element
  @return obj
*/
/*##Parameter Explanation##  
  For Paramters:
  1 = one of the list for the first parameter
  A = one of the list for the last parameter
  * = parameters between 1 and A
  Example:
  (1,2,3,*, ... ,*,C,B,A)
  For objects:
  * = required property
  ~ = optional property
*/

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
  obj.__proto__ = UI.dom.element.prototype;
  if(obj.parent){
    obj.get('appendTo').run(obj.parent);
  }
  return obj;
};
UI(UI.dom).get('isElement');
UI.dom.element.prototype.__proto__ = UI.dom.prototype;
