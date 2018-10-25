(function(){
  'use strict';

  /**
   * Provides requestAnimationFrame in a cross browser way.
   * @author paulirish / http://paulirish.com/
   */

  // requestAnim shim layer by Paul Irish
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.getElementById('background'),
    ctx = canvas.getContext('2d'),
    color = 'rgba(255,255,255,1)';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = color;
  //ctx.lineWidth = .5;
  canvas.style.cursor = 'cell';
  ctx.strokeStyle = color;

  var rand = function(min, max) {
    return (Math.random() * (max - min + 1) + min)^0;
  };

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 450,
    distance: 40,
    d_radius: 100,
    array: []
  };

  function Dot(){
    this.x = rand(0,canvas.width);
    this.y = rand(0, canvas.height);
    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();
    this.color = 'rgb(' +  rand(111, 240) + ',' +  rand(111, 240) + ',' +  rand(111, 240) + ')';
    this.radius = 2;
  }

  //made with some cope&paste
  // slooooww
  Dot.prototype = {
    create: function(){
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    },

    animate: function(){
      for(i = 0; i < dots.nb; i++){

        var dot = dots.array[i];

        if(dot.y < 0 || dot.y > canvas.height){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > canvas.width){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function(){
      var i_dot, j_dot, _dist = 2;
      for(var i = 0; i < dots.nb; i++){
       for(var j = 0; j < dots.nb; j++){
          i_dot = dots.array[i];
          j_dot = dots.array[j];

          if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);

              var grd = ctx.createLinearGradient(i_dot.x, i_dot.y, j_dot.x, j_dot.y);
              grd.addColorStop(0, i_dot.color);
              grd.addColorStop(1, j_dot.color);
              ctx.strokeStyle = grd;
              ctx.stroke();
              ctx.closePath();

           }
        }
        }
    }
  };

  //init dots
  for(var i = 0; i < dots.nb; i++){
    dots.array.push(new Dot());
    var dot = dots.array[i];
    dot.create();
  }

  function draw(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < dots.nb; i++){
      var dot = dots.array[i];
      dot.create();
    }
    dot.line();
    dot.animate();
  }

  var anim;

  var loop = function(){
    draw();
    anim = requestAnimationFrame(loop);
  };
  loop();




  canvas.addEventListener("click", function(evt){
      var dot = new Dot();
      dot.x = evt.offsetX;
      dot.y = evt.offsetY;
      dots.array.push(dot);
      dots.nb++;
  });

})();
