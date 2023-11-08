let clicks = 0;
function loadButtonChaser(){
    display = document.querySelector('#timer');
    startTimer(20, display);
    displayButton();
}

function displayButton() {
    let button = document.getElementById("buttonChased");
    let body = document.body;
    //random position for the button
    let randLeft = Math.floor(Math.random() * 94);
    let randBottom = Math.floor(Math.random() * 95);
    let colors = ['aqua', 'lightblue', 'red', 'yellow', 'green', 'orange', 'aquamarine', 'brown', 'beige', 'chartreuse', 'darkgray', 'pink'];
    let randColor = Math.floor(Math.random() * colors.length); //random button color
    button.style.position = 'absolute';
    button.style.left = randLeft + '%';
    button.style.bottom = randBottom + '%';
    button.style.backgroundColor = colors[randColor];
    randColor = Math.floor(Math.random() * colors.length); // random background color
    body.style.backgroundColor = colors[randColor];
}

function clicked() {
    //NOTE: implement points increase
    clicks++;
    document.getElementById("clickCount").textContent = 'Clicks: ' + clicks;
    //display new button
    displayButton();
}

function endGameDisplay() {
    document.getElementById("buttonChased").style.visibility = "hidden";
    document.body.style.backgroundColor = 'white';
    if(document.referrer == "http://localhost:8000/minigameScreen.html"){
        document.querySelector(".home-button").style.visibility = "visible";
    }
    else{
        setTimeout(loadRandomPuzzle, 1000);
    }
}

let intervalID; // stores interval function
// timer countdown
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  intervalID = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = 0;
          stopTimer();
          endGameDisplay();
      }
  }, 1000);
}

function stopTimer(){
  clearInterval(intervalID);
  intervalID = null;
}