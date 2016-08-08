  var socket;

  var grid;
  var colorText;
  var colorRange;
  var gray = 125;


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
        ellipse(data.x,data.y,2,2);
      }
    )
  }

  function mouseDragged(){
    fill(gray, 100);
    
    var data = {
      x : mouseX,
      y : mouseY,
      z : gray
    }
    socket.emit('mouse', data);
    noStroke();
    ellipse(mouseX,mouseY,2,2);
  }

  function colorStatus (otherInput,colorValue){
    otherInput.value = colorValue;
    gray = parseInt(colorValue);
  }

  function saveNewDrawing(){
    var name = new Date();
    saveCanvas(canvas,"drawing name",'png');
  }
  window.onbeforeunload = function (){
    return 'Leaving the page will erase all work.'
  }
  $(document).ready(function(){
    colorRange = document.getElementById('color-range');
    colorText = document.getElementById('color-text');
    grid = document.getElementById('grid');
  
    document.onkeyup = function(e){
      var kC = e.keyCode;
      if (kC > 36 && kC < 41) colorRange.focus();
      if(kC == "13") saveNewDrawing();
      if(kC == "32") grid.style.display = grid.style.display == "none" ? "block" : "none";
    }
  })