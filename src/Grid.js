import React, { useState, useRef } from 'react';
import Cell from './Cell';
import NumberPad from './NumberPad';
import './Grid.css';

function Grid(props) {

    const ref = useRef(null);

    const gridValues = props.values;

    const [cellClicked, setCellClicked] = useState(null);
    const [activeCell, setActiveCell] = useState(null);

    function handleChange(coords, e) {
        const newValues = [...gridValues];
        newValues[activeCell[0]][activeCell[1]] = e.target.value;
        //setValues(newValues);
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
    }

    function handleNumberPadButtonClick(e) {
        const newValues = [...gridValues];
        newValues[activeCell[0]][activeCell[1]] = e.target.value;
        //setValues(newValues);
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
            />
        );
    }

    return (
        <div className="grid-wrapper">
            <div id="grid">
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