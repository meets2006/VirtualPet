//Create variables here
var dog,dogimg,happyDog;
var database,foodS,foodStock;
function preload()
{
  dogimg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
	//load images here
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(250,250);
  dog.addImage(dogimg);
  dog.scale=0.1
  database=firebase.database()
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
    foodS++
}

if(keyWentUp(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogimg)
  foodS=foodS
}
drawSprites();
fill("white");
stroke(3)
text("FoodStock: "+foodS,100,50);
fill("white");
stroke(3)

text("How To PLay: Press Up Arrow key To Feed the Dog",100,100)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
      x=x-1;
  }
    database.ref("/").update({
      Food:x
    })
}
