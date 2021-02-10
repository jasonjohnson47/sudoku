import React, { useState, useRef } from 'react';
import Cell from './Cell';
import NumberPad from './NumberPad';
import {setCandidates} from './logic';
import _ from 'lodash';
import './Grid.css';

function Grid(props) {

    const ref = useRef(null);
    const {currentGridValues, pastGridValues, completedGrid, updateGame, givens, nextPossibleAnswers, showCandidates, highlightGivens, highlightSolvableCells, highlightIncorrectCells} = props;
    const [cellClicked, setCellClicked] = useState(null);
    const [activeCell, setActiveCell] = useState(null);

    function handleCellClick(coords, e) {
        if (cellClicked === e.target) {
            ref.current.isActive ? ref.current.hideNumberPad() : ref.current.showNumberPad();
        } else {
            ref.current.showNumberPad();
        }
        setCellClicked(e.target);
        setActiveCell(coords);
        e.target.select();
    }

    function handleNumberPadButtonClick(e) {
        const newGridValues = _.cloneDeep(currentGridValues);
        const row = activeCell[0];
        const col = activeCell[1];
        
        if (e.target.className === 'clear-button') {
            newGridValues[row][col] = pastGridValues[row][col];
        } else if (e.target.className === 'solve-button') {
            newGridValues[row][col] = completedGrid[row][col];
        } else {
            newGridValues[row][col] = Number(e.target.value);
        }

        const isCorrect = newGridValues[row][col] === completedGrid[row][col];

        if (isCorrect) {
            updateGame(setCandidates(newGridValues));
        } else {
            updateGame(newGridValues);
        }
        
        ref.current.hideNumberPad();
    }

    function handleKeyDown(coords, e) {
        const newGridValues = _.cloneDeep(currentGridValues);
        const row = coords[0];
        const col = coords[1];

        if (e.key === 'Backspace' || e.key === 'Delete') {
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

        ref.current.hideNumberPad();
    }

    function handleChange(coords, e) {
        // This isn't needed? But without 'onChange' on the Cell input React throws a warning in the console
        /*const newGridValues = _.cloneDeep(currentGridValues);
        const row = coords[0];
        const col = coords[1];
        newGridValues[row][col] = Number(e.target.value);
        updateGame(newGridValues);
        ref.current.hideNumberPad();*/
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
    
    function renderCell(i, j) {
        return (
            <Cell
                key={`r${i}c${j}`}
                row={i}
                column={j}
                value={currentGridValues[i][j]}
                handleChange={handleChange}
                handleClick={handleCellClick}
                handleKeyDown={handleKeyDown}
                isGiven={Number.isInteger(givens[i][j])}
                canBeSolved={Number.isInteger(nextPossibleAnswers[i][j])}
                isIncorrect={ props.isInGameMode && (Number.isInteger(currentGridValues[i][j]) && currentGridValues[i][j] !== completedGrid[i][j]) }
            />
        );
    }

    const gridClassName = `grid${showCandidates === false ? ' hide-candidates' : ''}${highlightGivens === true ? ' highlight-givens' : ''}${highlightSolvableCells === true ? ' highlight-solvable-cells' : ''}${highlightIncorrectCells === true ? ' highlight-incorrect-cells' : ''}`;

    return (
        <div className="grid-wrapper">
            <div id="grid" className={gridClassName}>
                {createGrid()}
            </div>
            <NumberPad
                cellClicked={cellClicked}
                handleClick={handleNumberPadButtonClick}
                ref={ref}
            />
        </div>
    );
}

export default Grid;