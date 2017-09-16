console.log("inside js");

// Zombie Timer
// Game Over once 10 hits have been achieved on zombie
var timer1 = null;

var el=null;
var score= 0; //number of 'hits'
var shots = 0; //total 'shots'
var accuracy = 0; // Accuracy of shots to zombie hits
var zHits = 0; // amount of zombie hits
var highscore = 0; //where we will be saving our highestScore


            
            function moveIt(){
                //animate the image
                if(parseInt(el.style.left) > (screen.width - 50)) el.style.left = 0;
                el.style.left = parseInt(el.style.left)+6+'px';
                el.style.top = 20 + (80 * Math.sin(parseInt(el.style.left)/50)) + 'px';
                
                //set the timer1
                timer1=setTimeout(moveIt,25);
            }
                    
            function scoreUp(){
                //increment the player's score
                score ++;
                //increment the amount of zombie hits
                zHits++;
            }
            
            function scoreboard(){
                //display the scoreboard
                
                $("#score").html("<h3>Shots: "+shots + " Score: " + score + " </h3>");
                $("#stats").html("<h3>Accuracy: " + accuracy + "% Highscore: " + highscore + "</h3>");
            }
            
            window.onload=function(){
                el=document.getElementById("img1");
               
                //onclick handler calls scoreUp()
                //when img is clicked
                el.onclick = scoreUp;
                
                
                //Update total of number of shots
                //for every click within play field accuracy is adjusted

                $("#range").on("click",function(){
                    shots++;

                    accuracy = Math.ceil(score / shots *100);

                    highscore = 
                    
                    //console.log(accuracy);
                    
                    //update scoreboard
                    scoreboard();
                } )

                
                //Initialize game
                scoreboard();
                el.style.left = '50px'

                moveIt();
            };
            







