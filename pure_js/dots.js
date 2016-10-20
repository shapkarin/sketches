/* "Dots" Background
 * Yury Shapkarin
 * yury@shapkarin.me
 */

//TODO: use reqestAnimationFrame

(function() {

  "use strict";

  document.getElementById('hamburger').addEventListener("click", function(evt){
      document.getElementsByTagName('nav')[0].className = document.getElementsByTagName('nav')[0].className + ' active';
  });

  //define vars
  var canvas = document.getElementById('background'),
      ctx = canvas.getContext('2d'),
      winW = window.innerWidth,
      winH = window.innerHeight;

  var variance = {
      min: 3, max: 15
    },
    step = 30,
    radius = 1.8,
    indexes = [],
    dots = [];

  canvas.width = winW;
  canvas.height = winH;



  //mobile
  if (winW <= 520) {
    variance.min = 1;
    variance.max = 7;
  }

  var rand = function(min, max) {
      return (Math.random() * (max - min + 1) + min)^0;
  };

  var offset = {
    x: 10,
    y: 20
  };

  function Dot(x,y) {
    var self = this;
    self.x = x;
    self.y = y;
    self.radius = radius;
    self.exist = rand(0,1);
    var color = rand(150, 240);
    self.color = 'rgb(' + color + ',' + color + ',' + color + ')';
    self.draw = function() {
      if (self.exist) {
        ctx.beginPath();
        ctx.fillStyle = self.color;
        ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    };
  }

  Dot.prototype.toggle = function(){
    this.exist = !this.exist;
  };

  var collectDots = function () {
    for (var x = offset.x; x < winW - offset.x; x += step) {
      for (var y = offset.y; y < winH - offset.y; y += step) {
        dots.push(new Dot(x,y));
      }
    }
  };
  collectDots();

  //todo: refact!
  window.addEventListener('resize', function(event){
      dots.length = 0;
      winW = window.innerWidth;
      winH = window.innerHeight;
      canvas.width = winW;
      canvas.height = winH;
      collectDots();
  });

  var drawDots = function(){
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, winW, winW);
    ctx.closePath();
    for (var i = 0; i < dots.length; i++) {
      dots[i].draw();
    }
  };
  drawDots();

  anim();
  function anim() {
    var milsec = rand(200,500);
    setTimeout(function(){
      anim();

      ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );

      drawDots();

      var n = rand(variance.min, variance.max);

      indexes.length = 0;
      while (n > 0) {
        n--;
        //grab random dots indexes
        indexes.push(rand(0, dots.length));
      }

      if (!n) {
        //uniq array values
        indexes = indexes.filter(function (elem, pos, self) {
          return self.indexOf(elem) == pos;
        });

        indexes.forEach(function (i) {
          var current_dot = dots[i];
          if(current_dot) {
            current_dot.toggle();
            current_dot.draw();
          }
        });
      }

    }, milsec)
  }


    canvas.addEventListener("mousemove", function(evt){
      for (var i = 0; i < dots.length; i++) {
        var x = evt.offsetX;
        var y = evt.offsetY;
        if(dots[i].x <= x && dots[i].x + 50 >= x && dots[i].y <= y && dots[i].y + 50 >= y){
          if(dots[i].exist){
            dots[i].radius = dots[i].radius + (dots[i].radius < 14 ? Math.random() : 0);
            dots[i].draw();
          }
        }
      }
    });


    canvas.addEventListener("click", function(evt){
      for (var i = 0; i < dots.length; i++) {
        var x = evt.offsetX;
        var y = evt.offsetY;
        if(dots[i].x <= x && dots[i].x + 50 >= x && dots[i].y <= y && dots[i].y + 50 >= y){
          if(dots[i].exist){
            dots[i].color = 'rgb(' +  rand(150, 240) + ',' +  rand(150, 240) + ',' +  rand(150, 240) + ')';
            dots[i].draw();
          }
        }
      }
    });


  document.getElementById('save').addEventListener("click", function(evt){
    var img = canvas.toDataURL("image/jpg");
    window.open(img,'DescriptiveWindowName','height='+winH/2+',width='+winW/2);
  });


})();
