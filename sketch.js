//Global Variables
var monkey,ground,backGround,jungle,fruit,banana,obstacle,stone;
var bananagroup,obstaclesgroup,invisibleground,gameOver,restart,score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");   
  backGround = loadImage("jungle.jpg");
  ground = loadImage("ground.jpg");
  fruit = loadImage("Banana.png");
  stone = loadImage("stone.png");
  gameover = loadImage("gameOver.png");
  Restart = loadImage("restart.png");
  
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  
  jungle = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  jungle.addImage("jungle",backGround);
  
  Monkey = createSprite(50,250);
  Monkey.addAnimation("monk",monkey);
  Monkey.scale = 0.1;
  
  Ground = createSprite(displayWidth,displayHeight/0.5);
  Ground.addImage("12",ground);
  Ground.scale = 0.1;
  
  invisibleground = createSprite(displayWidth/2,displayHeight/1.1,displayWidth,10);
  
  bananagroup = new Group();
  obstaclesgroup = new Group();
  
  gameOver = createSprite(displayWidth/2,displayHeight/2);
  restart = createSprite(displayWidth/2,displayHeight/1.8);
  gameOver.addImage(gameover);
  gameOver.scale = 0.5;
  restart.addImage(Restart);
  restart.scale = 0.5;

  fill("blue");
  textSize(25);
  textFont("Georgia");
  textStyle(BOLD);

  score = 0;
  
}

function draw(){
 background(200);
 edge = createEdgeSprites(); 
  
  invisibleground.visible = false;
  Monkey.collide(invisibleground);
  
  if(gameState === PLAY){
    
   Monkey.collide(edge);  
    
   if(keyDown("space")){
      Monkey.velocityY = -12 ;
    }
  
    if(Monkey.isTouching(bananagroup)){
      score = score+2;
      bananagroup.destroyEach();
    }
  
    switch(score){
      case 6:Monkey.scale = 0.12;
        break;
      case 16:Monkey.scale = 0.14;  
        break;
      case 26:Monkey.scale = 0.16;
        break;
      case 36:Monkey.scale = 0.18;  
        break;
      case 46:Monkey.scale = 0.20;  
        break;
      case 56:Monkey.scale = 0.22;
        break;  
    }       
    
    Monkey.velocityY = Monkey.velocityY + 0.8;
    if (keyDown("left")){
      Monkey.x = Monkey.x-10;
      Monkey.collide(edge);
    }
    if (keyDown("right")){
      Monkey.x = Monkey.x+10;
      Monkey.collide(edge);
    }
  
    Ground.velocityX = -10;
    if(Ground<0){
     Ground.x = Ground.width;  
    }
    
    if(obstaclesgroup.isTouching(Monkey)){
      gameState = END;
      Monkey.scale = 0.1;
    }
  
    spawnbanana();
    spawnObstacles();   
    
    gameOver.visible = false;
    restart.visible = false;  
    
    }
else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true; 
    
    ground.velocityX = 0;
    Monkey.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    
    obstaclesgroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
    
  }
  

if(mousePressedOver(restart)) {
   reset();
}
  
drawSprites();
  
text("Score :"+score,displayWidth/1.1,displayHeight/7);   
textSize(30);
fill("purple"); 
text("Help the monkey to eat banana and grow taller",displayWidth/6,displayHeight/7);
  
}

function reset(){
  
  gameState = PLAY;
  score = 0;
  obstaclesgroup.setLifetimeEach(0);
  bananagroup.setLifetimeEach(0);
  
}

function spawnObstacles() {
  
  if(frameCount % 300 === 0) {
    obstacle = createSprite(displayWidth,random(displayHeight/1.1,displayHeight/1.7),10,40);
    obstacle.addImage("obstacle",stone);

    obstacle.velocityX = -10;
    //assign scale to the obstacle           
    obstacle.scale = 0.3;
    
   //add each obstacle to the group
    obstaclesgroup.add(obstacle);
  }
  
}

function spawnbanana() {

  if (frameCount % 80 === 0) {
    banana = createSprite(displayWidth,random(displayHeight/1.8,displayHeight/4),40,10);
    banana.addImage("Banana",fruit);
    banana.scale = 0.05;
    banana.velocityX = -10;
    bananagroup.add(banana);
  }
  
}