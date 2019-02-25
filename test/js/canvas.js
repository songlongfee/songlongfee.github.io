function DrawImage(params) {
  this.dataSet = params.dataSet || [];
  this.size = params.size || 40;
  this.lineColor = params.lineColor || '';
  this.color = params.color || '#cccccc';
  this.ctx = document.getElementById(params.id).getContext('2d');
  this.canAddDot = false;
}

DrawImage.prototype = {
  init: function () {
    this.drawGrid(this.color || '#aaaaaa', this.size, this.size);
  },
  drawGrid: function (color, stepx, stepy) {
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = color;
    for (var i = stepx; i < this.ctx.canvas.width; i += stepx) {
      this.ctx.beginPath();
      this.ctx.moveTo(i + 0.5, 0);
      this.ctx.lineTo(i + 0.5, this.ctx.canvas.height);
      this.ctx.closePath();
      this.ctx.stroke();
    }
    for (var j = stepy; j < this.ctx.canvas.height; j += stepy) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, j + 0.5);
      this.ctx.lineTo(this.ctx.canvas.width, j + 0.5);
      this.ctx.closePath();
      this.ctx.stroke();
    }
    this.ctx.restore();
  },
  addDot: function (x, y, color = this.color) {
    let o = this.getPosition(x, y);
    let arr = this.dataSet;
    arr.push(`${o.pX}-${o.pY}-${color}`);
    this.dataSet = [...new Set(arr)];
    this.draw(this.dataSet);
  },
  draw: function (list) {
    list.forEach(item => {
      this.ctx.fillStyle = item.split('-')[2] || '#cccccc';
      this.ctx.fillRect((item.split('-')[0] - 1) * this.size + 1, (item.split('-')[1] - 1) * this.size + 1, this.size - 1, this.size -1);
    });
  },
  getPosition: function (x, y) {
    return {
      pX: Math.ceil(x / this.size),
      pY: Math.ceil(y / this.size)
    }
  }
};

var di = new DrawImage({
  dataSet: [],
  size: 20,
  lineColor: '#aaaaaa',
  color: '',
  id: 'cvs'
});

di.init();

let brushColor = '#ffff00';
let cellSize = 20;

di.size = cellSize;

$('#cvs').on('mousedown', function (e) {
  di.canAddDot = true;
});

$('#cvs').on('mousemove', function (e) {
  if(di.canAddDot) {
    var x = e.offsetX,
        y = e.offsetY;
    di.addDot(x, y, brushColor);
  }
});

$(document).on('mouseup', function (e) {
  di.canAddDot = false;
});

let cvs = document.getElementById("cvs");
cvs.addEventListener("touchstart",function(e){
    di.canAddDot = true;
});
cvs.addEventListener("touchmove",function(e){
  if(di.canAddDot) {
    var x = e.touches[0].pageX,
        y = e.touches[0].pageY;
    di.addDot(x, y, brushColor);
  }
});
cvs.addEventListener("touchend",function(e){
    di.canAddDot = false;
});