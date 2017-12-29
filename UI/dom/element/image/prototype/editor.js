UI.dom.element.image.prototype.editor = function () {
  var frame = this;
  if (frame.editor.state === 'unloaded' || !frame.editor.state) {
    frame.editor.canvas = UI.dom.element('canvas');
    frame.get('append').run(frame.editor.canvas);
    frame.editor.state = 'loaded';
  }
}
