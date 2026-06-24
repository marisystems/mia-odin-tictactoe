// So, my objective here is to be able to make a fully
// Functional tic-tac-toe game first in the console
// And only after that worry about html&css

// 1. brainstorm all the elements a tic tac toe game has
// a) a gameboard as an array of 9 cells
// b) A mark "O" or "X"
// c) A way of keep track of those marks
// d) Randomly or make user be able to choose if they are "O" or "X"

// Lets map "O" to 1 and "X" to 2 and empty to 0

function create2DArray(rows, cols, fill) {
    // Helper function to create the gameboard
    const myArray = [];
    for (let i = 0; i < rows; i++) {
        myArray[i] = [];

        for (let j = 0; j < cols; j++) {
            myArray[i][j] = fill;
        }
    }
    return myArray
}

// Make an IIFE for GameBoard since we'll only declare it once
const GameBoard = ( () => {

    let board = create2DArray(3, 3, "");
    
    // Function that returns the gameBoard status
    const getBoard = () => board

    // const changeBoard = ([i, j], value, owner) => {
    //     board[i][j] = {value: value, owner: owner};
    // }

    return {getBoard};
} ) ()


const GameController = ( () => {
    // This will return functions to change the state of the game
    // depending on the player and their check type

    function changeBoard([i, j], value, board){
        if (board[i][j] != '') {
            throw "Cell already filled or out of bounds";
        } else {
            board[i][j] = value;
        }
    }

    function playRound([i,j], player, board) {
        try { 
            changeBoard([i,j], player.getCheck(), board);
            console.log(`${player.getName()} has played at ${[i,j]} with ${player.getCheck()}`)
            console.table(board);
        } catch (e) {
            console.log(e)
        }
    }

    return {changeBoard, playRound};
})()

const Player = (name, checkType) => {
    let score = 0;

    // Map the checks to either Cross or Circle
    if (checkType.toLowerCase() === "cross") {
        checkType = "X";
    } else if (checkType.toLowerCase() === "circle") {
        checkType = "O";
    } else {
        throw new Error("Unknown Check mark")
    }

    const getName = () => name;
    const getCheck = () => checkType;
    const getInfo = () => {
        console.log(`Player: ${name} | Check: ${checkType} | Score: ${score}`);
    }
    const getScore = () => score;
    const incrementScore = () => score++;

    return {getName, getCheck, getInfo, getScore, incrementScore};
}

let player1 = Player("Mari", "Cross");
let player2 = Player("John", "Circle")

GameController.playRound([0,0], player2, GameBoard.getBoard())
