

// expanding canvas to fit window
function draw(){
  document.getElementById("gameCanvas").width  = window.innerWidth;
  document.getElementById("gameCanvas").height = window.innerHeight;
}

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
  textArr = text.split("\n");
  let c = document.getElementById("gameCanvas");
  let ctx = c.getContext("2d");
  let randX = Math.floor(Math.random() * document.getElementById("gameCanvas").width)
  let randY = Math.floor(Math.random() * document.getElementById("gameCanvas").height)
  ctx.font = "100px serif";
  for(let i=0; i<textArr.length; i++){
    ctx.fillText(textArr[i],randX,randY);
    randX = Math.floor(Math.random() * document.getElementById("gameCanvas").width)
    randY = Math.floor(Math.random() * document.getElementById("gameCanvas").height)
  }
}


// https://www.w3schools.com/howto/howto_js_draggable.asp

// drag elements when clicked on
function dragElement(id){
  dragElement(document.getElementById(id))
}

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

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