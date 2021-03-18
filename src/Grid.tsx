import React, { useState } from 'react';
import Cell from './Cell';
import NumberPad from './NumberPad';
import {setCandidates} from './logic';
import _ from 'lodash';
import './Grid.css';

type GridArr = (number | number[])[][];

interface GridProps {
    currentGridValues: GridArr;
    currentGridNoIncorrect: GridArr;
    completedGrid: GridArr;
    updateGame: (updatedGrid: GridArr) => void; 
    givens: GridArr;
    nextPossibleAnswers: GridArr;
    showCandidates: boolean;
    highlightGivens: boolean;
    highlightSolvableCells: boolean;
    highlightIncorrectCells: boolean;
    highlightCellValue: string;
    isInGameMode: boolean;
    showAnswers: boolean;
}

function Grid(props: GridProps) {

    const {currentGridValues, currentGridNoIncorrect, completedGrid, updateGame, givens, nextPossibleAnswers, showCandidates, highlightGivens, highlightSolvableCells, highlightIncorrectCells, highlightCellValue, isInGameMode, showAnswers} = props;
    const [cellClicked, setCellClicked] = useState<null | HTMLInputElement>(null);
    const [activeCell, setActiveCell] = useState<null | [number, number]>(null);

    const [isNumberPadActive, setIsNumberPadActive] = useState(false);
    const showNumberPad = () => {
        setIsNumberPadActive(true);
    }
    const hideNumberPad = () => {
        setIsNumberPadActive(false);
    }

    function handleCellClick(coords: [number, number], e: React.MouseEvent<HTMLInputElement, MouseEvent>) {

        if (cellClicked === e.target) {
            isNumberPadActive ? hideNumberPad() : showNumberPad();
        } else {
            showNumberPad();
        }
        setCellClicked(e.target as HTMLInputElement);
        setActiveCell(coords);
        (e.target as HTMLInputElement).select();
    }

    function handleNumberPadButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        const newGridValues = _.cloneDeep(currentGridValues);
        const row = activeCell !== null ? activeCell[0]: null;
        const col = activeCell !== null ? activeCell[1]: null;
        const targetButton = e.target as HTMLButtonElement;
        let isCorrect: boolean = false;

        if (row !== null && col !== null) {

            if (isInGameMode && (targetButton.className === 'clear-button')) {
                newGridValues[row][col] = setCandidates(currentGridNoIncorrect)[row][col];
            } else if (!isInGameMode && (targetButton.className === 'clear-button')) {
                newGridValues[row][col] = [];
            } else if (targetButton.className === 'solve-button') {
                newGridValues[row][col] = completedGrid[row][col];
            } else {
                newGridValues[row][col] = Number(targetButton.value);
            }
    
            isCorrect = newGridValues[row][col] === completedGrid[row][col];

        }
        
        if (isCorrect) {
            updateGame(setCandidates(newGridValues));
        } else {
            updateGame(newGridValues);
        }

        hideNumberPad();
        
    }

    function handleKeyDown(coords: [number, number], e: React.KeyboardEvent<HTMLInputElement>) {
        const newGridValues = _.cloneDeep(currentGridValues);
        const row = coords[0];
        const col = coords[1];

        if (isInGameMode && (e.key === 'Backspace' || e.key === 'Delete')) {
            newGridValues[row][col] = setCandidates(currentGridNoIncorrect)[row][col];
        } else if (!isInGameMode && (e.key === 'Backspace' || e.key === 'Delete')) {
            newGridValues[row][col] = [];
        } else if (RegExp('[1-9]').test(e.key)) {
            newGridValues[row][col] = Number(e.key);
        } else {
            e.preventDefault();
        }

        const isCorrect = newGridValues[row][col] === completedGrid[row][col];

        if (isCorrect) {
            updateGame(setCandidates(newGridValues));
        } else {
            updateGame(newGridValues);
        }

        hideNumberPad();

    }

    function createGrid() {
        let grid = [];
    
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                grid.push(renderCell(i, j));
            }
        }
    
        return grid;
    }

    function canCellBeSolved(row: number, col: number) {

        const nextPossibleAnswer = nextPossibleAnswers[row][col];

        if (Array.isArray(nextPossibleAnswer) && nextPossibleAnswer.length === 1) {
            return true;
        } else if (Number.isInteger(nextPossibleAnswer)) {
            return true;
        } else {
            return false;
        }

    }
    
    function renderCell(i: number, j: number) {
        return (
            <Cell
                key={`r${i}c${j}`}
                row={i}
                column={j}
                value={ showAnswers === true ? completedGrid[i][j] : currentGridValues[i][j] }
                handleClick={handleCellClick}
                handleKeyDown={handleKeyDown}
                isGiven={ Number.isInteger(givens[i][j]) }
                canBeSolved={ canCellBeSolved(i, j) }
                isIncorrect={ isInGameMode && (Number.isInteger(currentGridValues[i][j]) && currentGridValues[i][j] !== completedGrid[i][j]) }
                hasCandidate={ Array.isArray(currentGridValues[i][j]) && (currentGridValues[i][j] as number[]).includes(parseInt(highlightCellValue, 10)) }
                isInGameMode={isInGameMode}
            />
        );
    }

    const gridClassName = `grid${showCandidates === false ? ' hide-candidates' : ''}${highlightGivens === true ? ' highlight-givens' : ''}${(highlightSolvableCells === true && isInGameMode === true ) ? ' highlight-solvable-cells' : ''}${highlightIncorrectCells === true ? ' highlight-incorrect-cells' : ''}`;

    return (
        <div className="grid-wrapper">
            <div id="grid" className={gridClassName}>
                {createGrid()}
            </div>
            <NumberPad
                cellClicked={cellClicked}
                handleNumberPadButtonClick={handleNumberPadButtonClick}
                hideNumberPad={hideNumberPad}
                isNumberPadActive={isNumberPadActive}
            />
        </div>
    );
}

export default Grid;