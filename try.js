const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext('2d')
const button = document.getElementById("start-button")


// canvas H 750 * W 750

const scale = 25;
let snakeHeadX = 10,  
    snakeHeadY=10 ;
  
let direction;
  
  window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
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
      DrawSnake()
    }
  
    
 
   

    // function to Draw the Snake head and the eyes
function DrawSnake() {
 direction = "Down"   // Try...

        ctx.beginPath();
        ctx.arc(snakeHeadX+scale/2, snakeHeadY+scale/2, scale/2, 0, 2 * Math.PI);
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

  DrawSnake()
            

    