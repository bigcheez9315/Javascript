window.onload = start;
var boxes = document.getElementsByTagName("td");
var turnText = document.querySelector(".playerTurn");
var counter = 1;
var winCounter = 0;
var OMoves = [];
var XMoves = [];
var remainingMoves = [0,1,2,3,4,5,6,7,8];

var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function start(){
  addXandOListener();
  addResetListener();
}

function addXandOListener(){
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].addEventListener("click", addXorO);
  }
}

function removeBox(guessedPosition) {
    var index = remainingMoves.indexOf(guessedPosition)
    if (index > -1) {
        remainingMoves.splice(index, 1);
    }
}

function guessO(){
    var compGuess;
    var XMove;
    var combo;
    var OMove;
    var i;
    var j;
    // If it is O's first move then go in any random open spot
    if(OMoves.length === 0) {
        compGuess = remainingMoves[Math.floor(Math.random() * remainingMoves.length)]; 
        return compGuess;
    }
    // CHeck to see if there are 2 of the 3 winning combinations are filled with OMoves and the 
    // remaining spot is free then make compGuess = the remaining spot
    for (i in winningCombinations) {
        combo = winningCombinations[i];
        var score = 0;
        var remainingIndices = [0,1,2];
        for(j in OMoves) {
            OMove = OMoves[j];
            var index = combo.indexOf(OMove);
            if ( index != -1) {
                var remainingIndex = remainingIndices.indexOf(index);
                remainingIndices.splice(remainingIndex,1);   
                score += 1;
            }
        }
        // if exactly 2 of the 3 spots were filled then make compGuess = remaining winningIndice
        if(score ==2) {
            var remainingOption = combo[remainingIndices[0]];
            // Check to see if remainingOption is an available Move for O. If so then make compGuess = this move
            if(remainingMoves.indexOf(remainingOption) != -1) { 
                compGuess = remainingOption; 
            return compGuess;
            }
        }
            
    } 
    // Check to see if there are 2 X moves in 2 of 3 spots for a winning combination. If that is the case then 
    // make the compGuess be the 3rd spot to prevent X from winning.
    for (i in winningCombinations) {
        combo = winningCombinations[i];
        var score = 0;
        var remainingIndices = [0,1,2];
        for(j in XMoves) {
            XMove = XMoves[j];
            var index = combo.indexOf(XMove);
            if ( index != -1) {
                var remainingIndex = remainingIndices.indexOf(index);
                remainingIndices.splice(remainingIndex,1);   
                score += 1;
            }
        }
        // if exactly 2 of the 3 spots were filled then make compGuess = remaining winningIndice
        if(score ==2) {
            var remainingOption = combo[remainingIndices[0]];
            // Check to see if remainingOption is an available Move for O. If so then make compGuess = this move
            if(remainingMoves.indexOf(remainingOption) != -1) { 
                compGuess = remainingOption; 
            return compGuess;
            }
        }
    }
    // If there aren't any required places for O to move then just randomly go in one of ther spots
    compGuess =  remainingMoves[Math.floor(Math.random() * remainingMoves.length)]; 
    return compGuess;
}
    
function addXorO(event){
  if (event.target.innerHTML.length === 0){
      var clickedPosition = parseInt(event.target.getAttribute("data-num"));
      XMoves.push(clickedPosition);
      event.target.innerHTML = "X";
      event.target.setAttribute("class","X");
      turnText.innerHTML = "It is O's turn";
      counter++;
      checkForWin(XMoves, "X");
     // Now have computer randomly pick one of the remaining boxes
      if ( counter % 2 === 0 & counter < 10) {
          removeBox(clickedPosition);
          var compGuess = guessO();
          OMoves.push(compGuess);
          boxes[compGuess].innerHTML = "O";
          boxes[compGuess].setAttribute("class","O");
          turnText.innerHTML = "It is X's turn";
          counter++;
          checkForWin(OMoves, "O");
          removeBox(compGuess);      
      }
 }
  // if the counter is greater than or equal to 10, the game is a draw!
  if (counter >= 10){
    turnText.innerHTML = "Game Over!";
    var conf = confirm("It's a draw, do you want to play again?");
    if(conf){
      resetBoard();
    }
  }
}

function addResetListener(){
  var resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", resetBoard);
}

function checkForWin(movesArray, name){
  // loop over the first array of winning combinations
  for (i = 0; i < winningCombinations.length; i++) {
    // reset the winCounter each time!
    winCounter = 0;
    // loop over each individual array
    for (var j = 0; j < winningCombinations[i].length; j++) {
      // if the number in winning combo array is === a number in moves array, add to winCounter
      if(movesArray.indexOf(winningCombinations[i][j]) !== -1){
        winCounter++;
      }
      // if winCounter === 3 that means all 3 moves are winning combos and game is over!
      if(winCounter === 3){
        alert("Game over, " + name + " wins!");
        resetBoard();
      }
    }
  }
}

function resetBoard(){
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].innerHTML="";
    boxes[i].setAttribute("class","clear");
  }
  remainingMoves = [0,1,2,3,4,5,6,7,8];
  OMoves = [];
  XMoves = [];
  winCounter=0;
  counter = 1;
  turnText.innerHTML = "It is X's turn";
}
