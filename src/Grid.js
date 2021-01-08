import React, { useState, useRef } from 'react';
import Cell from './Cell';
import NumberPad from './NumberPad';
import './Grid.css';

function Grid(props) {

    const ref = useRef(null);
    const {values, completedGrid, onValueChange, givens, nextPossibleAnswers, showCandidates, highlightGivens, highlightSolvableCells, highlightIncorrectCells} = props;
    const gridValues = values;
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
        const newValues = [...gridValues];
        const row = activeCell[0];
        const col = activeCell[1];
        
        if (e.target.className === 'clear-button') {
            newValues[row][col] = [];
        } else if (e.target.className === 'solve-button') {
            newValues[row][col] = completedGrid[row][col];
        } else {
            newValues[row][col] = Number(e.target.value);
        }
        onValueChange(newValues);
        ref.current.hideNumberPad();
    }

    function handleKeyDown(coords, e) {
        const newValues = [...gridValues];
        const row = coords[0];
        const col = coords[1];

        if (e.key === 'Backspace' || e.key === 'Delete') {
            newValues[row][col] = [];
        } else if (RegExp('[1-9]').test(e.key)) {
            newValues[row][col] = Number(e.key);
        } else {
            e.preventDefault();
        }
        onValueChange(newValues);
        ref.current.hideNumberPad();
    }

    function handleChange(coords, e) {
        // This isn't needed? But without 'onChange' on the Cell input React throws a warning in the console
        /*const newValues = [...gridValues];
        const row = coords[0];
        const col = coords[1];
        newValues[row][col] = Number(e.target.value);
        onValueChange(newValues);
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
                value={gridValues[i][j]}
                handleChange={handleChange}
                handleClick={handleCellClick}
                handleKeyDown={handleKeyDown}
                isGiven={Number.isInteger(givens[i][j])}
                canBeSolved={Number.isInteger(nextPossibleAnswers[i][j])}
                isIncorrect={ props.isInGameMode && (Number.isInteger(gridValues[i][j]) && gridValues[i][j] !== completedGrid[i][j]) }
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