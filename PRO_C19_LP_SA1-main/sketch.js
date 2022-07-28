var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 2;

  ghost = createSprite(150, 400);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3

  doorsGroup = createGroup();
  
  climbersGroup = createGroup();


}

function draw() {
  background(200);

  if (tower.y > 400) {
    tower.y = 300
  }

  if(keyDown("left")){
    ghost.x = ghost.x-2;
  }
  if(keyDown("right")){
    ghost.x = ghost.x+2;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  

ghost.velocityY = ghost.velocityY + 1

if(ghost.isTouching(climbersGroup)){
  ghost.velocityY = 0
}

if(ghost.y > 600)
{
  gameState = "end"
}

if(gameState == "end"){
  ghost.destroy()
  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  tower.destroy ()

  textSize(30)
  fill("red")
  text("GAME OVER!!" , 200 , 300)

}

  drawSprites()
  spawnDoors()
}


function spawnDoors(){
  if(frameCount % 100 == 0){
    door = createSprite( Math.round(random(100 , 500))  , -50);
    door.addImage("door", doorImg);
    door.velocityY = 2
    
    climber = createSprite(door.x, 10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 2

    ghost.depth = door.depth + 1

    doorsGroup.add(door);
    climbersGroup.add(climber);


  }
}