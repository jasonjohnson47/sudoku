import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import History from './History';
import games from './games';
import { solveCells, solveNonets, removeNakeds, reduceCandidatesXWing, initReduceCandidates, verifyCompletedGrid } from './logic';
import _ from 'lodash';

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
    const [isInGameMode, setIsInGameMode] = useState(true);

    useEffect(() => {
        localStorage.setItem('sudokuHistory', JSON.stringify(history));
        localStorage.setItem('sudokuStepNumber', stepNumber);
    }, [history, stepNumber]);

    const prevHistory = _.cloneDeep(history);
    const addHistory = newHistory => setHistory([...prevHistory, newHistory]);
    const currentGridValues = history[stepNumber].grid;

    function onValueChange(values) {
        if (isInGameMode) {
            addHistory({
                grid: values
            });
            setStepNumber(history.length);
        } else {
            setHistory([{
                grid: values
            }]);
        }
    }

    function updateGame(updatedGrid) {
        if (!_.isEqual(updatedGrid, currentGridValues)) {
            addHistory({
                grid: updatedGrid
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
                            setHistory([{ grid: games.hard[getRandomInt(games.hard.length)] }]);
                            setStepNumber(0);
                        }
                    }>Hard</button>
                    <button onClick={() =>
                        {
                            setHistory([{ grid: games.expert[getRandomInt(games.expert.length)] }]);
                            setStepNumber(0);
                        }
                    }>Expert</button>
                </fieldset>
                <fieldset>
                    <legend>Get Help Solving</legend>
                    <button onClick={ () => {
                        updateGame(solveCells(currentGridValues));
                    }}>Solve Cells</button>
                    <button onClick={ () => {
                        updateGame(solveNonets(currentGridValues));
                    }}>Solve Nonets</button>
                    <button onClick={ () => {
                        updateGame(removeNakeds(currentGridValues));
                    }}>Nakeds</button>
                    <button onClick={ () => {
                        updateGame(reduceCandidatesXWing(currentGridValues));
                    }}>X-Wings</button>
                    <button onClick={ () => {
                        updateGame(initReduceCandidates(currentGridValues));
                    }}>Reduce Candidates</button>
                </fieldset>
                <button onClick={ () => {
                    setHistory([{ grid: generateEmptyBoard() }]);
                    setStepNumber(0);
                    setIsInGameMode(false);
                } }>Create Custom Game</button>

                <button onClick={ () => {
                    setHistory([{ grid: currentGridValues }]);
                    setStepNumber(0);
                    setIsInGameMode(true);
                } }>Start Game</button>

                <button onClick={ () => {
                    verifyCompletedGrid(currentGridValues);
                }}>Verify Completed Game</button>
                <h2>Settings</h2>
            </div>
            <History history={history} jumpToStepInHistory={jumpToStepInHistory} currentStep={stepNumber} />
        </div>
    );
}

export default App;
