console.log("inside js");

// Zombie Timer
var timer1 = null;


var score = 0; //number of 'hits'
var shots = 0; //total 'shots'
var accuracy = 0; // Accuracy of shots to zombie hits
//var zHits = 10; // amount of zombie hits
//var highscores= shots; //where we will be saving our highestScore

var player1 = null;
var player2 = null;
var player1Name = "";
var player2Name = "";
var yourPlayerName = "";
var zombieImage = document.getElementById('img1')
var iAM;

var zombieInterval;
 
function MoveZombie() {
  zombieInterval = setInterval(moveIt, 25)
}

function moveIt() {
  if (parseInt(zombieImage.style.left) > (screen.width - 50)) {
    zombieImage.style.left = 0;
  } else {
    zombieImage.style.left = parseInt(zombieImage.style.left) + 6 + 'px';
    zombieImage.style.top = 20 + (80 * Math.sin(parseInt(zombieImage.style.left) / 50)) + 'px';
  } 
}

function stopZombieMove() {
  clearInterval(zombieInterval)
}

function ZombieGame() {
  MoveZombie()

  this.zombieImage = document.getElementById('img1')
  var el = document.getElementById("img1");

  
  this.zombieImage.addEventListener('click', this.MoveZombie)

  //Update total of number of shots
  //for every click within play field accuracy is adjusted

  $("#range").on("click", function () {
    shots++;
    accuracy = Math.ceil(score / shots * 100);
    //highscores++;
    //update firebase scoreboard
    var newscore = {"shots": shots,
                "accuracy": accuracy
                };
    console.log("rangeclicked");
    console.log(newscore);
  
    
    //var iAM = "player1"; // or "player2"
    db.ref("/players/" + iAM).set(newscore);


  });

    el.style.left = '50px'
}

ZombieGame.prototype.MoveZombie = function(event) {
  scoreUp()
  //animate the image
  if (parseInt(this.style.left) > (screen.width - 50)) {
    this.style.left = 0;
  } else {
    this.style.left = parseInt(this.style.left) + 6 + 'px';
    this.style.top = 20 + (80 * Math.sin(parseInt(this.style.left) / 50)) + 'px';
  }

  //set the timer1
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6xUfqVvTS2xDylNNzQwKGGiH62s9xR_Q",
  authDomain: "zombie-game-246c3.firebaseapp.com",
  databaseURL: "https://zombie-game-246c3.firebaseio.com",
  projectId: "zombie-game-246c3",
  storageBucket: "zombie-game-246c3.appspot.com",
  messagingSenderId: "1074907213300"
};
firebase.initializeApp(config);

//firebase
var db = firebase.database()

function scoreUp() {
  //increment the player's score
  score++;
  //increment the amount of zombie hits
  //zHits++;
}

function scoreboard() {
  //display the scoreboard
  // db.ref().child("/outcome/").set(player1.shots);
  $("#player1Stats").html("<h3>Shots: " + shots + " Score: " + score + " </h3>" + "<h3>Accuracy: " + accuracy + "% Highscore: " + highscores + "</h3>");


  // db.ref().child("/outcome/").set(player2.shots);
  $("#player2Stats").html("<h3>Shots: " + shots + " Score: " + score + " </h3>" + "<h3>Accuracy: " + accuracy + "% Highscore: " + highscores + "</h3>");
}


//---------------------------DB Listeners-----------------------------

//DB Listener to listen for changes
//player one listener
db.ref("/players/").on("value", function(snapshot) {
  // Check the database for player1
  if (snapshot.child("player1").exists()) {
    console.log("Player 1 exists");

    // Player1 data FB
    player1 = snapshot.val().player1;
    player1Name = player1.name;

    //Player1 Display
    $("#playerOneName").text(player1Name);
    
    $("#player1Stats").html("Shots: " + player1.shots + ", Accuracy: " + player1.accuracy );
  } else {
    //console.log("Player 1 is not here");
    
    player1 = null;
    player1Name = "";

    // Update player1 display
    $("#playerOneName").text("Waiting for Player 1");
    $("#playerPanel1").removeClass("playerPanelTurn");
    $("#playerPanel2").removeClass("playerPanelTurn");
    
    //DB outcome
    db.ref("/outcome").remove();
    //html outcome
    $("#roundOutcome").html("Zombie-Game");
    $("#waitingNotice").html("");
    $("#player1Stats").html("Shots: 0, Accuracy: 0%");
  }

// ------------------player 2 listener--------------------------------

  // Check the database for player2
  if (snapshot.child("player2").exists()) {
    console.log("Player 2 exists");

    // Player2 data FB
    player2 = snapshot.val().player2;
    player2Name = player2.name;

    // Update player2 display
    $("#playerTwoName").text(player2Name);
    ////NOTE: add Kenneths game scoreboard logic at the bottom to reflect the updated score
    $("#player2Stats").html("Shots: " + player2.shots + ", Accuracy: " + player2.accuracy);
  } else {
   // console.log("Player 2 is not available");
    
    player2 = null;
    player2Name = "";

    // Update player2 display
    $("#playerTwoName").text("Waiting for Player 2");
    $("#playerPanel1").removeClass("playerPanelTurn");
    $("#playerPanel2").removeClass("playerPanelTurn");
    
    //DB outcome
    db.ref("/outcome/").remove();
    //html outcome
    $("#roundOutcome").html("Zombie-Game");
    $("#waitingNotice").html("");
    $("#player2Stats").html("Shots: 0, Accuracy: 0%");
  }

 
  // If both players leave the game, empty the chat session
  if (!player1 && !player2) {
    db.ref("/chat/").remove();
    db.ref("/outcome/").remove();
    //empty the html chat session
    $("#chatDisplay").empty();
    $("#playerPanel1").removeClass("playerPanelTurn");
    $("#playerPanel2").removeClass("playerPanelTurn");
    $("#roundOutcome").html("Zombie-Game");
    $("#waitingNotice").html("");
  }
  
});



//------------End of Listening for Changes----------------------------






//------------------Beginning of DB listener for players leaving------
// DB Listener for players leaving
db.ref("/players/").on("child_removed", function(snapshot) {
  var msg = snapshot.val().name + " has left the game!";

  // Get a key for the disconnection chat entry
  var chatKey = db.ref().child("/chat/").push().key;

  // Save the disconnection chat entry
  db.ref("/chat/" + chatKey).set(msg);
});

// Attach a listener to the database /chat/ node to listen for any new chat messages
db.ref("/chat/").on("child_added", function(snapshot) {
  var chatMsg = snapshot.val();
  var chatEntry = $("<div>").html(chatMsg);



  //update the html chat box with scroll bar
  $("#chatDisplay").append(chatEntry);
  $("#chatDisplay").scrollTop($("#chatDisplay")[0].scrollHeight);
});

//----------------------End of listener-------------------------------







// DB Listener for the game outcome
db.ref("/outcome/").on("value", function(snapshot) {
  $("#roundOutcome").html(snapshot.val());
});








//-----------------------Beginning of event handler-----------------

 //Event Handler for the new user (submit button)
$("#add-name").on("click", function(event) {
  event.preventDefault();

  // First, make sure that the name field is non-empty and we are still waiting for a player
  if ( ($("#name-input").val().trim() !== "") && !(player1 && player2) ) {
    // Adding player1
    if (player1 === null) {
      //console.log("adding player 1");
      
      yourPlayerName = $("#name-input").val().trim();
      iAM = "player1";
      //DB game score update
      player1 = {
        name: yourPlayerName,
        shots: 0,
        accuracy: 0
      };

      // Add player1 to the DB
      db.ref().child("/players/player1").set(player1);


      // Set the turn value to 1 in DB
      db.ref().child("/turn").set(1);

      // Remove the user from the database once disconnected
      db.ref("/players/player1").onDisconnect().remove();
    } else if( (player1 !== null) && (player2 === null) ) {
      // Adding player2
      //console.log("adding player 2");

      iAM = "player2";
      yourPlayerName = $("#name-input").val().trim();
      //DB game score update
      player2 = {
        name: yourPlayerName,
        shots: 0,
        accuracy: 0
      };

      // Add player2 to the DB
      db.ref().child("/players/player2").set(player2);

      // Remove the user from the database once disconnected
      db.ref("/players/player2").onDisconnect().remove();
    }

    // Add a user joining message to the chat
    var msg = yourPlayerName + " has joined the game!";
    //console.log(msg);

    // Get a key for the join chat entry
    var chatKey = db.ref().child("/chat/").push().key;

    // DB Join chat entry
    db.ref("/chat/" + chatKey).set(msg);

    // Reset the name input box
    $("#name-input").val(""); 
  }
});



//------------------------end of event handler----------------------






//Chat send Button
$("#chat-send").on("click", function(event) {
  event.preventDefault();

  //If player exists and the message box is not empty
  if ( (yourPlayerName !== "") && ($("#chat-input").val().trim() !== "") ) {
    //Reset the input box by grabbing the message
    var msg = yourPlayerName + ": " + $("#chat-input").val().trim();
    $("#chat-input").val("");

    // Key for the new chat entry
    var chatKey = db.ref().child("/chat/").push().key;

    // New chat entry
    db.ref("/chat/" + chatKey).set(msg);
  }
});


document.addEventListener('DOMContentLoaded', function(event) {
  new ZombieGame()
});






