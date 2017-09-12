console.log("inside js");

// Youtube search Engine
 function keyWordsearch(){
    gapi.client.setApiKey('AIzaSyAC-jFqM93pgIsttltTzcNuoiKBI_49U5U');
    gapi.client.load('youtube', 'v3', function(){
            makeRequest();
    });
}
function makeRequest(){
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet', 
            maxResults: 1
    });
    request.execute(function(response)  {                                                                                    
            $('#results').empty()
            var srchItems = response.result.items;                      
            $.each(srchItems, function(index, item){
            vidTitle = item.snippet.title;  
            vidThumburl =  item.snippet.thumbnails.default.url;                 
            vidThumbimg = '<pre><img id="thumb" src="'+vidThumburl+'" alt="No  Image  Available." style="width:204px;height:128px"></pre>';                   

            $('#results').append('<pre>' + vidTitle + vidThumbimg +   '</pre>');                      
    })  
  })  
};



// Zombie Timer
var timer1 = null;

var el=null;
var score= 0; //number of 'hits'
var shots = 0; //total 'shots'
            
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







