let questionIndex;
let answer;
let answerChoices;

function loadTrivia(){
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

    }
    
    document.getElementById("choice1").textContent = choiceSplit[0];
    document.getElementById("choice2").textContent = choiceSplit[1];
    document.getElementById("choice3").textContent = choiceSplit[2];
    document.getElementById("choice4").textContent = choiceSplit[3];
}

function checkAnswer(){
    let radios = document.getElementsByTagName('input');
    let userAnswer = "";
    // loop through radios
    for(let i=0; i<radios.length; i++){
        if(radios[i].type === 'radio' && radios[i].checked){ // get radio that is checked
            userAnswer = answerChoices[i]; // get user answer
            break;
        }
    }

    // check if user answer is correct
    if(userAnswer === answer) {
        console.log("CORRECT");
    }else{
        console.log("user answer: " + userAnswer);
        console.log("answer: " + answer)
        console.log("INCORRECT");
    }

}