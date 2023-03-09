const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext('2d')
const button = document.getElementById("start-button")


// canvas H 750 * W 750

const scale = 15;
let snakeHeadX  = 25  //  scale * 5;
let snakeHeadY = 25   //  scale * 5; 

let tail, tailX, tailR, tailY;
let speedX, speedY;
let tail0;
let direction;
let directionPrev;
let grid = 20;
const startingX = canvas.width/2 - 25
const startingY = canvas.height - 125
let animationId;
let generateFoodId;

let foodArray = []


let foodX , foodY ;
let snakeBody = []; 
let snakeGrow = 6;
let speed = 1;
let goingUp ;
let goingDown ;
let goingRight  ;
let goingLeft;

let GameOn = true;

var blockSize = 30;
var total_row = 27; //total row number         //heigt
var total_col = 27; 

let directionVar;
   
    let previousDir;

const playerSnake = {

  x: snakeHeadX,
  y: snakeHeadY,
  playerSpeedX: speedX,
  playerSpeedY:speedY,
  //angle:  0,
  
  //width: 50,
  //height: 100,
  draw: function() {
  
    headS()
          
           
  },

  moveLeft: function() {
   
    this.x = this.x - 15
   
    ctx.beginPath();
    ctx.arc(this.x+(scale/5), this.y+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(this.x+(scale/5), this.y+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
  },

  moveRight: function() {
  
    this.x = this.x + 15
  

    ctx.beginPath();
    ctx.arc(this.x+scale-(scale/5), this.y+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(this.x+scale-(scale/5), this.y+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
   
  },

  moveUp: function() {

    

    this.y = this.y - 15
    
    ctx.beginPath();
    ctx.arc(this.x+(scale/5), this.y+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(this.x+scale-(scale/5), this.y+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    
    
  },

  moveDown: function() {

   
    
    this.y = this.y + 15
    ctx.beginPath();
    ctx.arc(this.x+(scale/5), this.y+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(this.x+scale-(scale/5), this.y+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
        
  }
    

  }
  
/*
  window.addEventListener("keydown", pressedKey);

  function pressedKey() {
      
          previousDir = direction;
          directionVar = event.key.replace("Arrow", "");
          changeDirection();
      }
  
*/  

function headS() {

  ctx.clearRect(0,0,750,750)

  ctx.beginPath();
  ctx.arc(playerSnake.x+scale/2, playerSnake.y+scale/2, scale/2, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  snakeBody.push({x: playerSnake.x, y: playerSnake.y})
//ctx.arc(playerSnake.x+scale/2, playerSnake.y+scale/2, scale/2, 0, 2 * Math.PI);


  if (snakeBody.length > snakeGrow) {
      //ctx.clearRect(snakeBody.shift(), snakeBody.shift(), scale, scale);  
      snakeBody.shift()
    }
    console.log("snake body", snakeBody)
    checkCollision() 
    if(playerSnake.x === foodX && playerSnake.y === foodY) {
        console.log("Eating")
    }

    for (let i = 0; i < snakeBody.length; i++) {
      ctx.beginPath();
      ctx.arc(snakeBody[i].x+scale/2, snakeBody[i].y+scale/2, scale/2, 0, 2 * Math.PI);
      ctx.fillStyle = "green";
      ctx.fill();
  }
  

    for(let i = 0; i < foodArray.length; i++)
      {
        foodArray[i].draw()
        foodCollision(foodArray[i], i) 

      }
  }


  function generateFood() {
    generateFoodId = setInterval(() => {
      foodArray.push(new Food());
     }, 2000);
   }

function checkCollision() {
  let tailCollision=false, 
  //virusCollision=false;
  boundaryCollision=false;
  //with its own tail

  for (let i = 0; i < snakeBody.length  ; i++) {
    
      if (playerSnake.x == snakeBody[i] && playerSnake.y == snakeBody[i]) {
        
          tailCollision=true;
        //  console.log("Body")
      }
  }
  //with boundaries
  if(playerSnake.x >= canvas.width || playerSnake.x < 0 || playerSnake.y >= canvas.height || playerSnake.y < 0)
  {
      boundaryCollision=true;
//      console.log("Bounds")
  }
  //with virus
 /* if(snakeHeadX===virusX && snakeHeadY===virusY) {
      virusCollision=true;
  }
  */
  return (tailCollision || boundaryCollision);    //*return (tailCollision || boundaryCollision || virusCollision);
}
function foodCollision (object, i) {
    
  if (
      playerSnake.x > object.x
      && playerSnake.x < object.x + object.width
      && playerSnake.y > object.y
      && playerSnake.y < object.y + object.height
      ) {
        snakeGrow++
      console.log("Eating")
      foodArray.splice(i,1)
  }

}

function changeDirection() {
  
  switch (directionVar) {
      case "Up":
          //move "up" only when previous direction is not "down"
        
          if (previousDir !== "Down") {
              direction=directionVar;
              speedX = 0;
              speedY = scale * -speed;
              
          } 
          break;

      case "Down":
          //move "down" only when previous direction is not "up"
          if (previousDir !== "Up") {
              direction=directionVar;
              speedX = 0;
              speedY = scale * speed;
          } 
          break;

      case "Left":
          //move "left" only when previous direction is not "right"
          if (previousDir !== "Right") {
              direction=directionVar;
              speedX = scale * -speed;
              speedY = 0;
          } 
          break;

      case "Right":
          //move "right" only when previous direction is not "left"
          console.log(speedX+ " " + speedY)
          if (previousDir !== "Left") {
              direction=directionVar;
              speedX = scale * speed;
              speedY = 0;

              console.log(speedX+ " " + speedY)
          } 
          break;
  }
}

class Food {
  constructor() {
    this.x =  Math.floor(Math.random() * total_col) * blockSize;
    this.y = Math.floor(Math.random() * total_row) * blockSize;
    this.width = 75;
    this.height = 75;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, 15, 15);
  }
  
}










function placeFood() {
 
  // in x coordinates.
  foodX = Math.floor(Math.random() * total_col) * blockSize;
   
  //in y coordinates.
  foodY = Math.floor(Math.random() * total_row) * blockSize; 

  ctx.fillStyle = "yellow";
  ctx.fillRect(foodX, foodY, scale, scale);
}


function moveSnakeForward() {
  tail0=tail[0];
  for (let i = 0; i < tail.length - 1; i++) {
      tail[i] = tail[i + 1];
  }
  tail[totalTail - 1] = { tailX: snakeHeadX, tailY: snakeHeadY };
  snakeHeadX += speedX;
  snakeHeadY += speedY;
}


/*

function drawSnakeTail() {
  let tailR = scale/4;
      for (i = 0; i < tail.length; i++) {
          tailR=tailR+((scale/2-scale/4)/tail.length);
          ctx.beginPath();
          ctx.fillStyle = "green";
          ctx.arc((tail[i].tailX+scale/2), (tail[i].tailY+scale/2), tailR, 0, 2 * Math.PI);
          ctx.fill();
      }
}
*/





function startGame() {

  console.log("Starting")
  //Invisible
  button.style.visibility = "hidden"
  //logo.style.visibility = "hidden"
  //logo.style.height = "0px"
  // Visible
  canvas.width = "750"
  canvas.height = "750"
  canvas.style.visibility = "visible"
  
  
  directionVar = "Right";
    direction = "Right";
    previousDir = "Right";
  
    speedX = scale * speed;
    speedY = 0;
generateFood()

}
  
  window.onload = function() {
   
    document.getElementById("start-button").onclick = function() {
      
      startGame()
    // checkCollision() 
      //moveSnakeForward()
      
          
    }
    document.addEventListener('keydown', e => {
      playerSnake.draw();
      switch (e.keyCode) {
        case 38:
          //changeDirection("Up")
          playerSnake.moveUp();
          break;
        case 40:
          //changeDirection("Down")
          playerSnake.moveDown();
          
          break;
        case 37:
          //changeDirection("Left")
          playerSnake.moveLeft();
          break;
        case 39:
          //changeDirection("Right")
          
         playerSnake.moveRight();
          break;
      }
  
    });
  }

  


  

/*
    function changeDirection(e) {

      document.addEventListener('keydown', e => {
        switch (e.keyCode) {
          case 38:
            if (e.code == "ArrowUp" && speedY != 1) {
              // If up arrow key pressed with this condition...
              // snake will not move in the opposite direction
              speedX = 0;
              speedY = -1;
              //DrawSnake("Up")
              console.log("Up")
            }
            break;
          case 40:
            if(e.code == "ArrowDown" && speedY != -1) {
              //If down arrow key pressed
              speedX = 0;
              speedY = 1;
              //DrawSnake("Down")

          }
            break;
          case 37:
            if (e.code == "ArrowLeft" && speedX != 1) {
              //If left arrow key pressed
              speedX = -1;
              speedY = 0;
          }
            break;
          case 39:
            if (e.code == "ArrowRight" && speedX != -1) {
              //If Right arrow key pressed
              speedX = 1;
              speedY = 0;
          }
            break;
        }
    
      });



    }
*/




  

/*

    // function to Draw the Snake head and the eyes
function DrawSnake() {
 //direction = "Down"   // Try...
 
        ctx.beginPath();
        ctx.arc(this.x+scale/2, snakeHeadY+scale/2, scale/2, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();
       

if(direction==="Down")    {
    ctx.beginPath();
    ctx.arc(snakeHeadX+(scale/5), snakeHeadY+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(snakeHeadX+scale-(scale/5), snakeHeadY+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
                          }
        
else if(direction==="Up") {
    ctx.beginPath();
    ctx.arc(snakeHeadX+(scale/5), snakeHeadY+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(snakeHeadX+scale-(scale/5), snakeHeadY+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
                          }
else if(direction==="Left") {
    ctx.beginPath();
    ctx.arc(snakeHeadX+(scale/5), snakeHeadY+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(snakeHeadX+(scale/5), snakeHeadY+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
                            }
else                        {
    ctx.beginPath();
    ctx.arc(snakeHeadX+scale-(scale/5), snakeHeadY+(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.arc(snakeHeadX+scale-(scale/5), snakeHeadY+scale-(scale/5), scale/8, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
       
                          }
                              
  }      
*/



  /*
  function drawSnakeTail() {
    let tailR = scale/4;
        for (i = 0; i < tail.length; i++) {
            tailR=tailR+((scale/2-scale/4)/tail.length);
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.arc((tail[i].tailX+scale/2), (tail[i].tailY+scale/2), tailR, 0, 2 * Math.PI);
            ctx.fill();
        }
}
*/



/*


//shift snake's previous positions to next position
function moveSnakeForward() {
    tail0=tail[0];
    for (let i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
    }
    tail[totalTail - 1] = { tailX: snakeHeadX, tailY: snakeHeadY };
    snakeHeadX += xSpeed;
    snakeHeadY += ySpeed;
}
let gameInterval;
function main() {
  //update state at specified interval
  //virusInterval = window.setInterval(virusPosition, 10000);
  gameInterval = window.setInterval(() => {
      ctx.clearRect(0, 0, 750, 750);
      
    
      moveSnakeForward();
      drawSnake();

      //check if snake eats the fruit - increase size of its tail, update score and find new fruit position
      
      if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
          totalTail++;
          //increase the speed of game after every 20 points
          if(totalTail%20==0 && intervalDuration>minDuration) {
              clearInterval(gameInterval);
              window.clearInterval(virusInterval);
              intervalDuration=intervalDuration-10;
              main();
          }
          fruitPosition();
      }
      score.innerText = totalTail;

  }, 150);
}
*/


                