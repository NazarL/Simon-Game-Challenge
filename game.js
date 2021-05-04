
let userClickedPattern = [];
let gamePattern = [];
const buttonColours =["red", "blue", "green", "yellow"];

let started = false;
let level = 0;

//starts game on first press of any keyboard key 
$(document).keypress(() => {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

//resets variables, starts new game 
function startOver() {
    started = false;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}

//checks if game pattern is equal to user answer
function checkAnswer(currentLevel) {
    var gamePatternLastIndex = gamePattern.length - 1; 

    if(currentLevel === gamePattern[gamePatternLastIndex]) {
        console.log("sucess");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 800);

        $("#level-title").text("Game Over, Press Any Key To Restart!");

        startOver();
    }

};

//generates random number, matches it with color, animates chosen button, calls play sound function
function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};

//identifies color id on button click, adds id into array, calls: play sound and animation
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(userClickedPattern[lastIndex]);

});

//plays sound function
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

};

//button click animation function
function animatePress(currentColour) {
   var buttonId = $("#" + currentColour);
   buttonId.addClass("pressed");
   setTimeout(() => { buttonId.removeClass("pressed") }, 300);

};