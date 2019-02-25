$(function () {
  var canvas = document.getElementById('cvs');
  context = canvas.getContext('2d');
  function drawGrid(color, stepx, stepy) {
      context.save()
      context.fillStyle = 'white';
      console.log(context);
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.lineWidth = 0.1;
      context.strokeStyle = color;
      for (var i = stepx; i < context.canvas.width; i += stepx) {
          context.beginPath();
          context.moveTo(i, 0);
          context.lineTo(i, context.canvas.height);
          context.closePath();
          context.stroke();
      }
      for (var j = stepy; j < context.canvas.height; j += stepy) {
          context.beginPath();
          context.moveTo(0, j);
          context.lineTo(context.canvas.width, j);
          context.closePath();
          context.stroke();
      }
      context.restore();
  }
  drawGrid('#ccc', 20, 20);

  
})