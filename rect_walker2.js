(function() {

  "use strict";
  // initialise canvas
  var canvas = document.getElementById('background');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var step = 1;

  var rand = function(min, max) {
    return (Math.random() * (max - min + 1) + min)^0;
  };

  var round = function (float) {
    return float^0;
  };

  var seen = {x: [],y: []};

  var Walker = function(x,y) {
    var self = this;
    self.x = x || rand(0,width);
    self.y = y || rand(0,height);
    self.radius = step;
    //self.exist = rand(0,1);
    self.color = 'rgb(' + rand(150, 240) + ',' + rand(150, 240) + ',' + rand(150, 240) + ')';
  };

  Walker.prototype.display = function() {
    var self = this;
    ctx.beginPath();
    //var color = rand(150, 240);
//    ctx.fillStyle = '#ccc';
    //ctx.strokeStyle = '#000';
    //this.radius = rand(20,200);
    //this.radius = step;
    ctx.fillStyle = self.color;
    ctx.rect(self.x, self.y, step, this.radius);
    ctx.fill();
    //ctx.stroke();
    ctx.closePath();

  };

  Walker.prototype.walk = function () {
    var choice = Math.random();
    //step = rand(20,200);
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
   /* seen.x.push(this.x);
    seen.y.push(this.y);*/
  };

  var w = [];

  var collectWalkers1 = function () {
    w.length = 0;
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );

    for (var i = 0; i < 5000; i++) {
      w.push(new Walker());
    }
  };
  collectWalkers1();

 var _step = 20;


  var collectWalkers = function () {
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    w.length = 0;
    var v;
    for (var x = 0; x < width; x += _step) {
      for (var y = 0; y < height; y += _step/2) {
        v = new Walker(x,y);
        v.color = '#ccc';
        w.push(v);
      }
    }
  };
  //collectWalkers();
  // initialise a walker object

  var draw = function() {
    for (var n = 0; n < w.length; n++){
        w[n].walk();
        w[n].display();
    }


    //console.log('%s',step,seen.x.indexOf(w.x), seen.y.indexOf(w.y));
  };
  draw();

  // run draw function
  /*setInterval(function(){
    // if(seen.x.indexOf(w.x) != -1 && seen.y.indexOf(w.y) != -1) {
    draw();
    // }
  }, 1);
*/



  /**
   * Provides requestAnimationFrame in a cross browser way.
   * @author paulirish / http://paulirish.com/
   */

  if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

      return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

          window.setTimeout( callback, 70 );

        };

    } )();

  }


  var animId;

  var animloop = function(){
    draw();
    animId = requestAnimationFrame(animloop);
  };
  animloop();


  document.getElementById('save').addEventListener("click", function(evt){
    var img = canvas.toDataURL("image/jpg");
    window.open(img,'DescriptiveWindowName','height='+height/2+',width='+width/2);
  });

  var c = 0;
  canvas.addEventListener("click", function(evt){
    c++;
    if (c%2===0){
      cancelAnimationFrame(animId);
      collectWalkers1();
      animloop();
    }else{
      cancelAnimationFrame(animId);
      collectWalkers();
      animloop();
      setTimeout(function(){
        cancelAnimationFrame(animId);
      }, 777)
    }
  });

  canvas.style.cursor = 'pointer';




})();
