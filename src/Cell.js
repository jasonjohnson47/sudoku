import React from 'react';

function Cell(props) {

    const {row, column, value} = props;

    return (
        <div id={`r${row}c${column}`} className={`cell cell-row-${row} cell-column-${column}`}>
            <input
                type="text"
                maxLength="1"
                pattern="[1-9]"
                value={value}
                onChange={(e) => props.handleChange([row, column], e)}
                onClick={(e) => props.handleClick([row, column], e)}
            />
        </div>
    );
}

export default Cell;