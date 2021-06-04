import React, { useState } from 'react';
import Cell from './Cell';
import NumberPad from './NumberPad';
import {setCandidates, findDuplicatesInSharedUnits} from './logic';
import _ from 'lodash';
import './Grid.css';

type GridArr = (number | number[])[][];

interface GridProps {
    currentGridValues: GridArr;
    currentGridNoIncorrect: GridArr;
    completedGrid: GridArr; /* In a perfect world, would be number[] */
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
    const [activeCellCoords, setActiveCellCoords] = useState<null | [number, number]>(null);

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
        setActiveCellCoords(coords);
        (e.target as HTMLInputElement).select();
    }

    function handleNumberPadButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        const newGridValues = _.cloneDeep(currentGridValues);
        const row = activeCellCoords !== null ? activeCellCoords[0] : null;
        const col = activeCellCoords !== null ? activeCellCoords[1] : null;
        const targetButton = e.target as HTMLButtonElement;
        let isCorrect = false;

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

    function handleCandidateButtonClick(activeCellValue: number | number[] | null, e: React.ChangeEvent<HTMLInputElement>) {

        let newGridValues = _.cloneDeep(currentGridValues);
        const row = activeCellCoords !== null ? activeCellCoords[0] : null;
        const col = activeCellCoords !== null ? activeCellCoords[1] : null;
        const targetButton = e.target as HTMLInputElement;
        const targetButtonValue = Number(targetButton.value);

        if (row !== null && col !== null) {
            const cellValue = newGridValues[row][col];
            const completedGridCellValue = completedGrid[row][col];

            if (Array.isArray(cellValue)) {
                let newCellValue: number[] = [];
                if (cellValue.includes(targetButtonValue)) {
                    newCellValue = cellValue.filter((candidate: number) => candidate !== targetButtonValue);
                } else {
                    newCellValue = [...cellValue, targetButtonValue];
                }
                newGridValues[row][col] = newCellValue;
                
                if (typeof completedGridCellValue === 'number') {
                    const isCorrect = !cellValue.includes(completedGridCellValue);
                    if (isCorrect) {
                        updateGame(setCandidates(newGridValues));
                    } else {
                        updateGame(newGridValues);
                    }
                }

            }

        }

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

    const duplicatesInSharedUnits = findDuplicatesInSharedUnits(currentGridValues);

    function isValueInSharedUnits(row: number, col: number) {
        return duplicatesInSharedUnits.some(function (cellObj) {
            return cellObj.row === row && cellObj.column === col;
        });
    }

    function checkIfCorrect(row: number, col: number) {

        const cellValue = currentGridValues[row][col];
        const completedGridCellValue = completedGrid[row][col];

        if (isInGameMode) {
            if (Number.isInteger(cellValue) && cellValue !== completedGridCellValue) {
                return false;
            } else if (Array.isArray(cellValue)
                && typeof completedGridCellValue === 'number'
                && !cellValue.includes(completedGridCellValue)
            ){
                return false;
            } else {
                return true;
            }
        }

        if (!isInGameMode) {
            if (typeof cellValue === 'number' && isValueInSharedUnits(row, col)) {
                return false;
            } else {
                return true;
            }
        }
        
        return true;

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
                isIncorrect={ !checkIfCorrect(i, j) }
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
                handleCandidateButtonClick={handleCandidateButtonClick}
                hideNumberPad={hideNumberPad}
                isInGameMode={isInGameMode}
                isNumberPadActive={isNumberPadActive}
                activeCellValue={ activeCellCoords !== null ? currentGridValues[activeCellCoords[0]][activeCellCoords[1]] : null }
                completedGridCellValue={ activeCellCoords !== null ? completedGrid[activeCellCoords[0]][activeCellCoords[1]] : null }
                activeCellCoords={ activeCellCoords }
                canCellBeSolved={ canCellBeSolved }
            />
        </div>
    );
}

export default Grid;