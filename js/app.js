// //restart game button
// const restrartButtton = document.querySelector('#rest-btn');



// //grabs all the squares
// const squares = document.querySelectorAll('.sqr')



// //clear all the squares
// function clearAll() {
//     squares.forEach((square)=>{
//         square.textContent = '';
//     })
// }

// restrartButtton.addEventListener('click', clearAll);
// //check the squares marker
// function changeChar() {
//     if (this.textContent === '') {
//         this.textContent = 'X';
//     } else if(this.textContent === 'X') {
//         this.textContent = 'O'
//     }else{
//         this.textContent = ''
//     }
// }

// squares.forEach((square)=> {
//     square.addEventListener('click', changeChar)
// })

// //loop to add event listeners to all the squares



//1) Define the required variables used to track the state of the game.

let board;
let turn;
let winner;
let tie;

//2) Store cached element references.

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#rest-btn');




//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

function init() {
        board = [
            '','','',
            '','','',
            '','',''
        ];
        turn = 'X';
        winner = false;
        tie = false;
        render();
}

init();

//4) The state of the game should be rendered to the user.

function render() {
    updateBoard();
    updateMessage();
    
}

function updateBoard() {
   for (let i = 0; i < board.length; i++) {    
    squareEls[i].textContent = board[i];
    squareEls[i].addEventListener('click',handleClick);
    squareEls[i].addEventListener("mouseover", channgeColor);
    
   }

    // squareEls.forEach((squ) => {
    //     squ.textContent = board[squ.id]
    // })

}
        

function updateMessage() {
    // console.log(winner, 'winner');
    // console.log(tie, 'tie');
    // console.log(turn, 'turn');
    
    if (winner === false && tie === false) {
        messageEl.textContent = `it's ${turn} turn`;
    }else if(winner === false && tie === true){
        messageEl.textContent = `Tie`;
    }else{
        messageEl.textContent = `${turn} Won...!`;
    }
}
//5) Define the required constants.

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

//6) Handle a player clicking a square with a `handleClick` function.

function handleClick(event) {
    squareIndex = event.target.id;
    placePiece(squareIndex);
    channgeColor(event);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
        
}

function channgeColor(square) {
    // console.log(square.target.classList);
    let mySquare = square;

    mySquare.target.classList.add('change-color');

    setTimeout(function(){
        mySquare.target.classList.remove('change-color');
    },1000);

}

function placePiece(index) {
    board[index] = turn;
    
}

function checkForWinner() {
    winningCombos.forEach(combo => {        
        if (board[combo[0]] != '' && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = true;
        }
    })
}

function checkForTie() {
    for(var i=0; i< board.length; i++) {
        // console.log(board[i]);
        
        if(board[i] === ''){
            tie = false;
        }else if(winner === true){
            return;
        }else{
            tie = true;
        }
    }
    // if (winner) {
    //     return;
    // }
}

function switchPlayerTurn() {
    if (winner === true) {
        return turn;
    }else if (turn === 'O'){
        turn ='X';
    }else{
        turn = 'O';
    }
    // console.log(board);
    // console.log(winner);
    // console.log(turn);
    
}

//7) Create Reset functionality.

resetBtnEl.addEventListener('click', init)
