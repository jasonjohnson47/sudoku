import React, { useState, useRef } from 'react';
import Cell from './Cell';
import NumberPad from './NumberPad';
import './Grid.css';

function Grid(props) {

    const ref = useRef(null);

    const gridValues = props.values;

    const [cellClicked, setCellClicked] = useState(null);
    const [activeCell, setActiveCell] = useState(null);

    function handleKeyDown(coords, e) {
        const newValues = [...gridValues];
        const singleIntRegEx = RegExp('[1-9]');

        if (e.key === 'Backspace' || e.key === 'Delete') {
            newValues[activeCell[0]][activeCell[1]] = [];
        } else {
            if (singleIntRegEx.test(e.target.value)) {
                newValues[activeCell[0]][activeCell[1]] = Number(e.target.value);
            } else {
                e.preventDefault();
            }
        }
        props.onValueChange(newValues);
        ref.current.hideNumberPad();
    }

    function handleChange(coords, e) {
        const newValues = [...gridValues];
        newValues[activeCell[0]][activeCell[1]] = Number(e.target.value);
        props.onValueChange(newValues);
        ref.current.hideNumberPad();
    }

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
        
        if (e.target.className === 'clear-button') {
            newValues[activeCell[0]][activeCell[1]] = [];
        } else if (e.target.className === 'solve-button') {
            newValues[activeCell[0]][activeCell[1]] = props.completedGrid[activeCell[0]][activeCell[1]];
        } else {
            newValues[activeCell[0]][activeCell[1]] = Number(e.target.value);
        }
        props.onValueChange(newValues);
        ref.current.hideNumberPad();
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
                row={i}
                column={j}
                key={`r${i}c${j}`}
                value={gridValues[i][j]}
                handleChange={handleChange}
                handleClick={handleCellClick}
                handleKeyDown={handleKeyDown}
                isGiven={Number.isInteger(props.givens[i][j])}
                canBeSolved={Number.isInteger(props.nextPossibleAnswers[i][j])}
            />
        );
    }

    return (
        <div className="grid-wrapper">
            <div id="grid" className={ props.showCandidates === true ? 'show-candidates' : 'hide-candidates' }>
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