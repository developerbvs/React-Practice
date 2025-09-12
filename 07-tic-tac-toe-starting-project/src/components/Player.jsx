import { useState } from "react";

export default function Player({ InitialName, symbol, isActive }) {

    const [playerName, setPlayerName] = useState(InitialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {

        setIsEditing((isEditing) => !isEditing);
    }

    function handleChange(e) {
        setPlayerName(e.target.value);
    }

    let player = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        player = <input type="text" onChange={handleChange} value={playerName} required />
    }


    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}