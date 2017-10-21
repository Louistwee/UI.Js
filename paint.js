$(function(){
  var canvas = $('#canvas');
  var buttonbar = $('#actionButtons');
  var cf = $('#canvas-frame').css({
    border:'1px solid black',
  });
  var ctx = canvas[0].getContext('2d');
  var color = '#ff00ff';
  cf.onresize(function(){
    canvas.width(cf.css('width'));
  })
  var actions = {
    'line':{
      icon:'line.png',
      action:function(){
        ctx.moveTo(0,0);
        ctx.lineTo(200,100);
        ctx.stroke();
      }
    }
  }
  for(var i in actions){
    buttonbar.append($('<button></button>').text(i).on('click',actions[i].action))
  }
})
