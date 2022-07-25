const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var fruit_con_4;
var furit_con_5;
var fruit_con_6;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3,button4,button5,button6;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Andriod/i.test(navigator.userAgent)
  if(isMobile){
    canvasWidth = displayWidth;
    canvasHeight = displayHeight;
    createCanvas(displayWidth + 80, displayHeight + 80)
  }
  else{
    canvasWidth = windowWidth
    canvasHeight = windowHeight
    createCanvas(windowWidth, windowHeight)
  }
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(60,60);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //btn3
   button3 = createImg('cut_btn.png');
   button3.position(100,230);
   button3.size(60,60);
   button3.mouseClicked(drop3);

   //btn4
   button4 = createImg('cut_btn.png');
   button4.position(700,40);
   button4.size(60,60);
   button4.mouseClicked(drop4);

   //btn5
   button5 = createImg('cut_btn.png');
   button5.position(1100,130);
   button5.size(60,60);
   button5.mouseClicked(drop5);

   //btn6
   button6 = createImg('cut_btn.png');
   button6.position(1000,5);
   button6.size(60,60);
   button6.mouseClicked(drop6);


  mute_btn = createImg('mute.png');
  mute_btn.position(600,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(10,{x:40,y:30});
  rope2 = new Rope(4,{x:370,y:40});
  rope3 = new Rope(6,{x:100,y:250});
  rope4 = new Rope(12,{x:750,y:70});
  rope5 = new Rope(17,{x:1150,y:140})
  rope6 = new Rope(16,{x:1070,y:5})

  ground = new Ground(canvasWidth/2,canvasHeight,canvasWidth,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,canvasHeight - 80,100,100);
  bunny.scale = 0.2;
  bunny.velocityX = 2

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(1000,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);
  fruit_con_4 = new Link(rope4,fruit);
  fruit_con_5 = new Link(rope5,fruit);
  fruit_con_6 = new Link(rope6,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(225);
  image(bg_img,0,0,canvasWidth,canvasHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  rope5.show();
  rope6.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true )
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }

  

   if(bunny.x >= 1200){
     bunny.velocityX = -2
   }

   if(bunny.x <= 100){
     bunny.velocityX = 2
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}

function drop4()
{
  cut_sound.play();
  rope4.break();
  fruit_con_4.detach();
  fruit_con_4 = null; 
}

function drop5()
{
  cut_sound.play();
  rope5.break();
  fruit_con_5.detach();
  fruit_con_5 = null; 
}

function drop6()
{
  cut_sound.play();
  rope6.break();
  fruit_con_6.detach();
  fruit_con_6 = null; 
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


