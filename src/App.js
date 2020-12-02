import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import History from './History';
import games from './games';
import { solveNonets, removeNakeds, reduceCandidatesXWing, initReduceCandidates, solveCells, setCandidates, verifyCompletedGrid } from './logic';

function App() {

    function generateEmptyBoard() {
        return [[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]]];
    }

    const [history, setHistory] = useState(
        JSON.parse(localStorage.getItem('sudokuHistory')) || [{
            grid: generateEmptyBoard()
        }]
    );
    const [stepNumber, setStepNumber] = useState(
        Number(localStorage.getItem('sudokuStepNumber')) || 0
    );

    useEffect(() => {
        localStorage.setItem('sudokuHistory', JSON.stringify(history));
        localStorage.setItem('sudokuStepNumber', stepNumber);
    }, [history, stepNumber]);

    const clone = require('rfdc')();
    const prevHistory = clone(history);
    const addHistory = newHistory => setHistory([...prevHistory, newHistory]);
    const currentGridValues = history[stepNumber].grid;

    function onValueChange(values) {
        addHistory({
            grid: values
        });
        setStepNumber(history.length);
    }

    function updateCells(cells) {
        if (cells.length !== 0) {
            //console.log(cells);
            const newValues = currentGridValues;
            cells.forEach(function(cell) {
                newValues[cell.row][cell.column] = cell.value;
            });
            addHistory({
                grid: newValues
            });
            setStepNumber(history.length);
        }
    }

    function jumpToStepInHistory(step) {
        setStepNumber(step);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    return (
        <div className="App">
            <Grid values={currentGridValues} onValueChange={onValueChange} />
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
                <button onClick={ () => {
                    updateCells(setCandidates(currentGridValues));
                }}>Set Candidates</button>
                <button onClick={ () => {
                    updateCells(solveCells(currentGridValues));
                }}>Solve Cells</button>
                <button onClick={ () => {
                    updateCells(solveNonets(currentGridValues));
                }}>Solve Nonets</button>
                <button onClick={ () => {
                    updateCells(removeNakeds(currentGridValues));
                }}>Remove Nakeds</button>
                <button onClick={ () => {
                    updateCells(initReduceCandidates(currentGridValues));
                }}>Reduce Candidates</button>
                <h2>Settings</h2>
            </div>
            <History history={history} jumpToStepInHistory={jumpToStepInHistory} currentStep={stepNumber} />
        </div>
    );
}

export default App;
