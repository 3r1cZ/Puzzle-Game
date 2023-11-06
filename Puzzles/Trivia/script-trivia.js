let questionIndex;
let answer;
let answerIndex;
let answerChoices;

function loadTrivia(){
    display = document.querySelector('#timer');
    startTimer(20, display);
    getText('quizQuestions.txt')
    .then(displayQuestion);
    // delay displaying answers so that questionIndex gets initialized by displayQuestion()
    setTimeout(function() {
        getText('quizChoices.txt')
        .then(displayChoices);
      }, 50);
}

// read files
async function getText(file) {
    let fetchedFile = await fetch(file);
    let text = await fetchedFile.text();
    return text;
}

function displayQuestion(questions) {
    let questionArr = questions.split("\n");
    questionIndex = Math.floor(Math.random() * questionArr.length);
    let question = questionArr[questionIndex];
    document.getElementById("question").textContent = question;
}

function displayChoices(choices) {
    let choicesArr = choices.split("\n"); // list of all answers
    let choice = choicesArr[questionIndex]; // choices matching question
    let choiceSplit = choice.split("/"); // splitting choices into four
    answerChoices = choiceSplit;
    answer = choiceSplit[0];
    let i = choiceSplit.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = choiceSplit[i];
        choiceSplit[i] = choiceSplit[j];
        choiceSplit[j] = temp;
        if(choiceSplit[i] == answer){
            answerIndex = i;
        }

    }
    
    document.getElementById("choice1").textContent = choiceSplit[0];
    document.getElementById("choice2").textContent = choiceSplit[1];
    document.getElementById("choice3").textContent = choiceSplit[2];
    document.getElementById("choice4").textContent = choiceSplit[3];
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
          checkAnswer();
      }
  }, 1000);
}

function stopTimer(){
  clearInterval(intervalID);
  intervalID = null;
}

function checkAnswer(){
    let radios = document.getElementsByTagName('input');
    let userAnswer = "";
    let userAnswerIndex;
    stopTimer();
    // loop through radios
    for(let i=0; i<radios.length; i++){
        if(radios[i].type === 'radio' && radios[i].checked){ // get radio that is checked
            userAnswer = answerChoices[i]; // get user answer
            userAnswerIndex = i;
            break;
        }
    }

    // check if user answer is correct
    if(userAnswer === answer) {
        console.log("user answer: " + userAnswer);
        console.log("answer: " + answer)
        console.log("CORRECT");
        console.log("Answer: " + answerIndex);
        console.log("User: " + userAnswerIndex);
        displayAnswer(true, userAnswerIndex);
    }else{
        console.log("user answer: " + userAnswer);
        console.log("answer: " + answer)
        console.log("INCORRECT");
        console.log("Answer: " + answerIndex);
        console.log("User: " + userAnswerIndex);
        displayAnswer(false, userAnswerIndex);
    }
}

function displayAnswer(correct, userAnswerIndex) {
    let display = document.getElementById("answerDisplay");
    if(correct){
        display.textContent = "CORRECT";
        if(userAnswerIndex != undefined){
            document.getElementById("choice" + (userAnswerIndex+1)).style.color = "green";
        }
    }else{
        display.textContent = "INCORRECT";
        if(userAnswerIndex != undefined){
            document.getElementById("choice" + (userAnswerIndex+1)).style.color = "red";
            document.getElementById("choice" + (answerIndex + 1)).style.color = "green";
        }
    }
    if(userAnswerIndex == undefined){
        for(let i=1; i<5; i++){
            document.getElementById("choice" + i).style.color = "red";
            document.getElementById("choice" + (answerIndex + 1)).style.color = "green";
        }
    }
    document.querySelector(".home-button").style.visibility = "visible";
}