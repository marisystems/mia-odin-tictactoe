// So, my objective here is to be able to make a fully
// Functional tic-tac-toe game first in the console
// And only after that worry about html&css

// 1. brainstorm all the elements a tic tac toe game has
// a) a gameboard as an array of 9 cells
// b) A mark "O" or "X"
// c) A way of keep track of those marks
// d) Randomly or make user be able to choose if they are "O" or "X"

// Lets map "O" to 1 and "X" to 2 and empty to 0

// Make an IIFE for GameBoard since we'll only declare it once
const GameBoard = ( () => {

    // Create 2d array
    const rows = 3
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = []

        // Cell() in this case makes it easy to
        //update the whole array
        for (let j = 0; j < columns; j++) {
            board[i].push(0)
        }
    }
    
    // Function that returns the gameBoard status
    const getBoard = () => board

    return {getBoard};


} ) ()

const GameController = ( () => {
    // This will return functions to change the state of the game
    // depending on the player and their check type
        

})()

const Player = (name, checkType) => {
    let score;

    const getName = () => {return name};
    const getCheck = () => {return checkType};
    const setCheck = (check) =>{checkType = check};

    return {getName, getCheck, setCheck}
}
