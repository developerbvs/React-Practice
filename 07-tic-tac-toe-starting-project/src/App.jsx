
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from "./components/GameOver.jsx";

const PLAYER = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurn) {

  let currPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player == "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function handleWinner(gameBoard, playerName) {

  let winner;

  for (const combination of WINNING_COMBINATIONS) {

    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner;
}

function handleGameBoard(gameTurn) {

  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;

}

function App() {

  const [gameTurn, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYER);

  const activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = handleGameBoard(gameTurn);

  const winner = handleWinner(gameBoard,playerName);
  const gameDraw = gameTurn.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {

    setGameTurn((prevTurn) => {
      const currPlayer = deriveActivePlayer(prevTurn);

      let updatedTurn = [
        {
          square: { row: rowIndex, col: colIndex }, player: currPlayer
        }, ...prevTurn,
      ]
      return updatedTurn;
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayerName(
      (prevPlayers) => {
        return {
          ...prevPlayers,
          [symbol]: newName.toUpperCase(),
        }
      }
    );
  }


  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player InitialName={playerName['X']} symbol={"X"} isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
            <Player InitialName={playerName['O']} symbol={"O"} isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
          </ol>
          {(winner || gameDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
          <GameBoard onSelectSqure={handleSelectSquare} board={gameBoard} />
        </div>
        <Logs turns={gameTurn} />
      </main>
    </>
  )
}

export default App
