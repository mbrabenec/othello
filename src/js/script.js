// Globals

let activePlayer = "black";
let otherPlayer = "white";
let board = [];         // JS array of game state

const boardDiv = document.getElementById("board");
const messages = document.getElementById("messages")

// Initialize board, starting positions + set event listeners

const initialize = () => {
board = Array(8).fill(".").map(e=> Array(8).fill("."));

    for (let i = 0; i < board.length; i++) {
        let row = board[i];
        for (let j = 0; j < row.length; j++) {
            let column = row[j];

            var newSq = document.createElement("div");
            newSq.classList.add("square");
            newSq.id = `${i}${j}`;
            newSq.innerText = ".";
            newSq.addEventListener("click", clickSq)
            boardDiv.appendChild(newSq);
        }
    }

    board[3][3] = board[4][4] = "white";
    board[3][4] = board[4][3] = "black";
    document.getElementById("33").innerText = "white"
    document.getElementById("44").innerText = "white"
    document.getElementById("34").innerText = "black"
    document.getElementById("43").innerText = "black"

    showMessage("black to move")
    updateBoard();
}

// helper functions

const showMessage = (message) => {
    messages.innerText = message;
}

const changePlayer = () => {
    if (activePlayer === "black") {
        activePlayer = "white";
        otherPlayer = "black";
    } else {
        activePlayer = "black";
        otherPlayer = "white";
    }
    showMessage(activePlayer + " to move");
}

const updateBoard = () => {

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let sq = document.getElementById(`${i}${j}`)
            sq.innerText = board[i][j];
            if (sq.innerText === "white") {
                sq.style.background = "white";
            }
            if (sq.innerText === "black") {
                sq.style.background = "black";
            }
        }
    }
    console.log(board);
}

///////////////////////////////////////////////////////
// Event handler. If valid square selection, process 'flips'

const clickSq = (e) => {

    let target = e.target.id
    let changeFlag = false;
    let row = Number(target.charAt(0));
    let col = Number(target.charAt(1));

    console.log("target: "+ row +" "+col);

    //check if square not already taken

    if (board[row][col] !==".") {
        console.log("taken");
        return;
    }

    // test for validity in 8 directions. If valid flips, push to flipped[]
    //alse set flag that flips found

    let flipped = [];


    // down:

    arr_ids = [];
    arr_col = [];
   
    for (let i = row+1; i < 8; i++){

        if(i < 8 && i >= 0) {
        
            let nextSq = board[i][col];
            
            if(nextSq === otherPlayer) {
                arr_col.push(nextSq);
                arr_ids.push([i,col]);
            }
            if(nextSq === activePlayer) {
                arr_col.push(nextSq);
                break;
            }
            if(nextSq === "." || nextSq === undefined ) {
                break;
            }
        } else break;
    }

    if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
        arr_ids.forEach(element => {
            flipped.push(element);
        });
        changeFlag = true;
    }
    
    // up:

    arr_ids = [];
    arr_col = [];

    for (let i = row-1; i >= 0; i--){

        if(i < 8 && i >= 0) {
           
            let nextSq = board[i][col];
            
            if(nextSq === otherPlayer) {
                arr_col.push(nextSq);
                arr_ids.push([i,col]);
            }
            if(nextSq === activePlayer) {
                arr_col.push(nextSq);
                break;
            }
            if(nextSq === "." || nextSq === undefined ) {
                break;
            }
        } else break;
   }

    if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
        arr_ids.forEach(element => {
            flipped.push(element);
        });
        changeFlag = true;
    }
    
    // right:

    arr_ids = [];
    arr_col = [];

    for (let i = col+1; i < 8; i++){

        if(i < 8 && i >= 0) {
           
            let nextSq = board[row][i];
            
            if(nextSq === otherPlayer) {
                arr_col.push(nextSq);
                arr_ids.push([row,i]);
            }
            if(nextSq === activePlayer) {
                arr_col.push(nextSq);
                break;
            }
            if(nextSq === "." || nextSq === undefined ) {
                break;
            }
        } else break;
   }

    if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
        arr_ids.forEach(element => {
            flipped.push(element);
        });
        changeFlag = true;
    }

      // left:

      arr_ids = [];
      arr_col = [];
  
      for (let i = col-1; i >= 0; i--) {

            if(i < 8 && i >= 0) {

                let nextSq = board[row][i];
        
                if (nextSq === "." || nextSq === undefined) {
                    break;
                }
                if (nextSq === otherPlayer) {
                    arr_col.push(nextSq);
                    arr_ids.push([row, i]);
                }
                if (nextSq === activePlayer) {
                    arr_col.push(nextSq);
                    break;
                } 
            }  else break;
      }
  
      if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
          arr_ids.forEach(element => {
            flipped.push(element);
          });
          changeFlag = true;
      }


    // Diagonal: down-right:

    arr_ids = [];
    arr_col = [];

    for (let i = row+1, j = col+1; i < 8, j < 8; i++, j++)  {
        
        if(i < 8 && j < 8 && i >= 0 && j >= 0) {
            let nextSq = board[i][j];
            
            if(nextSq === otherPlayer) {
                arr_col.push(nextSq);
                arr_ids.push([i,j]);
            }
            if(nextSq === activePlayer) {
                arr_col.push(nextSq);
                break;
            }
            if(nextSq === "." || nextSq === undefined ) {
                break;
            }
        } else break;

    }

    if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
        arr_ids.forEach(element => {
            flipped.push(element);
        });
        changeFlag = true;
    }

        // Diagonal: down-left:

        arr_ids = [];
        arr_col = [];
    
        for (let i = row+1, j = col-1; i < 8, j >= 0; i++, j--)  {
            
            if(i < 8 && j < 8 && i >= 0 && j >= 0) {
                let nextSq = board[i][j];
                
                if(nextSq === otherPlayer) {
                    arr_col.push(nextSq);
                    arr_ids.push([i,j]);
                }
                if(nextSq === activePlayer) {
                    arr_col.push(nextSq);
                    break;
                }
                if(nextSq === "." || nextSq === undefined ) {
                    break;
                }
            } else break;
    
        }
    
        if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
            arr_ids.forEach(element => {
                flipped.push(element);
            });
            changeFlag = true;
        }

    // Diagonal: up-left:

    arr_ids = [];
    arr_col = [];

    for (let i = row-1, j = col-1; i >= 0, j >= 0; i--, j--){
        
        if(i < 8 && j < 8 && i >= 0 && j >= 0) {
            let nextSq = board[i][j];
            
            if(nextSq === otherPlayer) {
                arr_col.push(nextSq);
                arr_ids.push([i,j]);
            }
            if(nextSq === activePlayer) {
                arr_col.push(nextSq);
                break;
            }
            if(nextSq === "." || nextSq === undefined ) {
                break;
            }
        } else break;
    }
   
    if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
        arr_ids.forEach(element => {
            flipped.push(element);
        });
        changeFlag = true;
    }

      // Diagonal: up-right:

      arr_ids = [];
      arr_col = [];
  
      for (let i = row-1, j = col+1; i >= 0, j < 8; i--, j++){
          
          if(i < 8 && j < 8 && i >= 0 && j >= 0) {
              let nextSq = board[i][j];
              
              if(nextSq === otherPlayer) {
                  arr_col.push(nextSq);
                  arr_ids.push([i,j]);
              }
              if(nextSq === activePlayer) {
                  arr_col.push(nextSq);
                  break;
              }
              if(nextSq === "." || nextSq === undefined ) {
                  break;
              }
          } else break;
      }
     
      if ((arr_col[0] === otherPlayer) && (arr_col[arr_col.length -1] === activePlayer))   {
          arr_ids.forEach(element => {
              flipped.push(element);
          });
          changeFlag = true;
      }


    // Update game array with all flips & original target cell. Update HTML display.
    // Reset flag.

    if (changeFlag) {

        console.log(flipped);
        flipped.forEach(element => {
            board[element[0]][element[1]] = activePlayer;
            });
        
        board[row][col] = activePlayer;
        
        updateBoard();
        changePlayer();

        changeFlag = false;

    }
    
}


///////////////////////////////////////////////////////
// lets play

initialize();
