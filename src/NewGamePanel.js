import React, { useState } from 'react';
import games from './games';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function NewGamePanel(props) {

    const [difficultyLevel, setDifficultyLevel] = useState('Easy');
    const {createNewGame, createCustomGame, toggleMenu} = props;

    function generateGame() {
        if (difficultyLevel === 'Easy') {
            createNewGame(
                games.easy[getRandomInt(games.easy.length)]
            );
        }
        if (difficultyLevel === 'Medium') {
            createNewGame(
                games.medium[getRandomInt(games.medium.length)]
            );
        }
        if (difficultyLevel === 'Hard') {
            createNewGame(
                games.hard[getRandomInt(games.hard.length)]
            );
        }
        if (difficultyLevel === 'Expert') {
            createNewGame(
                games.expert[getRandomInt(games.expert.length)]
            );
        }
    }

    return (
        <div className="new-game-panel">
            <div className="form-group">
                <label htmlFor="difficulty-selector">Difficulty: </label>
                <select
                    id="difficulty-selector"
                    className="form-control"
                    value={difficultyLevel}
                    onChange={(e) => {
                        setDifficultyLevel(e.target.value);
                    }}
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Expert">Expert</option>
                </select>
            </div>
            <button className="btn btn-block btn-primary" onClick={() => {
                generateGame();
                toggleMenu();
            }}>
                Generate Game
            </button>
            <button className="btn btn-block btn-primary" onClick={() => {
                createCustomGame();
                toggleMenu();
            }}>
                Create Custom Game
            </button>
        </div>
    );
}

export default NewGamePanel;