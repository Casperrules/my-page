const nav = document.querySelector(".navbar");
const section = document.querySelector("header");

const options = {
    rootMargin: "-25% 0% 0% 0%"
};
const observer = new IntersectionObserver(function(entries, observer){
    
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            nav.classList.add("nav-scrolled");
        }
        else{
            nav.classList.remove("nav-scrolled");
        }
    })
},options);

observer.observe(section);


var canvas = document.getElementById('container');
var clone = document.getElementById('blurCanvasBottom');

var cloneCtx = clone.getContext('2d');
var ctx = canvas.getContext('2d');


var w = $('#blurCanvasTop').width();
var h = $('#blurCanvasTop').height();

var ww = $(window).width();
var wh = $(window).height();
canvas.width = ww;
canvas.height= wh;
var partCount = 200;
var particles = [];

function particle(){
  this.color = 'rgba(255,255,255,'+ Math.random()+')';
  this.light_color_dot = 'rgba(204, 255, 0,'+ Math.random()+')';
  this.x = randomInt(0,ww);
  this.y = randomInt(0,wh);
  this.direction = {
    "x": -1 + Math.random() * 2,
    "y": -1 + Math.random() * 2
  };
  this.vx = 0.3 * Math.random();
  this.vy = 0.3 * Math.random();
  this.radius = randomInt(2,3);
  this.float = function(){
    this.x += this.vx * this.direction.x;
    this.y += this.vy * this.direction.y;
  };
  this.changeDirection = function (axis) {
    this.direction[axis] *= -1;
  };
  this.boundaryCheck = function () {
            if (this.x >= ww) {
                this.x = ww;
                this.changeDirection("x");
            } else if (this.x <= 0) {
                this.x = 0;
                this.changeDirection("x");
            }
            if (this.y >= wh) {
                this.y = wh;
                this.changeDirection("y");
            } else if (this.y <= 0) {
                this.y = 0;
                this.changeDirection("y");
            }
        };
  this.draw = function () {
      var color = this.color;
      if(document.querySelector("header").classList.contains("dark")){
          color = this.light_color_dot;

      }
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  };
}
function clearCanvas() {
 cloneCtx.clearRect(0, 0, ww, wh);
 ctx.clearRect(0, 0, ww, wh);
}
function createParticles(){
  for (var i=0;i<partCount;i++){
    var p = new particle();
    particles.push(p);
  }
}
function drawParticles() {
   for (var i=0;i<particles.length;i++) {
     var p = particles[i];
     p.draw();
   }
}
function updateParticles() {
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.float();
            p.boundaryCheck();
        }
}
createParticles();
drawParticles();
function animateParticles() {
        clearCanvas();
        drawParticles();
        updateParticles();
        cloneCtx.drawImage(canvas, 0, 0);
        requestAnimationFrame(animateParticles);
    }
requestAnimationFrame(animateParticles);
cloneCtx.drawImage(canvas, 0, 0);

$(window).on('resize',function(){
  ww = $(window).width();
  wh = $(window).height();
  canvas.width = ww;
  canvas.height= wh;
  clearCanvas();
  particles = [];
  createParticles();
  drawParticles();
});
function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function velocityInt(min,max)
{
    return Math.random()*(max-min+1)+min;
}


//dark mode toggle 
var cir = document.getElementById('circle');
var tg = document.getElementById('toggle');
cir.addEventListener('click', function() {
  if (cir.style.marginLeft == '3px') {
    cir.style.marginLeft = '33px';
    cir.style.backgroundColor = '#000';
    tg.style.backgroundColor = '#1b3ae9';
    document.querySelector("header").classList.add('dark');
    document.querySelector("body").classList.add("dark");
    localStorage.setItem('dark',true);
  } else {
    cir.style.marginLeft = '3px';
    cir.style.backgroundColor = '#fff';
    tg.style.backgroundColor = '#6db4cc';
    document.querySelector("header").classList.remove('dark');
    document.querySelector("body").classList.remove("dark");
    localStorage.setItem('dark',false);
  }

});
//just to remember for future reference that theme is dark
const theme = localStorage.getItem('dark');

if(theme == "true"){
  cir.style.marginLeft = '33px';
    cir.style.backgroundColor = '#000';
    tg.style.backgroundColor = '#1b3ae9';
  document.querySelector("header").classList.add("dark");
  document.querySelector("body").classList.add("dark");
}
else{
  cir.style.marginLeft = '3px';
    cir.style.backgroundColor = '#fff';
    tg.style.backgroundColor = '#6db4cc';
    document.querySelector("header").classList.remove('dark');
    document.querySelector("body").classList.remove("dark");

}

