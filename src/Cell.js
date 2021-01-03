import React from 'react';

function Cell(props) {

    const {row, column, value, isGiven} = props;
    const inputAttrs = {};
    const cellDivClassName = `cell cell-row-${row} cell-column-${column}${ isGiven === true ? ' given' : '' }`;

    // set 'value' attribute for cell input
    if (Array.isArray(value)) {
        inputAttrs.value = [];
    } else {
        inputAttrs.value = value;
    }

    // set 'disabled' attribute for cell input, if a 'given' number
    if (isGiven === true) {
        inputAttrs.disabled = true;
    }

    const candidates = [1,2,3,4,5,6,7,8,9].map(function(i) {
        if (Array.isArray(value) && value.includes(i)) {
            return <div key={`r${row}c${column}-p${i}`}>{i}</div>
        } else {
            return <div key={`r${row}c${column}-p${i}`}></div>
        }
    });

    return (
        <div id={`r${row}c${column}`} className={cellDivClassName}>
            <input
                type="text"
                maxLength="1"
                pattern="[1-9]"
                onChange={(e) => props.handleChange([row, column], e)}
                onClick={(e) => props.handleClick([row, column], e)}
                onKeyDown={(e) => props.handleKeyDown([row, column], e)}
                {...inputAttrs}
            />
            {Array.isArray(value) && <div className="candidates">{candidates}</div>}
        </div>
    );
}

export default Cell;