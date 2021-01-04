import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import History from './History';
import games from './games';
import { setCandidates, solveCells, solveNonets, removeNakeds, reduceCandidatesXWing, initReduceCandidates, verifyCompletedGrid, getGridAnswers, getGridNextAnswers, getDiffOfCompletedCells } from './logic';
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

    const [showCandidates, setShowCandidates] = useState(false);

    useEffect(() => {
        localStorage.setItem('sudokuHistory', JSON.stringify(history));
        localStorage.setItem('sudokuStepNumber', stepNumber);
    }, [history, stepNumber]);

    const prevHistory = _.cloneDeep(history);
    const addHistory = newHistory => setHistory([...prevHistory, newHistory]);
    const currentGridValues = history[stepNumber].grid;
    const nextGridValues = getGridNextAnswers(currentGridValues);
    const nextPossibleAnswers = getDiffOfCompletedCells(currentGridValues, nextGridValues);
    const completedGrid = getGridAnswers(history[0].grid);
    

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

    function createNewGame(initialGrid) {
        setHistory([{ grid: setCandidates(initialGrid) }]);
        setStepNumber(0);
        setIsInGameMode(true);
    }

    function checkCompletedGrid(grid) {
        if (verifyCompletedGrid(grid) === true) {
            alert('sudoku game completed successfully!');
        }
    }

    return (
        <div className="App">
            <Grid values={currentGridValues} onValueChange={onValueChange} givens={history[0].grid} showCandidates={showCandidates} nextPossibleAnswers={nextPossibleAnswers} completedGrid={completedGrid} />
            <div className="game-panel">
                <h2>Controls</h2>
                <fieldset>
                    <legend>Generate Game</legend>
                    <button onClick={() => { createNewGame(games.easy[getRandomInt(games.easy.length)]); }
                    }>Easy</button>
                    <button onClick={() => { createNewGame(games.medium[getRandomInt(games.medium.length)]); }
                    }>Medium</button>
                    <button onClick={() => { createNewGame(games.hard[getRandomInt(games.hard.length)]); }
                    }>Hard</button>
                    <button onClick={() => { createNewGame(games.expert[getRandomInt(games.expert.length)]); }
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
                    <button onClick={ () => {
                        updateGame(completedGrid);
                    }}>Solve Grid 1 Step</button>
                </fieldset>
                <button onClick={ () => {
                    setHistory([{ grid: generateEmptyBoard() }]);
                    setStepNumber(0);
                    setIsInGameMode(false);
                } }>Create Custom Game</button>

                <button onClick={ () => { createNewGame(currentGridValues); }
                }>Start Game</button>

                <button onClick={ () => {
                    checkCompletedGrid(currentGridValues);
                }}>Verify Completed Game</button>
                <h2>Settings</h2>
                <button onClick={ () => {
                    showCandidates === true ? setShowCandidates(false) : setShowCandidates(true);
                }}>{showCandidates === true ? 'Hide Candidates' : 'Show Candidates'}</button>
            </div>
            <History history={history} jumpToStepInHistory={jumpToStepInHistory} currentStep={stepNumber} />
        </div>
    );
}

export default App;
