const cells = document.querySelectorAll(".cell");//cell class
const statusText = document.querySelector("#statusText");//status text
const restartBtn = document.querySelector("#restartBtn");//restart button
const winConditions = [//win conditions 
    [0, 1, 2],//top row
    [3, 4, 5],//middle row
    [6, 7, 8],//bottom row
    [0, 3, 6],//first column
    [1, 4, 7],//second column
    [2, 5, 8],//third column
    [0, 4, 8],//diagonal from 0 to 8
    [2, 4, 6]//diagonal from 2 to 6
];

let options = ["", "", "", "", "", "", "", "", ""];//array of empty strings, one for each cell. 
let currentPlayer = "X";//helps keep track of current player
let running = true;//keeps track of game running. booling variable

initializeGame();//starts game

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));//arrow function
    restartBtn.addEventListener("click", restartGame);//when we click, we will invoke restart function 
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");//whatever cell we click on 

    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);//
    checkWinner();
}
function updateCell(cell, index){//two parameters. 
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];


        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;//temperate literal
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
