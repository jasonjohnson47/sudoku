interface CellProps {
    row: number;
    column: number;
    value: number | number[];
    isGiven: boolean;
    canBeSolved: boolean;
    isIncorrect: boolean;
    handleClick: (coords: [number, number], e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    handleKeyDown: (coords: [number, number], e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Cell(props: CellProps) {

    interface InputAttrsObj {
        value: number | [];
        disabled: boolean;
    }

    const {row, column, value, isGiven, canBeSolved, isIncorrect, handleClick, handleKeyDown} = props;
    const inputAttrs: InputAttrsObj = { value: [], disabled: false };
    const cellDivClassName = `cell cell-row-${row} cell-column-${column}${ isGiven === true ? ' given' : '' }${ canBeSolved === true ? ' can-be-solved' : '' }${ isIncorrect === true ? ' incorrect' : '' }`;

    // set 'value' attribute for cell input
    if (typeof value === 'number') {
        inputAttrs.value = value;
    }

    // set 'disabled' attribute for cell input, if a 'given' number
    if (isGiven === true) {
        inputAttrs.disabled = true;
    }
    if (typeof value === 'number' && !isIncorrect) {
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
                maxLength={1}
                pattern="[1-9]"
                inputMode="none"
                onChange={() => { /* do nothing */ }}
                onClick={(e) => handleClick([row, column], e)}
                onKeyDown={(e) => handleKeyDown([row, column], e)}
                {...inputAttrs}
            />
            {Array.isArray(value) && <div className="candidates">{candidates}</div>}
        </div>
    );
}

export default Cell;