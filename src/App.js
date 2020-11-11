import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import History from './History';
import games from './games';

function App() {

    function generateEmptyBoard() {
        return [[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]]];
    }

    const [history, setHistory] = useState(
        JSON.parse(localStorage.getItem('sudokuHistory')) || [{
            grid: generateEmptyBoard()
        }]);
    const [stepNumber, setStepNumber] = useState(0);

    useEffect(() => {
        localStorage.setItem('sudokuHistory', JSON.stringify(history));
    }, [history]);

    const clone = require('rfdc')();
    const prevHistory = clone(history);
    const addHistory = newHistory => setHistory([...prevHistory, newHistory]);

    function onValueChange(values) {
        addHistory({
            grid: values
        });
        setStepNumber(stepNumber + 1);
    }

    function jumpToStep(step) {
        setStepNumber(step);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    return (
        <div className="App">
            <Grid values={history[stepNumber].grid} onValueChange={onValueChange} />
            <div className="game-panel">
                <h2>Controls</h2>
                <fieldset>
                    <legend>Generate Game</legend>
                    <button onClick={() =>
                        {
                            setHistory([{ grid: games.easy[getRandomInt(games.easy.length)] }]);
                            setStepNumber(0);
                        }
                    }>Easy</button>
                    <button onClick={() =>
                        {
                            setHistory([{ grid: games.medium[getRandomInt(games.medium.length)] }]);
                            setStepNumber(0);
                        }
                    }>Medium</button>
                    <button onClick={() =>
                        {
                            setHistory([{ grid: games.expert[getRandomInt(games.expert.length)] }]);
                            setStepNumber(0);
                        }
                    }>Expert</button>
                </fieldset>
                <h2>Settings</h2>
            </div>
            <History history={history} jumpToStep={jumpToStep} />
        </div>
    );
}

export default App;
