let randomImageNum;
let answer;

function loadImageGuesser() {
    display = document.querySelector('#timer');
    startTimer(20, display);
    getText('imageLinks.txt')
    .then(image => getImage(image));
    getText('imageText.txt')
    .then(displayCaption);
}

// read files
async function getText(file) {
    let fetchedFile = await fetch(file);
    let text = await fetchedFile.text();
    return text;
}

// displays image
function getImage(image) {
    let imageArr = image.split("\n"); // convert text string to array
    randomImageNum = Math.floor(Math.random() * imageArr.length);
    let randomImageLink = imageArr[randomImageNum];
    document.getElementById("image").src = randomImageLink;
}

// displays underlines for caption of images
function displayCaption(text) {
    let textArr = text.split("\n");
    let captionText = textArr[randomImageNum];
    captionText = captionText.replace(/[\r\n]+/gm, "");
    answer = captionText;
    let numLetters = captionText.length;
    for(let i=0; i<numLetters; i++){
        const input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', 1);
        input.setAttribute('placeholder', '_');
        input.setAttribute('id', 'image-text');
        const captionDiv = document.getElementById("image-text-container"); 
        captionDiv.appendChild(input); // add input field to caption div
    }
    moveInput();
}

// moves to next input field when an input is entered
function moveInput(){
    let captionDiv = document.getElementById("image-text-container"); 
    for(let field of captionDiv.children) {
        field.addEventListener('input', function(e) {
            //input is not backspace and there is another input field -> go to the next field
            if (e.inputType != "deleteContentBackward" && field.nextElementSibling) {
                field.nextElementSibling.focus();
            }
        });
        //allow the user to move left and right with arrow keys
        field.addEventListener( 'keydown', ( event ) => {
            if(event.key == "ArrowLeft" && field.previousElementSibling && (!field.value || field.selectionStart == 0)){
                field.previousElementSibling.focus();
            }
            if(event.key == "ArrowRight" && field.nextElementSibling && (!field.value || field.selectionEnd)){
                field.nextElementSibling.focus();
            }
            // allow backspace to act as a left arrow key if the input field is empty
            if(event.key == "Backspace" && field.previousElementSibling && !field.value){
                event.preventDefault();
                field.previousElementSibling.focus();
            }
            if(event.key == "Enter"){
                checkAnswer();
            }
        });
    }
}

// places a letter every set interval
function giveHint(){
    let captionDiv = document.getElementById("image-text-container");
    let randomNum = Math.floor(Math.random() * captionDiv.children.length);
    let field = captionDiv.children[randomNum];
    // if the spot is already taken, choose another one
    while(field.value){
        randomNum = Math.floor(Math.random() * captionDiv.children.length);
        field = captionDiv.children[randomNum];
    }
    field.value = answer[randomNum];
}

// check if input is correct after submitting and display end screen
function checkAnswer(){
    stopTimer();
    let captionDiv = document.getElementById("image-text-container");
    let i = 0; 
    let correct = true;
    for(let field of captionDiv.children) {
        if(answer[i] != field.value.toLowerCase()){
            correct = false;
        }
        i++;
    }

    if(correct){
        document.getElementById("game-result").textContent = "Correct!";
      }else{
        document.getElementById("game-result").textContent = "Incorrect!";
    }
    document.querySelector(".home-button").style.visibility = "visible"; // display home button
    // disable input fields
    for(let field of captionDiv.children) {
        field.readOnly = true;
    }
    // disable button
    if(!document.getElementById("submit-button").getAttribute("disabled"))
        document.getElementById("submit-button").disabled = true;
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

        if (timer%8 == 0){
            giveHint();
        }

        if (--timer < 0) {
            timer = 0;
            stopTimer();
            checkAnswer();
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(intervalID);
    intervalID = null;
}