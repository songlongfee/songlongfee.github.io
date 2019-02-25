$(function () {
  var cvs = document.getElementById('cvs');
  context = cvs.getContext('2d');
  function drawGrid(color, stepx, stepy) {
      context.save()
      context.fillStyle = 'white';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.lineWidth = 1;
      context.strokeStyle = color;
      for (var i = stepx; i < context.canvas.width; i += stepx) {
          context.beginPath();
          context.moveTo(i + 0.5, 0);
          context.lineTo(i + 0.5, context.canvas.height);
          context.closePath();
          context.stroke();
      }
      for (var j = stepy; j < context.canvas.height; j += stepy) {
          context.beginPath();
          context.moveTo(0, j + 0.5);
          context.lineTo(context.canvas.width, j + 0.5);
          context.closePath();
          context.stroke();
      }
      context.restore();
  }
  drawGrid('#aaa', 20, 20);

  $('#cvs').on('mousemove', function (e) {
    console.log(e.offsetX)
  })

  context.fillStyle = '#ff0';
  context.fillRect(21, 21, 19, 19);
  context.fillRect(41, 41, 19, 19);
  
})