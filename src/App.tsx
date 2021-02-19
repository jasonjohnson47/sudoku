import React, { useState, useEffect, useCallback } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Grid from './Grid';
import NewGamePanel from './NewGamePanel';
import GameSettingsPanel from './GameSettingsPanel';
import History from './History';
import { setCandidates, verifyCompletedGrid, getGridAnswers, getGridNextAnswers, getDiffOfCompletedCells } from './logic';
import _ from 'lodash';

type GridArr = (number | number[])[][];

interface HistoryObj {
    grid: GridArr;
}

function App() {

    function generateEmptyBoard() {
        return [[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]]];
    }

    const historyJson = localStorage.getItem('sudokuHistory');
    const [history, setHistory] = useState<HistoryObj[]>(
        historyJson !== null ? JSON.parse(historyJson) : [{ grid: generateEmptyBoard() }]
    );

    const stepNumberJson = localStorage.getItem('sudokuStepNumber');
    const [stepNumber, setStepNumber] = useState<number>(
        stepNumberJson !== null ? JSON.parse(stepNumberJson) : 0
    );

    const showCandidatesJson = localStorage.getItem('sudokuShowCandidates');
    const [showCandidates, setShowCandidates] = useState<boolean>(
        showCandidatesJson !== null ? JSON.parse(showCandidatesJson) : false
    );

    const highlightGivensJson = localStorage.getItem('sudokuHighlightGivens');
    const [highlightGivens, setHighlightGivens] = useState<boolean>(
        highlightGivensJson !== null ? JSON.parse(highlightGivensJson) : true
    );

    const highlightSolvableCellsJson = localStorage.getItem('sudokuHighlightSolvableCells');
    const [highlightSolvableCells, setHighlightSolvableCells] = useState<boolean>(
        highlightSolvableCellsJson !== null ? JSON.parse(highlightSolvableCellsJson) : true
    );

    const highlightIncorrectCellsJson = localStorage.getItem('sudokuHighlightIncorrectCells');
    const [highlightIncorrectCells, setHighlightIncorrectCells] = useState<boolean>(
        highlightIncorrectCellsJson !== null ? JSON.parse(highlightIncorrectCellsJson) : true
    );

    const [isInGameMode, setIsInGameMode] = useState(true);

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    function toggleMenu() {
        setMenuIsOpen(!menuIsOpen);
    }

    const prevHistory = _.cloneDeep(history);
    const addHistory = (newHistory: HistoryObj) => setHistory([...prevHistory, newHistory]);
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
        localStorage.setItem('sudokuStepNumber', JSON.stringify(stepNumber));
        localStorage.setItem('sudokuShowCandidates', JSON.stringify(showCandidates));
        localStorage.setItem('sudokuHighlightGivens', JSON.stringify(highlightGivens));
        localStorage.setItem('sudokuHighlightSolvableCells', JSON.stringify(highlightSolvableCells));
        localStorage.setItem('sudokuHighlightIncorrectCells', JSON.stringify(highlightIncorrectCells));
        checkCompletedGridMemoizedCallback(currentGridValues);
    }, [history, stepNumber, showCandidates, highlightGivens, highlightSolvableCells, highlightIncorrectCells, checkCompletedGridMemoizedCallback, currentGridValues]);
    
    function updateGame(updatedGrid: GridArr) {
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

    function jumpToStepInHistory(step: number) {
        setStepNumber(step);
    }

    function createCustomGame() {
        setHistory([{ grid: generateEmptyBoard() }]);
        setStepNumber(0);
        setIsInGameMode(false);
    }

    function createNewGame(initialGrid: GridArr) {
        setHistory([{ grid: setCandidates(initialGrid) }]);
        setStepNumber(0);
        setIsInGameMode(true);
    }

    function isGridFull(currentGridValues: GridArr) {
        const currentGridValuesFlat = currentGridValues.flat();
        return currentGridValuesFlat.every((value) => Number.isInteger(value));
    }

    return (
        <div className="App">
            <Dropdown id="dropdown-game-menu" className="text-right" show={menuIsOpen}>
                <Dropdown.Toggle variant="primary" id="game-menu" onClick={() => { toggleMenu() }}>
                    <span className="sr-only">Menu</span>
                    <span className="navbar-toggler-icon"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-4">
                    <h2>Start a New Game</h2>
                    <NewGamePanel
                        createNewGame={createNewGame}
                        createCustomGame={createCustomGame}
                        toggleMenu={toggleMenu}
                    />
                    <Dropdown.Divider />
                    <h2>Settings</h2>
                    <GameSettingsPanel
                        showCandidates={showCandidates}
                        setShowCandidates={setShowCandidates}
                        highlightGivens={highlightGivens}
                        setHighlightGivens={setHighlightGivens}
                        highlightSolvableCells={highlightSolvableCells}
                        setHighlightSolvableCells={setHighlightSolvableCells}
                        highlightIncorrectCells={highlightIncorrectCells}
                        setHighlightIncorrectCells={setHighlightIncorrectCells}
                    />
                    <Dropdown.Divider />
                    <button className="btn btn-block btn-primary" onClick={() => {
                        toggleMenu();
                        updateGame(completedGrid);
                    }}>
                        Solve Puzzle
                    </button>
                </Dropdown.Menu>
            </Dropdown>

            <div className={isInGameMode === true ? "custom-game-instructions d-none" : "custom-game-instructions"}>
                <p>Enter your starting numbers ("givens") in the cells to create your own game. When you have finished entering all the givens, click "Start Game" to start solving the puzzle.</p>
                <button className="btn btn-primary" onClick={() => { createNewGame(currentGridValues) }}>
                    Start Game
                </button>
            </div>

            <Grid
                currentGridValues={currentGridValues}
                pastGridValues={
                    stepNumber > 0
                        ? history[stepNumber - 1].grid
                        : history[0].grid
                }
                updateGame={updateGame}
                givens={history[0].grid}
                highlightGivens={highlightGivens}
                highlightSolvableCells={highlightSolvableCells}
                highlightIncorrectCells={highlightIncorrectCells}
                showCandidates={showCandidates}
                nextPossibleAnswers={nextPossibleAnswers}
                completedGrid={completedGrid}
                isInGameMode={isInGameMode}
            />
            
            <h2>Game History</h2>
            <History
                history={history}
                jumpToStepInHistory={jumpToStepInHistory}
                currentStep={stepNumber}
            />
        </div>
    );
}

export default App;
