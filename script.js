
// calling functions to load the Word Sort puzzle
function loadWordSort(){
  getText('words.txt')
  .then(text => addWords(text));
}

// read files
async function getText(file) {
  let fetchedFile = await fetch(file);
  let text = await fetchedFile.text();
  return text;
}

// https://www.w3schools.com/html/html5_canvas.asp - link for canvas operations

// draw words onto canvas
function addWords(text){
  let textArr = text.split("\n"); // convert text string to array
  let wordOutput = []; 
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
    document.getElementById("text" + (i+1)).innerText = wordOutput[i];
    dragElement(document.getElementById("textMove" + (i+1)));
    console.log(wordOutput[i]);
  }
}


// https://www.w3schools.com/howto/howto_js_draggable.asp

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown; // drag element

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

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}