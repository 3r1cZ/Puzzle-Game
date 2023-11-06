let listPuzzles = ["Puzzles/WordSort/wordSort.html", "Puzzles/ImageGuesser/imageGuesser.html", "Puzzles/MazeSolver/mazeSolver.html", "Puzzles/Trivia/trivia.html", "Puzzles/ButtonMasher/buttonMasher.html", "Puzzles/ButtonChaser/buttonChaser.html"];

function startGame() {
    loadRandomPuzzle();
}

function loadRandomPuzzle(){
    let i = Math.floor(Math.random() * listPuzzles.length);
    window.location.href = listPuzzles[i];
}