import React, { useState, useEffect, useCallback } from 'react';
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

    const [showCandidates, setShowCandidates] = useState(
        localStorage.getItem('sudokuShowCandidates')
        ? JSON.parse(localStorage.getItem('sudokuShowCandidates'))
        : false
    );

    const [highlightGivens, setHighlightGivens] = useState(
        localStorage.getItem('sudokuHighlightGivens')
        ? JSON.parse(localStorage.getItem('sudokuHighlightGivens'))
        : true
    );

    const [highlightSolvableCells, setHighlightSolvableCells] = useState(
        localStorage.getItem('sudokuHighlightSolvableCells')
        ? JSON.parse(localStorage.getItem('sudokuHighlightSolvableCells'))
        : true
    );

    const [highlightIncorrectCells, setHighlightIncorrectCells] = useState(
        localStorage.getItem('sudokuHighlightIncorrectCells')
        ? JSON.parse(localStorage.getItem('sudokuHighlightIncorrectCells'))
        : true
    );

    const prevHistory = _.cloneDeep(history);
    const addHistory = newHistory => setHistory([...prevHistory, newHistory]);
    const currentGridValues = history[stepNumber].grid;
    const nextGridValues = getGridNextAnswers(currentGridValues);
    const nextPossibleAnswers = getDiffOfCompletedCells(currentGridValues, nextGridValues);
    let completedGrid = isInGameMode ? getGridAnswers(history[0].grid) : generateEmptyBoard();

    const checkCompletedGridMemoizedCallback = useCallback(
        (grid) => {
            if (isGridFull(grid) === true) {
                if (_.isEqual(grid, completedGrid)) {
                    if (verifyCompletedGrid(grid) === true) {
                        alert('Congrats! Sudoku game completed successfully!');
                    }
                } else {
                    alert('Sorry, some numbers aren\'t where they should be.');
                }
            }
        }, [completedGrid]
    );

    useEffect(() => {
        localStorage.setItem('sudokuHistory', JSON.stringify(history));
        localStorage.setItem('sudokuStepNumber', stepNumber);
        localStorage.setItem('sudokuShowCandidates', showCandidates);
        localStorage.setItem('sudokuHighlightGivens', highlightGivens);
        localStorage.setItem('sudokuHighlightSolvableCells', highlightSolvableCells);
        localStorage.setItem('sudokuHighlightIncorrectCells', highlightIncorrectCells);
        checkCompletedGridMemoizedCallback(currentGridValues);
    }, [history, stepNumber, showCandidates, highlightGivens, highlightSolvableCells, highlightIncorrectCells, checkCompletedGridMemoizedCallback, currentGridValues]);
    
    function onValueChange(updatedGrid) {
        if (isInGameMode) {
            addHistory({
                grid: updatedGrid
            });
            setStepNumber(history.length);
        } else {
            setHistory([{
                grid: updatedGrid
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

    function isGridFull(currentGridValues) {
        const currentGridValuesFlat = currentGridValues.flat();
        return currentGridValuesFlat.every((value) => Number.isInteger(value));
    }

    return (
        <div className="App">
            <Grid
                values={currentGridValues}
                onValueChange={onValueChange}
                givens={history[0].grid}
                highlightGivens={highlightGivens}
                highlightSolvableCells={highlightSolvableCells}
                highlightIncorrectCells={highlightIncorrectCells}
                showCandidates={showCandidates}
                nextPossibleAnswers={nextPossibleAnswers}
                completedGrid={completedGrid}
                isInGameMode={isInGameMode}
            />
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
                    }}>Solve Grid</button>
                </fieldset>
                <button onClick={ () => {
                    setHistory([{ grid: generateEmptyBoard() }]);
                    setStepNumber(0);
                    setIsInGameMode(false);
                } }>Create Custom Game</button>

                <button onClick={ () => { createNewGame(currentGridValues); }
                }>Start Game</button>

                <h2>Settings</h2>

                <div className="checkbox-group">
                    <input type="checkbox" id="show-candidates" name="show-candidates" checked={showCandidates} onChange={ (e) => { 
                        setShowCandidates(e.target.checked);
                    }} />
                    <label htmlFor="show-candidates">Show Candidates</label>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" id="highlight-givens" name="highlight-givens" checked={highlightGivens} onChange={ (e) => { 
                        setHighlightGivens(e.target.checked);
                    }} />
                    <label htmlFor="highlight-givens">Highlight Givens</label>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" id="highlight-solvable" name="highlight-solvable" checked={highlightSolvableCells} onChange={ (e) => { 
                        setHighlightSolvableCells(e.target.checked);
                    }} />
                    <label htmlFor="highlight-solvable">Highlight Solvable Cells</label>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" id="highlight-incorrect-cells" name="highlight-incorrect-cells" checked={highlightIncorrectCells} onChange={ (e) => { 
                        setHighlightIncorrectCells(e.target.checked);
                    }} />
                    <label htmlFor="highlight-incorrect-cells">Highlight Incorrect Cells</label>
                </div>

            </div>
            <History history={history} jumpToStepInHistory={jumpToStepInHistory} currentStep={stepNumber} />
        </div>
    );
}

export default App;
