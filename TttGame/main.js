function TicTacToe(){
  
  // FLAGS
  var PLAYER_ONE = 0x100;
  var PLAYER_TWO = 0x200;
  var NO_PLAYER  = 0x300;
  var IS_DRAW    = 0x400;
  
  // SCORE
  var playerOneScore = 0;
  var playerTwoScore = 0;
  
  // GAME STATE
  var isGameOver = false;
  var gameBoard = [NO_PLAYER, NO_PLAYER, NO_PLAYER,
                   NO_PLAYER, NO_PLAYER, NO_PLAYER,
                   NO_PLAYER, NO_PLAYER, NO_PLAYER];

  this.isGameOver = function(){
    return isGameOver;
  }
  this.getBoard = function(){return gameBoard;}

  var is2Players = false;
  this.player2Name = "Computer";
  this.player1Name = "Player 1";

  var playerTurn = PLAYER_ONE;
  var playerOneUsesXs = true;
  
  
  // region ----- methods responsible for manipulating the game state -----
  this.reset = function(){
    gameBoard = [NO_PLAYER, NO_PLAYER, NO_PLAYER,
                 NO_PLAYER, NO_PLAYER, NO_PLAYER,
                 NO_PLAYER, NO_PLAYER, NO_PLAYER];

    playerTurn = PLAYER_ONE;
    isGameOver = false;
    this.updateGameBoard();
    this.updateGameTurnDisplay();
    $(".game-result-display-container").css("display", "none");
  }
  
  function oppositePlayer(player){
    return player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
  }
  
  function getGamePieceForPlayer(player){
    if(player === NO_PLAYER) return "";
    else if(player === PLAYER_ONE){
      return playerOneUsesXs ? "X" : "O";
    }
    else {
      return playerOneUsesXs ? "O" : "X";
    }
  }

  function getPlayerFromGamePiece(gamePiece){
    if(gamePiece == "") return NO_PLAYER;
    else if(gamePiece === "X" && playerOneUsesXs) return PLAYER_ONE;
    else if(gamePiece === "O" && !playerOneUsesXs) return PLAYER_ONE;
    return PLAYER_TWO;
  }
  
  this.changePlayerOnePreference = function(newPreference){
    playerOneUsesXs = newPreference;
    this.reset();
  }

  this.changeNumberOfPlayers = function(shouldUse2Players){
    this.reset();
    is2Players = shouldUse2Players;
    playerOneScore = 0;
    playerTwoScore = 0;

    this.player2Name = is2Players ? "Player 2" : "Computer";
    this.updatePlayerScores();
    $("#player-two-name").html(this.player2Name);
  }
  //endregion --- end ---
  
  //region methods responsible for updating the UI
  this.showGameResultMessage = function(gameResultValue){
    var message;
    
    switch(gameResultValue) {
        case(IS_DRAW):
          message = "Draw";
          break;
        
        case(PLAYER_ONE):
          var gamePiece = getGamePieceForPlayer(PLAYER_ONE);
          message = gamePiece + "'s "+this.player1Name+" wins";
          break;
        
        case(PLAYER_TWO):
          var gamePiece = getGamePieceForPlayer(PLAYER_TWO);
          message = gamePiece + "'s "+this.player2Name+" wins";
          break;
    }
    
    $(".game-result-display-container").css("display", "block");
    $(".game-result-display").html(message);
  }

  this.updatePlayerScores = function(){
    $("#player-one-score").html(playerOneScore);
    $("#player-two-score").html(playerTwoScore);
  }

  this.updateGameBoard = function(){
    for(var i = 0; i < gameBoard.length; i++){
      var button = $("#grid-"+(i + 1));
      var value = getGamePieceForPlayer(gameBoard[i]);
      button.html(value);
    }
  }
  
  this.updateGameTurnDisplay = function(){
    var piece = getGamePieceForPlayer(playerTurn);
    var message = piece + "'s ";
    message += playerTurn === PLAYER_ONE ? this.player1Name : this.player2Name;
    $("#game-turn-display").html(message);
  }
  //endregion --- end ---
  
  //region --- game logic ---
  function isBoardFull(board){
    for(var i = 0; i < board.length; i++){
      if(board[i] === NO_PLAYER) return false;
    }
    return true;
  }
  
  function checkIfGameOver(board){
    
    function checkWinner(pattern){
      var a = pattern[0]; var b = pattern[1]; var c = pattern[2];
      
      var isWinner = board[a] !== NO_PLAYER &&
                     (board[a] == board[b]) &&
                     (board[b] == board[c]);
      
      if(isWinner) return board[a];
      return NO_PLAYER;
    }
    
    var winPatterns = [[0,1,2], [3,4,5], [6,7,8],
                      [0,3,6], [1,4,7], [2,5,8],
                      [0,4,8], [6,4,2]];
    
    for(var i = 0; i < winPatterns.length; i++){
      var winner = checkWinner(winPatterns[i]);
      if(winner !== NO_PLAYER){
        return winner;
      }
    }
    
    if(isBoardFull(board)){
      return IS_DRAW;
    }
    
    return NO_PLAYER;
  }
  
  this.checkForWinners = function(){
    var winnerCheckVal = checkIfGameOver(gameBoard);
    if(winnerCheckVal !== NO_PLAYER){
      if(winnerCheckVal === PLAYER_ONE) playerOneScore++;
      else if(winnerCheckVal === PLAYER_TWO) playerTwoScore++;
      isGameOver = true;

      this.showGameResultMessage(winnerCheckVal);
      this.updatePlayerScores();
    }
  }
  
  this.computerTurn = function(board, depth, player){
    // AI - an adaptation of the minimax algorithm
    
    if(checkIfGameOver(board) === oppositePlayer(player)) return -5 + depth;
    if(isBoardFull(board)) return 0;

    var maxScore = -Infinity;
    var index = 0;

    for(var i = 0; i < 9; i++){
      if(board[i] === NO_PLAYER){
        var newBoard = board.slice();
        newBoard[i] = player;

        var moveScore = -this.computerTurn(newBoard, depth + 1, oppositePlayer(player));

        if(moveScore > maxScore){
          maxScore = moveScore;
          index = i;
        }
      }
    }

    if(depth == 0) gameBoard[index] = PLAYER_TWO;

    return maxScore;
  }
  
  this.selectGameSpace = function(gameSpaceIndex){
    if(!isGameOver && gameBoard[gameSpaceIndex - 1] === NO_PLAYER) {
      gameBoard[gameSpaceIndex - 1] = playerTurn;
      playerTurn = oppositePlayer(playerTurn);
      
      this.checkForWinners();
      
      if(!is2Players && !isGameOver && playerTurn == PLAYER_TWO){
        this.computerTurn(gameBoard, 0, PLAYER_TWO);
        playerTurn = PLAYER_ONE;
        this.checkForWinners();
      }
      
      this.updateGameTurnDisplay();
      this.updateGameBoard();
    }
  }
}

var game = new TicTacToe();

$(document).ready(function(){

  $(".game-field button").on("click", function(){
    var viewId = $(this).attr("id");
    var gameIndex = parseInt(viewId[viewId.length - 1]);
    game.selectGameSpace(gameIndex);
  });
  
  $("#reset-button").on("click", function(){ game.reset(); });
  
  $("#player-one-type-switch-group").on("click", function(){
    var usesXs = !$("#checkbox-player-one-type").is(':checked');
    game.changePlayerOnePreference(usesXs);
  });
  
  $("#switch-player-mode").on("click", function(){
    var is2Players = $("#checkbox-player-mode").is(":checked");
    game.changeNumberOfPlayers(is2Players);
  });
  
});
