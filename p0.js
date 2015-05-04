var socket;

var _strokeCol = 0;
var _strokeChange = -1;

function setup(){
  socket = io.connect('https://fathomless-temple-7308.herokuapp.com/');
  createCanvas(windowWidth,windowHeight);
  background(255);
  frameRate(60);
  socket.on(
    'mouse',
    function(data){
      fill(data.z, 100);
      noStroke();
      ellipse(data.x,data.y,3,3);
    }
  )
}

function mouseDragged(){
  if (_strokeCol > 244){
    _strokeChange = -1;
  }
  if (_strokeCol < 0){
    _strokeChange = 1;
  }
  _strokeCol += _strokeChange;
  fill(_strokeCol, 100);
  
  var data = {
    x : mouseX,
    y : mouseY,
    z : _strokeCol
  }
  socket.emit('mouse', data);
  noStroke();
  ellipse(mouseX,mouseY,3,3);
}
