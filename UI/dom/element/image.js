/**
  @function UI.dom.element.image
  @param opt
    - object
      ~ src - URL --> source
      ~ alt - String --> alternative text
      ~ title - String --> title
      ~ width - Length --> width of image
      ~ height - Length --> width of image
      ~ css - CSSObject --> style for the frame element
  @return opt
    - object
      * $ - Element --> Frame element
      * img - Element --> Image element
*/
UI.dom.element.image = function (opt) {
  opt.$ = UI.dom.element('div').$;
  opt.__proto__ = UI.dom.element.image.prototype;
  opt.get('width').run(opt.width);
  opt.get('height').run(opt.height);
  opt.get('css').run({
    display: 'inline-block',
  })
  opt.get('css').run(opt.css);
  opt.img = UI.dom.element('img');
  img.get('attr').run({
    src:opt.src,
    alt:opt.alt,
    title:opt.title,
  })
  opt.img.get('width').run(opt.width);
  opt.img.get('height').run(opt.height);
  opt.get('append').run(opt.img);
  opt.img.opt = opt;
  return opt;
}
UI.dom.element.image.prototype.__proto__ = UI.dom.element.prototype;