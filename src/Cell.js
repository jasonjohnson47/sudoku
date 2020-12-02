import React from 'react';

function Cell(props) {

    const {row, column, value} = props;
    const inputAttrs = {};

    if (Array.isArray(value)) {
        inputAttrs.value = [];
    } else {
        inputAttrs.value = value;
    }

    return (
        <div id={`r${row}c${column}`} className={`cell cell-row-${row} cell-column-${column}`}>
            <input
                type="text"
                maxLength="1"
                pattern="[1-9]"
                onChange={(e) => props.handleChange([row, column], e)}
                onClick={(e) => props.handleClick([row, column], e)}
                {...inputAttrs}
            />
            {Array.isArray(value) && <div className="candidates">{value.join(' ')}</div>}
        </div>
    );
}

export default Cell;