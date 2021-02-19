import { useState, useEffect, useRef } from 'react';
import './NumberPad.css';

interface PositionStylesObj {
    top: number | string;
    bottom: number | string;
    left: number | string;
    right: number | string;
}

function getNumberPadPosition(activeCell: HTMLDivElement, numberPad: HTMLDivElement): PositionStylesObj {
    const grid = document.getElementById('grid')!;
    const gridRect = grid !== null ? grid.getBoundingClientRect() : {x: 0, y: 0, width: 454, height: 454, top: 0, bottom: 454, left:0, right: 454};
    const gridTop = gridRect.top + document.body.scrollTop;
    const cellBottom = activeCell.offsetHeight + activeCell.offsetTop + gridTop;
    const numberPadBottom = cellBottom + numberPad.offsetHeight;
    const numberPadWidth = numberPad.offsetWidth;
    const numberPadLeft = activeCell.offsetLeft + (activeCell.offsetWidth/2) - numberPadWidth/2;
    const numberPadRight = numberPadLeft + numberPadWidth;
    const windowHeight = document.documentElement.clientHeight;
    const windowWidth = document.documentElement.clientWidth;

    const positionStyles: PositionStylesObj = {
        top: activeCell ? activeCell.offsetTop + activeCell.offsetHeight : 0,
        bottom: 'auto',
        left: activeCell ? activeCell.offsetLeft + (activeCell.offsetWidth/2) - numberPadWidth/2 : 0,
        right: 'auto'
    };

    if (numberPadBottom > windowHeight) {
        // bottom of number pad would go offscreen bottom
        positionStyles.top = 'auto';
        positionStyles.bottom = grid.offsetHeight - activeCell.offsetTop;
    }

    if (numberPadLeft < 0) {
        // left of number pad would go offscreen left
        positionStyles.left = 0;
    }

    if (numberPadRight > windowWidth) {
        // right of number pad would go offscreen right
        positionStyles.left = 'auto';
        positionStyles.right = 0;
    }

    return positionStyles;
    
}

interface NumberPadProps {
    cellClicked: HTMLInputElement | null;
    handleNumberPadButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    hideNumberPad: () => void;
    isNumberPadActive: boolean;
}

const NumberPad = (props: NumberPadProps) => {

    const {cellClicked, handleNumberPadButtonClick, hideNumberPad, isNumberPadActive} = props;

    const [numberPadStyle, setNumberPadStyle] = useState<PositionStylesObj>({
        top: '-9999px',
        bottom: 'auto',
        left: '-9999px',
        right:'auto'
    });

    const activeCell: HTMLDivElement | null = cellClicked ? cellClicked.parentElement as HTMLDivElement : null;
    const numberPadRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const grid = document.getElementById('grid')!;
        const numberPadDiv = numberPadRef.current as HTMLDivElement;

        const handleClick = (e: MouseEvent) => {
            const buttonTarget = e.target as HTMLButtonElement;
            if (numberPadDiv.contains(buttonTarget) || grid.contains(buttonTarget)) {
                // inside click
                return;
            }
            // outside click
            hideNumberPad();
        };
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                hideNumberPad();
            }
        };

        if (isNumberPadActive && activeCell !== null) {
            setNumberPadStyle(getNumberPadPosition(activeCell, numberPadDiv));
        } else {
            setNumberPadStyle({
                top: '-9999px',
                bottom: 'auto',
                left: '-9999px',
                right:'auto'
            });
        }

        // add event listener for outside click when mounted
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keyup', handleEscapeKey);

        // return functions to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keyup', handleEscapeKey);
        };

    }, [isNumberPadActive, hideNumberPad, activeCell]);

    function createNumberButtons() {
        const numberButtons = [];
    
        for (let i = 1; i < 10; i++) {
            numberButtons.push(<button type="button" value={i} key={`numpad-${i}`} onClick={handleNumberPadButtonClick}>{i}</button>);
        }
    
        return numberButtons;
    }

    function clearButton() {
        if (activeCell !== null) {
            const activeCellInput = activeCell.querySelector('input')!;
            if (activeCellInput.value !== '') {
                return (
                    <button
                        type="button"
                        value=""
                        className="clear-button"
                        onClick={handleNumberPadButtonClick}
                    >Clear</button>
                );
            }
        }
    }

    function solveButton() {
        if (activeCell !== null && activeCell.classList.contains('can-be-solved')) {
            return (
                <button
                    type="button"
                    value=""
                    className="solve-button"
                    onClick={handleNumberPadButtonClick}
                >Solve</button>
            );
        }
    }
        
    return (
        <div
            className={isNumberPadActive ? 'number-pad active' : 'number-pad'}
            style={numberPadStyle}
            ref={numberPadRef}
        >
            {createNumberButtons()}
            {clearButton()}
            {solveButton()}
        </div>
    );

};

export default NumberPad;