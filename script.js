let listPuzzlesFromHome = ["Puzzles/WordSort/wordSort.html", "Puzzles/ImageGuesser/imageGuesser.html", "Puzzles/MazeSolver/mazeSolver.html", "Puzzles/Trivia/trivia.html", "Puzzles/ButtonMasher/buttonMasher.html", "Puzzles/ButtonChaser/buttonChaser.html"];
let listPuzzlesFromPuzzle = ["../WordSort/wordSort.html", "../ImageGuesser/imageGuesser.html", "../MazeSolver/mazeSolver.html", "../Trivia/trivia.html", "../ButtonMasher/buttonMasher.html", "../ButtonChaser/buttonChaser.html"]

function startGame() {
    let i = Math.floor(Math.random() * listPuzzlesFromHome.length);
    window.location.href = listPuzzlesFromHome[i];
}

function loadRandomPuzzle(){
    let i = Math.floor(Math.random() * listPuzzlesFromPuzzle.length);
    window.location.href = listPuzzlesFromPuzzle[i];
}