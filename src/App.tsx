import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Grid from './Grid';
import NewGamePanel from './NewGamePanel';
import GameSettingsPanel from './GameSettingsPanel';
import History from './History';
import {
    setCandidates,
    verifyCompletedGrid,
    getGridAnswers,
    getGridNextAnswers,
    getDiffOfCompletedCells,
} from './logic';
import _ from 'lodash';

type GridArr = (number | number[])[][];

interface HistoryObj {
    grid: GridArr;
}

function App() {
    function generateEmptyBoard() {
        const emptyBoard: GridArr = [];
        for (let i = 0; i < 9; i++) {
            emptyBoard.push(Array(9).fill([]));
        }
        return emptyBoard;
    }

    function isGridFull(currentGridValues: GridArr) {
        const currentGridValuesFlat = currentGridValues.flat();
        return currentGridValuesFlat.every((value) => Number.isInteger(value));
    }

    function checkCompletedGrid(grid: GridArr) {
        if (isGridFull(grid) === true) {
            if (_.isEqual(grid, completedGrid)) {
                if (verifyCompletedGrid(grid) === true) {
                    alert('Congrats! Sudoku game completed successfully!');
                }
            } else {
                alert("Sorry, some numbers aren't where they should be.");
            }
        }
    }

    const historyJson = localStorage.getItem('sudokuHistory');
    const [history, setHistory] = useState<HistoryObj[]>(
        historyJson !== null
            ? JSON.parse(historyJson)
            : [{ grid: generateEmptyBoard() }]
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

    const highlightSolvableCellsJson = localStorage.getItem(
        'sudokuHighlightSolvableCells'
    );
    const [highlightSolvableCells, setHighlightSolvableCells] = useState<boolean>(
        highlightSolvableCellsJson !== null
            ? JSON.parse(highlightSolvableCellsJson)
            : true
    );

    const highlightIncorrectCellsJson = localStorage.getItem(
        'sudokuHighlightIncorrectCells'
    );
    const [
        highlightIncorrectCells,
        setHighlightIncorrectCells,
    ] = useState<boolean>(
        highlightIncorrectCellsJson !== null
            ? JSON.parse(highlightIncorrectCellsJson)
            : true
    );

    const darkModeJson = localStorage.getItem('sudokuDarkMode');
    const [darkMode, setDarkMode] = useState<boolean>(
        darkModeJson !== null
            ? JSON.parse(darkModeJson)
            : window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    if (darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    const [isInGameMode, setIsInGameMode] = useState(true);

    const [showAnswers, setShowAnswers] = useState(false);

    function toggleShowAnswers() {
        setShowAnswers(!showAnswers);
    }

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    function closeMenu() {
        setMenuIsOpen(false);
    }

    function toggleMenu() {
        setMenuIsOpen(!menuIsOpen);
    }

    const prevHistory = _.cloneDeep(history);
    const addHistory = (newHistory: HistoryObj) =>
        setHistory([...prevHistory, newHistory]);
    const initialGrid = history[0].grid;
    const currentGridValues = history[stepNumber].grid;
    const completedGrid = isInGameMode
        ? getGridAnswers(history[0].grid)
        : generateEmptyBoard();

    const currentGridNoIncorrect = _.cloneDeep(currentGridValues).map(
        (row, i) =>
            row.map((cell, j) => {
                // merge current grid and initial grid to remove any incorrect values
                if (typeof currentGridValues[i][j] === 'number') {
                    if (currentGridValues[i][j] === completedGrid[i][j]) {
                        // correct number
                        return currentGridValues[i][j];
                    } else {
                        // incorrect number, reset to candidates in initial grid
                        return initialGrid[i][j];
                    }
                } else {
                    // keep value of current candidates
                    return currentGridValues[i][j];
                }
            })
    );

    const nextGridValues = getGridNextAnswers(currentGridNoIncorrect);
    const nextPossibleAnswers = getDiffOfCompletedCells(
        currentGridNoIncorrect,
        nextGridValues
    );

    useEffect(() => {
        localStorage.setItem('sudokuHistory', JSON.stringify(history));
        localStorage.setItem('sudokuStepNumber', JSON.stringify(stepNumber));
        localStorage.setItem(
            'sudokuShowCandidates',
            JSON.stringify(showCandidates)
        );
        localStorage.setItem(
            'sudokuHighlightGivens',
            JSON.stringify(highlightGivens)
        );
        localStorage.setItem(
            'sudokuHighlightSolvableCells',
            JSON.stringify(highlightSolvableCells)
        );
        localStorage.setItem(
            'sudokuHighlightIncorrectCells',
            JSON.stringify(highlightIncorrectCells)
        );
        localStorage.setItem(
            'sudokuDarkMode',
            JSON.stringify(darkMode)
        );
    }, [
        history,
        stepNumber,
        showCandidates,
        highlightGivens,
        highlightSolvableCells,
        highlightIncorrectCells,
        darkMode
    ]);

    function updateGame(updatedGrid: GridArr) {
        if (isInGameMode) {
            addHistory({
                grid: updatedGrid,
            });
            setStepNumber(history.length);
        } else {
            setHistory([
                {
                    grid: updatedGrid,
                },
            ]);
        }
        checkCompletedGrid(updatedGrid);
    }

    function jumpToStepInHistory(step: number) {
        if (step >= 0 && step <= (history.length - 1)) {
            setStepNumber(step);
        }
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

    return (
        <div className="app-wrapper" onClick={() => { closeMenu() }}>
            <Dropdown
                id="dropdown-game-menu"
                className="text-right"
                show={menuIsOpen}
            >
                <h2>Menu</h2>
                <Dropdown.Toggle
                    variant="primary"
                    id="game-menu"
                    onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                        e.stopPropagation()
                        toggleMenu();
                    }}
                >
                    <span className="sr-only">Menu</span>
                    <span className="navbar-toggler-icon"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-4" onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => { e.stopPropagation() }}>
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
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                    <Dropdown.Divider />
                    <button
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            toggleMenu();
                            toggleShowAnswers();
                        }}
                    >
                        { showAnswers === true ? 'Hide Answers' : 'Show Answers' }
                    </button>
                </Dropdown.Menu>
            </Dropdown>

            <div
                className={
                    isInGameMode === true
                        ? 'custom-game-instructions d-none'
                        : 'custom-game-instructions'
                }
            >
                <p>
                    Enter your starting numbers ("givens") in the cells to
                    create your own game. When you have finished entering all
                    the givens, click "Start Game" to start solving the puzzle.
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        createNewGame(currentGridValues);
                    }}
                >
                    Start Game
                </button>
            </div>

            <Grid
                currentGridValues={currentGridValues}
                currentGridNoIncorrect={currentGridNoIncorrect}
                completedGrid={completedGrid}
                updateGame={updateGame}
                givens={history[0].grid}
                highlightGivens={highlightGivens}
                highlightSolvableCells={highlightSolvableCells}
                highlightIncorrectCells={highlightIncorrectCells}
                showCandidates={showCandidates}
                nextPossibleAnswers={nextPossibleAnswers}
                isInGameMode={isInGameMode}
                showAnswers={showAnswers}
            />

            <History
                history={history}
                jumpToStepInHistory={jumpToStepInHistory}
                currentStep={stepNumber}
                heading="Game History"
            />
        </div>
    );
}

export default App;
