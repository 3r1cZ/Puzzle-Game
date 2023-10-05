let questionIndex;

function loadTrivia(){
    getText('quizQuestions.txt')
    .then(displayQuestion);
    getText('quizChoices.txt')
    .then(displayChoices);
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
    let choicesArr = choices.split("\n");
    let choice = choicesArr[questionIndex];
    
}