$(function(){
  var canvas = $('#canvas');
  var buttonbar = $('#actionButtons')
  var ctx = canvas[0].getContext('2d');
  var color = '#ff00ff';
  var actions = {
    line:{
      icon:'line.png',
      action:function(){
        ctx.moveTo(0,0);
        ctx.lineTo(200,100);
        ctx.stroke();
      }
    }
  }
  for(var i in actions){
    buttonbar.append($('<button></button>').text('i').on('click',actions[i].action))
  }
})
