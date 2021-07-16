var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Start of the game, press any key and it will show Level 1, key not working after it
$(document).keypress(function(){
  if(!started){
    $(".gameovermessage").css("visibility", "hidden");
    $("#level-title").text("Level "+level);
    $("h2").css("visibility","hidden");
    nextSequence();
    started = true;
  }
});
// Detect click and add it to an array + play sound
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); //passing the index of the sequence. If I add 2 sequence, it will give 1 as an input
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){ //if the content of the targeted array is similar
      if (userClickedPattern.length===gamePattern.length) { //when I finish my sequence and it is all correct, it will add a new one
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else {
     //can't add any other sequences, play the sound+ animate the screen +Game over message
      var wrong = new Audio("sounds/wrong.mp3")
      wrong.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("#level-title").text("GAME OVER !");
      $(".lost").text("You lost at Lvl "+level);
      $(".gameovermessage").css("visibility", "visible");
      startOver();
    }
  }


function nextSequence(){
  userClickedPattern = []; //reset the user's sequence
  //update the h1
  level++;
  $("#level-title").text("Level "+level);
  //generate random number from 0 to 3
  var randomNumber = Math.floor(Math.random()*4);
  //Assign a random color from the array to the variable
  var randomChosenColour = buttonColours[randomNumber];
  // Add that random color to the Game Pattern
  gamePattern.push(randomChosenColour);
  // Flash Animation, randomChosenColour is the string value !!
  currentSequence();
  }

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//when the user clicks, animates with the class Pressed
function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern=[];
  started= false;
}

function currentSequence(){

  for (var i = 0; i <= gamePattern.length; i++) {
      if (gamePattern.length<=5) {
        beginner(i);
      }else if(gamePattern.length>5 && gamePattern.length<10){
        intermediate(i);
      }else{
        advanced(i);
      }
  }
}
function beginner(i){
  setTimeout(function(){
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  },600*i);
}
function intermediate(i){
  setTimeout(function(){
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  },400*i);
}
function advanced(i){
  setTimeout(function(){
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  },300*i);
}
