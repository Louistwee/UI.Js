$(function(){
  var canvas = $('#canvas');
  var buttonbar = $('#actionButtons');
  var cf = $('#canvas-frame').css({
    border:'1px solid black',
    resize:'both',
    overflow:'hidden',
    width:200,
    height:200,
  });
  var ctx = canvas[0].getContext('2d');
  var color = '#ff00ff';
  cf.on('mousemove',function(){
    canvas[0].width = cf.css('width').split('px')[0];
    canvas[0].height = cf.css('height').split('px')[0];
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
