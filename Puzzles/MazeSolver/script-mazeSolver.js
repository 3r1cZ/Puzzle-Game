function loadMazeSolver(){
    drawWalls();
}

function drawWalls(){
    const maze = document.getElementById("maze");
    let walls = [];
    for(let i=0; i<20; i++){
        const square = document.createElement("div");
        square.setAttribute('class', 'wall');
        maze.appendChild(square);
        walls.push(square);
    }
}