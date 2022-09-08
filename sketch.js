var sam, shipImg, enemy,enemyImg, enemyGroup, earthImg,earth;

var score = 0; 
var coin, coinImg,coinsGroup;
var shoot_sound;
var heart1, heart1Img, heart2, heart2Img, heart3, heart3Img;
var life = 3;

var bgImg;
var boundary1, boundary2;
var bullet, bulletGroup;
var coinsCollected = 0;
var reset, resetImg;


function preload(){
  shipImg = loadImage("spaceShip.png")
  enemyImg = loadImage("enemy.png")
  earthImg = loadImage("earth.png")
  coinImg = loadImage("coin.png")
  shoot_sound = loadSound("explosion.mp3")
  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")
  bgImg = loadImage("bg_space.png")
  resetImg = loadImage("reset.png")
}




function setup() {
  createCanvas(800,600);
  earth = createSprite(400, 590, 50,50);
  earth.addImage(earthImg)
  earth.scale = 0.5;
  earth.debug = false;
  earth.setCollider("rectangle", 0,0, 800, 100)
 
  sam = createSprite(400, 450, 50, 50);
  sam.addImage(shipImg)
  sam.scale = 0.3;
  sam.visible = true;

  boundary1 = createSprite(20, 300, 50, 600)
  boundary2 = createSprite(780, 300, 50, 600)
  boundary1.visible = false;
  boundary2.visible = false;

  heart1 = createSprite(545, 50, 50,50)
  heart1.addImage(heart1Img)
  heart1.scale = 0.2
  heart1.visible = true;

  heart2 = createSprite(600, 50, 50,50)
  heart2.addImage(heart2Img)
  heart2.scale = 0.2
  heart2.visible = true;

  heart3 = createSprite(700, 50, 50,50)
  heart3.addImage(heart3Img)
  heart3.scale = 0.2
  heart3.visible = true;

  bulletGroup = new Group();
  coinsGroup = new Group();
  enemyGroup = new Group();
 

 reset = createSprite(400, 300, 20, 20)
 reset.addImage(resetImg)
 reset.scale = 0.1;
 reset.visible = false;
 


}

function draw() {
  background(bgImg);  
  drawSprites();
  push();
  textSize(20)
  fill("red")
  text("Score: " + score, 100, 100)
  text("Life: " + life, 250, 100)
  text("Coins Collected: " + coinsCollected, 400, 100)
  pop();

  
  sam.x = World.mouseX
  sam.bounceOff(boundary1)
  sam.bounceOff(boundary2)

  if(keyDown("space")){
   bullet = createSprite(sam.x, sam.y)
   bullet.scale = 0.1
   bulletGroup.add(bullet)
   bulletGroup.setVelocityYEach(-3)
  
  }
  obstacles();
  powerCoins();


  if(bulletGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
    score += 1;
  }
  if(coinsGroup.isTouching(bulletGroup) || coinsGroup.isTouching(sam)){
    coinsCollected += 1 
    coinsGroup.destroyEach();
    bulletGroup.destroyEach();
  }
  if(enemyGroup.isTouching(sam) || enemyGroup.isTouching(earth)){
    life -= 1;
    enemyGroup.destroyEach();
  }
 

  if(life === 3){
    heart3.visible = true;
    heart2.visible = false;
    heart1.visible = false;
  }

  if(life === 2){
    heart2.visible = true;
    heart1.visible = false;
    heart3.visible = false;
  }

  if(life === 1){
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  }

  if(life === 0){
    textSize(20)
    stroke("white")
    text("You lost! Game Over",400, 300 )
    sam.visible = false;
   enemyGroup.setVelocityYEach(0)
    coinsGroup.setVelocityYEach(0)
   
    enemyGroup.destroyEach();
    coinsGroup.destroyEach();
    reset.visible = true;
   
   
  }

  if(score > 10){
    textSize(20)
    stroke("yellow")
    text("Congratulations! You Win", 400, 300)
    sam.visible = false;
    enemyGroup.setVelocityYEach(0)
    coinsGroup.setVelocityYEach(0)
   
    enemyGroup.destroyEach();
    coinsGroup.destroyEach();
    
    
  }
  if(mousePressedOver(reset)){
   reset.visible = false;
   resetFunction();
  }
  
}

function obstacles(){
  if(frameCount % 150 === 0){
    enemy = createSprite(Math.round(random(100, 600)), 100)
    enemy.addImage(enemyImg)
    enemy.scale = 0.3
  
    enemy.velocityY=4
    enemy.lifetime=200
    enemyGroup.add(enemy)
    

  }

}

function powerCoins(){
  if(frameCount % 180 === 0){
    coin = createSprite(Math.round(random(50,550)), 100)
    coin.addImage(coinImg)
    coin.scale = 0.5;
    coin.velocityY = 4;
    coin.lifetime = 200;
    coinsGroup.add(coin)
  }

  

 

}

function resetFunction(){
  sam.visible = true;
  heart1.visible = true;
  heart2.visible = true;
  heart3.visible = true;
  enemyGroup.setVelocityYEach(4)
  coinsGroup.setVelocityYEach(4)
  
  score = 0 
  life = 3
  coinsCollected = 0


}