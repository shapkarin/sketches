(function() {

  // "use strict";
  // initialise canvas
  var canvas = document.getElementById('background');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var step = 30;

  var rand = function(min, max) {
    return (Math.random() * (max - min + 1) + min)^0;
  };

  var round = function (float) {
    return float^0;
  };

  var seen = {x: [],y: []};

  var Walker = function() {
    var self = this;
    self.x = rand(0,canvas.width);
    self.y = rand(0,canvas.height);
    //self.radius = step;
    this.color = 'rgb(' + rand(150, 240) + ',' + rand(150, 240) + ',' + rand(150, 240) + ')';
  };

  Walker.prototype.display = function() {
    var self = this;
    ctx.beginPath();
    //var color = rand(150, 240);
    //self.color = 'rgb(' + rand(150, 240) + ',' + rand(150, 240) + ',' + rand(150, 240) + ')';
    //self.color = '#333';
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    ctx.rect(self.x, self.y, rand(5,10), rand(5,10));
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //this.walk();
  };

  Walker.prototype.walk = function () {
    var choice = Math.random();
    this.radius = rand(5,10);
    step = this.radius;
    //if(this.x && this.y && this.x < width && this.y < height ){
    if (choice >= 0 && choice < 0.25) {
      this.x = this.x + step;
    } else if (choice >= 0.25 && choice < 0.5) {
      this.x = this.x - step;
    } else if (choice >= 0.5 && choice < 0.75) {
      this.y += step;
    } else {
      this.y -= step;
    }
    // }
    seen.x.push(this.x);
    seen.y.push(this.y);
  };
  // initialise a walker object
  var w = [];

  for(var n = 0; n < 30; n++){
    w.push(new Walker())
  }

  var draw = function() {
    for(var i = 0; i < w.length; i++){
      w[i].walk();
      w[i].display();
    }
    //console.log('%s',step,seen.x.indexOf(w.x), seen.y.indexOf(w.y));
  };
  draw();

  // run draw function
  setInterval(function(){
    // if(seen.x.indexOf(w.x) != -1 && seen.y.indexOf(w.y) != -1) {
    draw();
    // }
  }, 70);

  document.getElementById('save').addEventListener("click", function(evt){
    var img = canvas.toDataURL("image/jpg");
    window.open(img,'DescriptiveWindowName','height='+height/2+',width='+width/2);
  });




})();
