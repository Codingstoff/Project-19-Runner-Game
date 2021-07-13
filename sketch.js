var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var lasaugimage,lasaugleftimage, lasaug;
var invisblock;
var handimage,hand,hand2,hand3;
var restartImg,restart;
var blockimage, block;
var wallimage, wall;
var invisblockGroup, blockGroup;
var score=0;


function preload() {
  lasaugimage = loadImage("LasagnaBoye.jpg");
  lasaugleftimage = loadImage("LasagnaBoyefacingleft.jpg")
  handimage = loadImage("Handreaching.png")
  blockimage = loadImage("Cracked Brick Pixel.png");
  wallimage = loadImage("PixelWall.jpg");
  restartImg = loadImage("restart.png")


}

function setup() {
  createCanvas(600, 600);

  wall = createSprite(300, 300, 100, 200);
  wall.addImage(wallimage);
  wall.scale = 1.0
  lasaug = createSprite(300, 300, 50, 50);
  lasaug.addImage(lasaugimage);
  lasaug.scale = 0.6;
  
  hand = createSprite(300, 500, 50, 50);
  hand2 = createSprite(500, 550, 50, 50);
  hand3 = createSprite(100, 600, 50, 50);
  hand.addImage(handimage);
  hand2.addImage(handimage);
  hand3.addImage(handimage);
  hand.scale = 1.0;
  hand2.scale = 1.0;
  hand3.scale = 1.0;
  
    restart = createSprite(300,350,50,50);
  restart.addImage(restartImg);
  restart.visible = false;
  
  blockGroup = new Group();
  invisblockGroup = new Group();
  
  lasaug.debug = true;
 lasaug.setCollider("rectangle", 0,0,118,118)
  
  score = 0;
}

function draw() {
  background(0)
  textSize(30)
text("Score: "+ score, 250,200);


  if (gamestate === PLAY) {
     wall.velocityY = (1 + 1*score/100);
    
  score = score + Math.round(getFrameRate()/60);
    if (wall.y > 500) {
      wall.y = 300;
    }

    if (keyDown("space")) {
      lasaug.velocityY = -12;
    }
    
    lasaug.velocityY = lasaug.velocityY + 0.8;
    
      if (keyDown(LEFT_ARROW)) {
      lasaug.x = lasaug.x -10;
       lasaug.addImage(lasaugleftimage);
    }
    
    if (keyDown(RIGHT_ARROW)) {
      lasaug.x = lasaug.x + 10;
      lasaug.addImage(lasaugimage);
    }
    
    if (lasaug.isTouching(blockGroup))
      {
        lasaug.velocityY = 0;
      }
    
     
         if (lasaug.y > 602 || lasaug.isTouching (invisblockGroup)) 
            {
             gamestate = END;
            }
    
       if (lasaug.y < -50 )
            {
             gamestate = END;
            }


    spawnBlocks();


  } else if (gamestate === END) {
    lasaug.visible = false
    wall.visible = false
    hand.visible = false
    hand2.visible = false
    hand3.visible = false
    invisblockGroup.destroyEach();
    blockGroup.destroyEach();
    textSize(30);
    fill("yellow");
    text("Game Over", 225, 300);
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
      
    }

  }

















  drawSprites();
}


function spawnBlocks() {
  if (frameCount % 200 === 0) {
    block = createSprite(200, -30, 50, 50);
    block.addImage(blockimage);
    block.scale = 0.3;
    block.lifeTime = 600;
    block.velocityY = (1 + 1*score/100);

    lasaug.depth = block.depth + 1;
    
    block.x = Math.round(random(150, 450));
   

    
    invisblock = createSprite(200, -30, 50, 50);
    invisblock.lifeTime = 600;
    invisblock.velocityY = (1 + 1*score/100);
    invisblock.x = block.x;
    invisblock.y = block.y;
    invisblock.visible = false

    blockGroup.add(block);
    invisblockGroup.add(invisblock);
  }

}


function reset(){
  gamestate = PLAY;
  restart.visible = false;
  lasaug.visible = true
    wall.visible = true
    hand.visible = true
    hand2.visible = true
    hand3.visible = true
  lasaug.x = 300
  lasaug.y = 300
  lasaug.velocityY = 0
  score = 0;
  
}