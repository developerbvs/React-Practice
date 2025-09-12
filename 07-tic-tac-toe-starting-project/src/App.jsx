
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Logs from "./components/Logs";


function deriveActivePlayer(gameTurn) {

  let currPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player == "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function App() {

  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurn);

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

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player InitialName={"Sami"} symbol={"X"} isActive={activePlayer === "X"} />
            <Player InitialName={"Faizan"} symbol={"O"} isActive={activePlayer === "O"} />
          </ol>
          <GameBoard onSelectSqure={handleSelectSquare} turns={gameTurn} />
        </div>
        <Logs turns={gameTurn} />
      </main>
    </>
  )
}

export default App
