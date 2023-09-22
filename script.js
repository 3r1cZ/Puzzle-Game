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

// add text to screen
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
  }
}

// check for overlapping 
function isOverlapping(div1, div2){
  const div1Rect = div1.getBoundingClientRect();
  const div2Rect = div2.getBoundingClientRect();
  console.log(div1Rect);
  console.log(div2Rect);
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

// https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
  console.log(elmnt);
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
  }
}