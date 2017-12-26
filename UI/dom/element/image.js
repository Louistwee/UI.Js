(function (UI) {
  var image = {
  };
  var standardCss
  image = function (opt) {
    var frame = UI.dom.element('div');
    frame.get('width').run(opt.width);
    frame.get('height').run(opt.height);
    frame.css({
    
    })
    frame.css(opt.css);
  }
  UI.dom.element.image.prototype.editable = function () {
  }
  UI.dom.element.image = image;
}) (UI)

