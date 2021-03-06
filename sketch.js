var sword, fruitGroup, enemyGroup, fruit, monster, score;
var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;

var PLAY=1;
var END = 0
var gameState=1

var knifeSwooshSound, gameOverSound;

function preload(){
  
  swordImage = loadImage("sword.png")
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage= loadImage("gameover.png");
  gameOverSound=loadSound("gameover.mp3");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  
}

function setup(){
  createCanvas(400,400);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  score=0
}

function draw(){
  background("lightblue");
  
  if(gameState === PLAY){
    
    fruits();
    Enemy();
    
    sword.x=mouseX;
    sword.y=mouseY;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+1;
    }
    else
    if(enemyGroup.isTouching(sword)){
      gameState=END;
      gameOverSound.play();
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
    }
  }
  drawSprites();
  textSize(20);
  text("Score: "+ score, 300, 30)
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    if(position == 1){
      fruit.x=400;
      fruit.velocityX=-(13+(score/4));
    }
    else
    {
      if(position==2){
        fruit.x=0
        fruit.velocityX=(13+(score/4));
      }
    }
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }
    if(r==2){
      fruit.addImage(fruit2);
    }
    if(r==3){
      fruit.addImage(fruit3);
    }
    if(r==4){
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    
    fruit.setLifeTime=100;
    
    fruitGroup.add(fruit);
  }
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(15+score/10);
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}
