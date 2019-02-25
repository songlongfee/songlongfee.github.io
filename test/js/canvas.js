function DrawImage(params) {
  this.dataSet = params.dataSet || [];
  this.size = params.size || 20; //单元格尺寸
  this.lineColor = params.lineColor || '#eeeeee'; //网格边框色
  this.color = params.color || '#cccccc'; //画笔颜色
  this.ctx = document.getElementById(params.id).getContext('2d');
  this.canAddDot = false;
}

DrawImage.prototype = {
  init: function () {
    this.drawGrid(this.lineColor, this.size, this.size);
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

let cvs = document.getElementById("cvs");
let ctx = cvs.getContext('2d');
let winWidth = document.body.clientWidth;
// let winHeight = document.body.clientHeight;
let brushColor = '#0099ff';
let cellSize = 10;

// cvs.width = winWidth;
// cvs.height = winHeight;

var di = new DrawImage({
  dataSet: [],
  size: cellSize,
  lineColor: '#dddddd',
  color: '',
  id: 'cvs'
});

di.init();
di.size = cellSize;

document.oncontextmenu=new Function("event.returnValue=false;");
document.getElementById('root').style.width = winWidth + 'px';

var type = 0;
var dX = 0;
var dY = 0;
var sX = cvs.width;
var sY = cvs.height;

$('#cvs').on('mousedown', function (e) {
  e.preventDefault();
  di.canAddDot = true;
  if(e.which == 1) {
    type = 1;
  } else if(e.which == 3) {
    type = 3;
  }
  dX = e.offsetX;
  dY = e.offsetY;
});

$('#cvs').on('mousemove', function (e) {
  var x = e.offsetX,
      y = e.offsetY;
  if(di.canAddDot && type === 1) {
    di.addDot(x, y, brushColor);
  } else if(type === 3) {
    rX = ((dX - x)/sX);
    rY = ((dY - y)/sY);
    console.log(rX)
    console.log(rY)
    cvs.style.left = (parseFloat(cvs.style.left.replace('%', '')/100) - rX)*100 + '%';
    cvs.style.top = (parseFloat(cvs.style.top.replace('%', '')/100) - rY)*100 + '%';
    console.log(cvs.style.left)
  }
});

$(document).on('mouseup', function (e) {
  di.canAddDot = false;
  type = 0;
});

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