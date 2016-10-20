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
    self.x = round(width / 2);
    self.y = round(height / 2);
    self.radius = step;
  };

    Walker.prototype.display = function() {
      var self = this;
      ctx.beginPath();
      var color = rand(150, 240);
      self.color = 'rgb(' + rand(150, 240) + ',' + rand(150, 240) + ',' + rand(150, 240) + ')';
      ctx.fillStyle = self.color;
      //ctx.strokeStyle = '#ccc';
      ctx.rect(self.x, self.y, rand(20,200), rand(20,200));
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

    };

    Walker.prototype.walk = function () {
      var choice = Math.random();
          this.radius = rand(20,200);
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
  var w = new Walker();

  var draw = function() {
      w.walk();
      w.display();
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
