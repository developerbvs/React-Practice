
export default function GameBoard({ onSelectSqure, board }) {

    return (
        <ol id="game-board">
            {
                board.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, columnIndex) => (
                                <li key={columnIndex}>
                                    <button onClick={() => onSelectSqure(rowIndex, columnIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                                </li>
                            ))}
                        </ol>
                    </li>

                ))
            }
        </ol>
    )

}