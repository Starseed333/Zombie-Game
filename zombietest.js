
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
                score++;
            }
            
            function scoreboard(){
                //display the scoreboard
                document.getElementById("score").innerHTML="Shots: "+shots+" Score: "+score;
            }
            
            window.onload=function(){
                el=document.getElementById("img1");
               
                //onclick handler calls scoreUp()
                //when img is clicked
                el.onclick = scoreUp;
                
                //Update total of number of shots
                //for every click within play field
                document.getElementById("range").onclick = function(){
                    shots++;
                    
                    //update scoreboard
                    scoreboard();
                }
                
                //Initialize game
                scoreboard();
                el.style.left = '50px'
                moveIt();
            };





