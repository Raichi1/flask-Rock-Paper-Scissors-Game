var mousePressed = false, mousePressed2=false;
var lastX, lastY, lastX2, lastY2;
var ctx,ctx1;
var show1 = true, show2 = true;


function getRndInteger(min, max) {
return Math.floor(Math.random() * (max - min) ) + min;
}


// IMAGE FOR PLAYER 1
function InitThis() {
  ctx = document.getElementById('myCanvas').getContext("2d");

  var numero = getRndInteger(0, 10);
  var letra = ["Tijera", "Piedra", "Papel"];
  var random = Math.floor(Math.random() * letra.length);
  var aleatorio = letra[random];

  document.getElementById('numero').value = aleatorio;

  $('#myCanvas').mousedown(function (e) {
      mousePressed = true;
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  });

  $('#myCanvas').mousemove(function (e) {
      if (mousePressed) {
          Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
      }
  });

  $('#myCanvas').mouseup(function (e) {
      mousePressed = false;
  });
    $('#myCanvas').mouseleave(function (e) {
      mousePressed = false;
  });
}

function Draw(x, y, isDown) {
  if (isDown) {
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
  }
  lastX = x; lastY = y;
}

function clearArea() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function disableShow(){
  var canvas = document.getElementById('myCanvas');
  if(show1){
    canvas.style.background = 'black';
    show1 = false;
  }else{
    canvas.style.background = 'white';
    show1=true;
  }
}

// IMAGE FOR PLAYER 2
function InitThis2() {
  ctx1 = document.getElementById('myCanvas2').getContext("2d");

  var numero = getRndInteger(0, 10);
  var letra = ["Tijera", "Piedra", "Papel"];
  var random = Math.floor(Math.random() * letra.length);
  var aleatorio = letra[random];

  document.getElementById('numero2').value = aleatorio;

  $('#myCanvas2').mousedown(function (e) {
      mousePressed2 = true;
      Draw2(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  });

  $('#myCanvas2').mousemove(function (e) {
      if (mousePressed2) {
          Draw2(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
      }
  });

  $('#myCanvas2').mouseup(function (e) {
      mousePressed2 = false;
  });
    $('#myCanvas2').mouseleave(function (e) {
      mousePressed2 = false;
  });
}

function Draw2(x, y, isDown) {
  if (isDown) {
      ctx1.beginPath();
      ctx1.strokeStyle = 'black';
      ctx1.lineWidth = 5;
      ctx1.lineJoin = "round";
      ctx1.moveTo(lastX2, lastY2);
      ctx1.lineTo(x, y);
      ctx1.closePath();
      ctx1.stroke();
  }
  lastX2 = x; lastY2 = y;
}

function clearArea2() {
  ctx1.setTransform(1, 0, 0, 1, 0, 0);
  ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
}

function disableShow2(){
  var canvas = document.getElementById('myCanvas2');
  if(show2){
    canvas.style.background = 'black';
    show2 = false;
  }else{
    canvas.style.background = 'white';
    show2=true;
  }
}

// -------------------------------FUNCTION IMAGES-------------------------------

function prepareImg() {
 var canvas = document.getElementById('myCanvas');
 var canvas2 = document.getElementById('myCanvas2');

 document.getElementById('myImage').value = canvas.toDataURL();
 document.getElementById('myImage2').value = canvas2.toDataURL();
}