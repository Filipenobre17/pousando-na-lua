var chao;
var nave;
var image_nave;
var plan_fun_;
var vx=0;
var vy=0;
var g=0.05;
var thrust;
var left;
var right;
var fuel=100;
var timer;
var obstacle;
var base;

function preload()
{
image_nave=loadImage('normal.png');
plan_fun_=loadImage('bg.png');
thrust=loadAnimation('b_thrust_1.png','b_thrust_2.png','b_thrust_3.png');
left=loadAnimation('left_thruster_1.png','left_thruster_2.png');
right=loadAnimation('right_thruster_1.png','right_thruster_2.png');
crash=loadAnimation('crash1.png','crash2.png','crash3.png');
land=loadAnimation('landing1.png','landing2.png','landing_3.png');
normal=loadAnimation('normal.png');
obstacle=loadImage('obstacle.png');
base=loadImage('lz.png');


thrust.playing=true;
thrust.looping=false;
left.looping=false;
right.looping=false;
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer=1500;

  thrust.frameDelay=5;
  left.frameDelay=5;
  right.frameDelay=5;

  nave=createSprite(100,50,30,30);
  nave.addImage(image_nave);
  nave.scale=0.1;

  nave.addAnimation('thrusting',thrust);
  nave.addAnimation('lefting',left);
  nave.addAnimation('righting',right);
  nave.addAnimation('normal',normal);
  nave.addAnimation('land',land);
  nave.addAnimation('crash',crash);

  obs=createSprite(320,400,50,100);
  obs.addImage(obstacle)
  obs.debug=false;
  obs.setCollider('rectangle',-15,150,300,250)

  chao=createSprite(500,690,1000,20);
  

  basi=createSprite(880,610,50,30);
  basi.addImage(base);
  basi.scale=0.3;
  basi.setCollider('rectangle',0,180,400,100);
  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(plan_fun_,0,0);

  push();
  fill('white');
  text('velocidade vertical: '+round(vy),800,75);
  text('combustivel: '+fuel,800,25);
  text('velocidade horizontal: '+round(vx,2),800,50);
  pop();

  vy+=g;
  nave.position.y+=vy;
  nave.position.x+=vx;

  if (nave.collide (obs)==true) {
    nave.changeAnimation('crash')
    stop
  }

  var D=dist(nave.position.x,nave.position.y,basi.position.x,basi.position.y);
  if(D<=35 && (vy<2 && vy>-2)&&(vx<2 && vx>-2)){
    vy=0
    vx=0
    g=0
    nave.changeAnimation('land')
  }

  if (nave.collide(chao)==true) {
    nave.changeAnimation('crash')
    vy=0
    vx=0
    g=0
  }

  drawSprites();
}

function keyPressed() {
  if (keyCode===UP_ARROW && fuel>0) {
    upward_thrust();
    nave.changeAnimation('thrusting')
  }

  if (keyCode===RIGHT_ARROW && fuel>0) {
    nave.changeAnimation('lefting')
    rightThrust()
  }

  if (keyCode===LEFT_ARROW && fuel>0) {
    nave.changeAnimation('righting')
    leftThrust()
  }
}

function upward_thrust() {
  vy=-1;
  fuel-=1;
}

function rightThrust() {
  vx+=0.2;
  fuel-=1;
}

function leftThrust() {
  vx-=0.2;
  fuel-=1;
}

function stop() {
  vx=0
  vy=0
  fuel=0
  g=0
}
