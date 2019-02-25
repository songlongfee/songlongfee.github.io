/**
3d坐标系/球坐标
@param x
@param y
@param z

 */
// var arr = [1, 3, 5, 7, 9, 11, 9, 7, 5, 3, 1];
// 每一层比上一层多两个字，到达中心后再递减

var s = '就看见爱上对方看见爱上对方看见爱上对方看见爱上对方看见爱上对方看见爱看见爱上对方看见爱上对方看见爱上对方看见爱上对方上对方看见爱上对方看见爱上对方诉讼费考试方式各个都是故事的角色是伐啦沙发沙发对方诉讼费考试方式各个都是故事的角色是伐啦沙发沙发算法沙拉酱发送';
window.onload = function () {
  var oSence = document.getElementById('sence');
  var oBox = oSence.getElementsByClassName('box')[0];
  var oUl = oBox.getElementsByTagName('ul')[0];
  var aLi = oUl.getElementsByTagName('li');
  
  var num = 0;
  var layer = 0;
  var wordNum = -1;
  var circleArr = [];
  var coneArr = [];
  var coneNum = 0;
  var liNum = 0;
  var columnH = 0;
  var columnNum = 0;

  // 计算文字层数
  for(var i=4;i<13;i++) {
    num = i * i + (i + 1) * (i + 1);
    if(num >= s.length) {
      layer = (i -1) * 2 + 1;
      break;
    }
    layer = (i -1) * 2 + 1;
  }

  // 文字层数
  for(var i=0;i<layer;i++) {
    if(i<(layer+1)/2) {
      wordNum += 2;
    } else {
      wordNum -= 2;
    }
    circleArr.push(wordNum);
  }
  
  var theta = Math.PI / (circleArr.length - 1);
  var phi = 0;
  var r = 150;
  num = 0;
  //球形
  for(var i=0; i<circleArr.length; i++) {
    phi = 2 * Math.PI / circleArr[i]; 
    for(var j=0; j<circleArr[i]; j++) {
      var li = document.createElement('li');
      li.innerHTML = s[num];
      num ++;
      drawCircle(li, theta, phi, i, j);
      oUl.appendChild(li);
    }
  }

  for(var i=0; i<aLi.length; i++) {
    aLi[i].style.transform = 'translate3D(' + aLi[i].circleX + 'px,' + aLi[i].circleY + 'px,' + aLi[i].circleZ + 'px) rotateY(' + aLi[i].circlePhi + 'rad) rotateX(' + aLi[i].circleTheta + 'rad)'; 
  }

  var oTable = document.getElementsByClassName('table')[0];
  var aA = oTable.getElementsByTagName('a');

  //圆锥
  for(var i=0;i<aLi.length;i++) {
    coneNum += 2 * i - 1;
    if(coneNum > aLi.length) {
      coneNum -= 2 * i -1;
      break;
    }
    coneArr.push(2 * i - 1);
  }
  for(var i=0;i<coneArr.length;i++) {
    phi = 2 * Math.PI / coneArr[i];
    for(var j=0;j<coneArr[i];j++) {
      drawCone(aLi[liNum], phi, i, j);
      liNum++;
    }
  }
  
  //圆柱
  columnH = Math.floor(aLi.length / (circleArr.length - 2));
  columnNum = (circleArr.length - 2) * columnH;
  liNum = 0;
  for(var i=0;i<circleArr.length - 1;i++) {
    phi = 2 * Math.PI / columnH;
    for(var j=0;j<columnH;j++) {
      drawColumn(aLi[liNum], phi, i, j);
      drawColumn2(aLi[liNum], phi, i, j);
      liNum ++;
    }
  }

  //球形
  function drawCircle(obj, theta, phi, i, j) {
    obj.circleX = r * Math.sin(theta * i) * Math.sin(phi * j) + 200;
    obj.circleY = -r * Math.cos(theta * i) + 200;
    obj.circleZ = r * Math.sin(theta * i) * Math.cos(phi * j);
    obj.circleTheta = theta * (circleArr.length - i) - Math.PI / 2;
    obj.circlePhi = phi * j;
    obj.bigCircleX = (r + 2000) * Math.sin(theta * i) * Math.sin(phi * j) + 200;
    obj.bigCircleY = -(r + 2000) * Math.cos(theta * i) + 200;
    obj.bigCircleZ = (r + 2000) * Math.sin(theta * i) * Math.cos(phi * j);
    obj.maxX = obj.bigCircleX;
    obj.maxY = obj.bigCircleY;
    obj.maxZ = obj.bigCircleZ;
    obj.theta = obj.circleTheta;
    obj.phi = obj.circlePhi;
  }

  //圆锥
  function drawCone(obj, phi, i, j) {
    obj.coneX = (2 * r / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.sin(phi * j) + 200;
    obj.coneY = (2 * r / coneArr.length) * i + 50;
    obj.coneZ = (2 * r / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.cos(phi * j)
    obj.coneTheta = Math.PI / 6;
    obj.conePhi = phi * j;
    obj.bigConeX = (2 * (r + 2000) / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.sin(phi * j) + 200;
    obj.bigConeY = (2 * (r + 2000) / coneArr.length) * i + 50 - 2000;
    obj.bigConeZ = (2 * (r + 2000) / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.cos(phi * j)
  }

  //圆柱
  function drawColumn(obj, phi, i, j) {
    obj.columnX = r / 1.5 * Math.sin(phi * j) + 200;
    obj.columnY = (2 * r / (circleArr.length - 2)) * i + 50;
    obj.columnZ = r / 1.5 * Math.cos(phi * j);
    obj.columnPhi = phi * j;
    obj.bigColumnX = (r + 2000) / 1.5 * Math.sin(phi * j) + 200;
    obj.bigColumnY = (2 * (r + 2000) / (circleArr.length - 2)) * i + 50 - 2000;
    obj.bigColumnZ = (r + 2000) / 1.5 * Math.cos(phi * j);
  }

  //扭曲圆柱
  function drawColumn2(obj, phi, i, j) {
    obj.column2X = r / 1.5 * Math.sin(phi * j + i * 8 * Math.PI / 180) + 200;
    obj.column2Y = (2 * r / (circleArr.length - 2)) * i + 50;
    obj.column2Z = r / 1.5 * Math.cos(phi * j + i * 8 * Math.PI / 180);
    obj.column2Phi = phi * j + i * 8 * Math.PI / 180;
    obj.bigColumn2X = (r + 2000) / 1.5 * Math.sin(phi * j + i * 8 * Math.PI / 180) + 200;
    obj.bigColumn2Y = (2 * (r + 2000) / (circleArr.length - 2)) * i + 50 - 2000;
    obj.bigColumn2Z = (r + 2000) / 1.5 * Math.cos(phi * j + i * 8 * Math.PI / 180);
  }

  //旋转
  var angleX = 0;
  setInterval(function () {
    angleX ++;
    oBox.style.transform = 'rotateX(' + angleX + 'deg) rotateY(' + angleX + 'deg)';
  }, 60)

  //切换
  oTable.addEventListener('click', function (event) {
    var e = event || window.event;
    var target = e.target;
    var children = e.currentTarget.children;
    var count, type, type2;
    if(target === children[0]) {
      count = num;
      type = 'circle';
      type2 = 'Circle';
    } else if (target === children[1]) {
      count = coneNum;
      type = 'cone';
      type2 = 'Cone';
    } else if (target === children[2]) {
      count = columnNum;
      type = 'column';
      type2 = 'Column';
    } else if(target === children[3]) {
      count = columnNum;
      type = 'column2';
      type2 = 'Column2';
    }
    startChange();
    setTimeout(() => {
      endChange(count, type, type2);
    }, 1000);
  })

  //展开
  function startChange(type) {
    for(var i=0;i<aLi.length;i++) {
      aLi[i].className = 'all';
      aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' + aLi[i].phi + 'rad) rotateX(' + aLi[i].theta + 'rad)';
      aLi[i].style.opacity = 0;
    }
  }

  //收起
  function endChange(num, type, type2) {
    for(var i=0;i<num;i++) {
      aLi[i].className = 'curr';
      if(/column/.test(type)) {
        aLi[i].style.transform = 'translate3D(' + aLi[i][type + 'X'] + 'px,' + aLi[i][type + 'Y'] + 'px,' + aLi[i][type + 'Z'] + 'px) rotateY(' + aLi[i][type + 'Phi'] + 'rad)';
      } else {
        aLi[i].style.transform = 'translate3D(' + aLi[i][type + 'X'] + 'px,' + aLi[i][type + 'Y'] + 'px,' + aLi[i][type + 'Z'] + 'px) rotateY(' + aLi[i][type + 'Phi'] + 'rad) rotateX(' + aLi[i][type + 'Theta'] + 'rad)';
        aLi[i].theta = aLi[i][type + 'Theta'];
      }
      aLi[i].style.opacity = 1;
      aLi[i].maxX = aLi[i]['big' + type2 + 'X'];
      aLi[i].maxY = aLi[i]['big' + type2 + 'Y'];
      aLi[i].maxZ = aLi[i]['big' + type2 + 'Z'];
      aLi[i].phi = aLi[i][type + 'Phi'];
    }
  }
}