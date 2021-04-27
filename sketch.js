var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1;

var oppPink1Img;
var oppYellow1Img;
var oppRed1Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/sprite_0.png");
  mainRacerImg1 = loadImage("images/space ship.png");
  
  oppPink1Img = loadImage("images/purple alien.png");
  
  oppYellow1Img = loadImage("images/yellow alien.png");
  
  oppRed1Img = loadImage("images/green alien.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(780,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy cycling
mainCyclist  = createSprite(70,150);
mainCyclist.addImage("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.30;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  
//gameover image
gameOver = createSprite(400,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;  
  
//creating groups for other obstacle cyclists
//CG-cyclist group
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill("black");
  text("Distance: "+ distance,600,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x <300 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addImage("opponentPlayer1",oppPink1Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addImage("opponentPlayer2",oppYellow1Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addImage("opponentPlayer3",oppRed1Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill("black");
    text("Press Up Arrow to Restart the game!", 250,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addImage("SahilRunning",mainRacerImg1);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.25;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addImage("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.25;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addImage("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.25;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addImage("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addImage("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}