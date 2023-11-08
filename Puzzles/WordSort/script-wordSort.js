// calling functions to load the Word Sort puzzle
function loadWordSort(){
    display = document.querySelector('#timer');
    startTimer(20, display);
    getText('words.txt')
    .then(text => addWords(text));
}
  
// read files
async function getText(file) {
  let fetchedFile = await fetch(file);
  let text = await fetchedFile.text();
  return text;
}

let wordOutput = []; //5 words to be displayed
// add text to screen
function addWords(text){
  let textArr = text.split("\n"); // convert text string to array
  // choose 5 words from the text array to display
  for(let i=0; i<5; i++){
    let randomChoice = Math.floor(Math.random() * textArr.length);
    // ensures that no words repeat
    while(wordOutput.includes(textArr[randomChoice])){
      randomChoice = Math.floor(Math.random() * textArr.length);
    }
    wordOutput.push(textArr[randomChoice]);
  }
  for(let i=0; i<5; i++){
    document.getElementById("text" + (i+1)).textContent = wordOutput[i];
    dragElement(document.getElementById("textMove" + (i+1)));
  }
}

// check for overlapping 
function isOverlapping(div1, div2){
  const div1Rect = div1.getBoundingClientRect(); // element being dragged
  if(div2 == document.getElementById("input1")){
    return (div1Rect.x >=50 && div1Rect.x <=400 && div1Rect.y >=-68 && div1Rect.y <=0);
  }
  else if(div2 == document.getElementById("input2")){
    return (div1Rect.x >=50 && div1Rect.x <=400 && div1Rect.y >0 && div1Rect.y <=121);
  }
  else if(div2 == document.getElementById("input3")){
    return (div1Rect.x >=50 && div1Rect.x <=400 && div1Rect.y >121 && div1Rect.y <=253);
  }
  else if(div2 == document.getElementById("input4")){
    return (div1Rect.x >=50 && div1Rect.x <=400 && div1Rect.y >253 && div1Rect.y <=373);
  }
  else if(div2 == document.getElementById("input5")){
    return (div1Rect.x >=50 && div1Rect.x <=400 && div1Rect.y >373 && div1Rect.y <=525);
  }
}

// checks if a word is in an input spot

function isInASpot(elmnt){
  let rectElem = elmnt.getBoundingClientRect();
  if(rectElem.x == 102 && rectElem.y == -18){
    return 1;
  }
  else if(rectElem.x == 102 && rectElem.y == 106){
    return 2;
  }
  else if(rectElem.x == 102 && rectElem.y == 232){
    return 3;
  }
  else if(rectElem.x == 102 && rectElem.y == 356){
    return 4;
  }
  else if(rectElem.x == 102 && rectElem.y == 482){
    return 5;
  }
  else{
    return null;
  }
}

// https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown; // begin drag of element

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  // updating during drag
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  // stop moving when mouse button is released:
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    // putting the elements into the input spots
    if(isOverlapping(elmnt, document.getElementById("input1"))){
      elmnt.style.left = "102px";
      elmnt.style.top = "-18px";
    }
    else if(isOverlapping(elmnt, document.getElementById("input2"))){
      elmnt.style.left = "102px";
      elmnt.style.top = "106px";
    }
    else if(isOverlapping(elmnt, document.getElementById("input3"))){
      elmnt.style.left = "102px";
      elmnt.style.top = "232px";
    }
    else if(isOverlapping(elmnt, document.getElementById("input4"))){
      elmnt.style.left = "102px";
      elmnt.style.top = "356px";
    }
    else if(isOverlapping(elmnt, document.getElementById("input5"))){
      elmnt.style.left = "102px";
      elmnt.style.top = "482px";
    }

    // if all words are on the input spots
    let spot1 = isInASpot(document.getElementById("textMove1"));
    let spot2 = isInASpot(document.getElementById("textMove2"));
    let spot3 = isInASpot(document.getElementById("textMove3"));
    let spot4 = isInASpot(document.getElementById("textMove4"));
    let spot5 = isInASpot(document.getElementById("textMove5"));
    let word1 = document.getElementById("text1").textContent;
    let word2 = document.getElementById("text2").textContent;
    let word3 = document.getElementById("text3").textContent;
    let word4 = document.getElementById("text4").textContent;
    let word5 = document.getElementById("text5").textContent;
    let spots = [spot1, spot2, spot3, spot4, spot5]; // location of words
    let words = [word1, word2, word3, word4, word5]; // words that correspond with spots

    if(spot1 != null && spot2 != null && spot3 != null && spot4 != null && spot5 != null){
      stopTimer();
      checkAlphabetical(spots, words);
    } 

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
          endGameDisplay(false);
      }
  }, 1000);
}

function stopTimer(){
  clearInterval(intervalID);
  intervalID = null;
}

// checks if the spots are sorted in alphabetical order
function checkAlphabetical(spots, words){
  wordsSorted = wordOutput.sort();
  // bubble sort
  let i, j, temp, tempW;
  let swapped;
  for (i = 0; i < spots.length - 1; i++){
      swapped = false;
      for (j = 0; j < spots.length - 1; j++){
          if (spots[j] > spots[j + 1]){
              // Swap spots and words
              temp = spots[j];
              spots[j] = spots[j + 1];
              spots[j + 1] = temp;
              tempW = words[j];
              words[j] = words[j + 1];
              words[j + 1] = tempW;
              swapped = true;
          }
      }
      if (swapped == false){
        break;
      }
  }
  let correct = true;
  // checks if words are alphabetical
  for(let i=0; i<5;i++){
    if(wordsSorted[i]!=words[i]){
      correct = false;
    }
  }
  endGameDisplay(correct);
}

function endGameDisplay(correct){
  if(correct){
    document.getElementById("game-result").textContent = "Correct!";
  }else{
    document.getElementById("game-result").textContent = "Incorrect!";
  }
  unDragElements();
  // hides an element if they are not in a spot
  for(let i=0; i<5; i++){
    if(!isInASpot(document.getElementById("textMove" + (i+1)))){
      document.getElementById("textMove" + (i+1)).style.visibility = "hidden";
    }
  }
  if(document.referrer == "http://localhost:8000/minigameScreen.html"){
        document.querySelector(".home-button").style.visibility = "visible";
    }
    else{
        setTimeout(loadRandomPuzzle, 1000);
    }
}

function unDragElements(){
  for(let i=0; i<5; i++){
    document.getElementById("textMove" + (i+1)).style.pointerEvents = "none";
  }
}