const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext('2d')
const button = document.getElementById("start-button")


// canvas H 750 * W 750

const scale = 30;
let snakeHeadX  = 10  //  scale * 5;
let snakeHeadY = 10   //  scale * 5; 

let tail, tailX, tailR, tailY;
let speedX, speedY;
let tail0;
let direction;
let grid = 20;
const startingX = canvas.width/2 - 25
const startingY = canvas.height - 125
let animationId;

let snakeBody = []; 

const playerSnake = {

  x: snakeHeadX,
  y: snakeHeadY,
  
  //width: 50,
  //height: 100,
  draw: function() {
  
        ctx.beginPath();
        ctx.arc(this.x+scale/2, this.y+scale/2, scale/2, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();

    snakeBody.push(this.x, this.y);
    
    ctx.arc(this.x+scale/2, this.y+scale/2, scale/2, 0, 2 * Math.PI);
    if (snakeBody.length > 4) {
      
      //let itemToRemove = snakeBody.shift();
      
      ctx.clearRect(snakeBody.shift(), snakeBody.shift(), scale, scale);
      }
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
      // fruit
    
       
  }
    

  }
  






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
  
  
  
}
  







  window.onload = function() {
   
    document.getElementById("start-button").onclick = function() {
      
      startGame()
       
      
          
    }
    document.addEventListener('keydown', e => {
      playerSnake.draw();
      switch (e.keyCode) {
        case 38:
          playerSnake.moveUp();
          break;
        case 40:
          playerSnake.moveDown();
          
          break;
        case 37:
          playerSnake.moveLeft();
          break;
        case 39:
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


                