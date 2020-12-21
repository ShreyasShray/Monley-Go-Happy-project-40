var monkey, monkey_animation, monkey_image;
var stone, stoneGroup;
var ground;
var gamestate = "play";
var distance = 0;
var bg;
var jungle_image;
var stone_image;
var banana_image;
var banana, bananaGroup;

function preload(){
  monkey_animation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  jungle_image = loadImage("jungle.png");
  stone_image = loadImage("stone.png");
  banana_image = loadImage("banana.png");
  monkey_image = loadImage("Monkey_05_copy.png");
}

function setup(){
  createCanvas(1400,600);
  bg = createSprite(4000, 380, 8000, 600);
  bg.addImage(jungle_image);
  monkey = createSprite(100, 500, 50, 50);
  monkey.addAnimation("running", monkey_animation);
  monkey.scale = 0.15;

  ground = createSprite(4000, 595, 8000, 10);
  ground.shapeColor = "green";

  stoneGroup = new Group();
}

function draw(){

  
  background("white");
  drawSprites();
  textSize(30);
  stroke("black");
  fill("black");
  text("Press space to jump", camera.position.x - 250, camera.position.y - 230);
  text("Press right arrow to go forward", camera.position.x - 250, camera.position.y - 260);
  textSize(50);
  text("Monkey Go Happy", camera.position.x - 700, camera.position.y - 250);
  textSize(30);
  text("Distance traveled : " + distance, camera.position.x + 300, camera.position.y - 250);

  console.log(monkey.y);

  monkey.collide(ground);
  camera.position.x = monkey.x;

  if(gamestate === "play"){
    monkey.velocityY = monkey.velocityY + 1.2;
    if(keyDown(RIGHT_ARROW)){
      distance = distance + 2;
      monkey.x = monkey.x + 10;
    }
    if(keyDown("space") && monkey.y > 528){
      monkey.velocityY = -14;
    }

    if(monkey.collide(stoneGroup)){
      gamestate = "end";
    }

    if(distance > 1550){
      gamestate = "won";
    }
    }else if(gamestate === "end"){
      textSize(150);
      fill("black");
      text("Game Over", camera.position.x - 350, camera.position.y);
    }else{
      textSize(150);
      text("You Won", camera.position.x -300, camera.position.y);
    }
  spawnstone();
}

function spawnstone(){
  if(monkey.x % 800 === 0){
    var stone = createSprite(monkey.x + 700, 576, 40, 40);
    stone.addImage(stone_image);
    stone.scale = 0.2;
    stone.setCollider("rectangle", 0, 0, 100, 100);
    stone.lifetime = 1000;
    stoneGroup.add(stone);
  }
}