import { useState, useEffect, useRef } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
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
    handleCandidateButtonClick: (activeCellValue: number | number[] | null, e: React.ChangeEvent<HTMLInputElement>) => void;
    hideNumberPad: () => void;
    isInGameMode: boolean;
    isNumberPadActive: boolean;
    activeCellValue: number | number[] | null;
    completedGridCellValue: number | number[] | null;
    activeCellCoords: null | [number, number];
    canCellBeSolved: (row: number, col: number) => boolean;
}

const NumberPad = (props: NumberPadProps) => {

    const {cellClicked, handleNumberPadButtonClick, handleCandidateButtonClick, hideNumberPad, isInGameMode, isNumberPadActive, activeCellValue, completedGridCellValue, activeCellCoords, canCellBeSolved} = props;

    const [numberPadStyle, setNumberPadStyle] = useState<PositionStylesObj>({
        top: '-9999px',
        bottom: 'auto',
        left: '-9999px',
        right:'auto'
    });

    const [manageCandidatesMode, setManageCandidatesMode] = useState(false);

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

    function createCandidateButtons() {
        const toggleButtons = [];

        function hasCandidate(i: number) {
            if (activeCellValue !== null && typeof activeCellValue !== 'number') {
                return activeCellValue.includes(i);
            }
        }
    
        for (let i = 1; i < 10; i++) {
            toggleButtons.push(
                <ButtonGroup toggle key={`candidate-button-${i}`}>
                    <ToggleButton
                        type="checkbox"
                        value={i}
                        checked={hasCandidate(i)}
                        onChange={(e) => {handleCandidateButtonClick(activeCellValue, e)}}
                    >
                        {i}
                    </ToggleButton>
                </ButtonGroup>
            );
        }
    
        return toggleButtons;
    }

    function ClearButton() {
        const buttonElem = (<button
            type="button"
            value=""
            className="clear-button"
            onClick={handleNumberPadButtonClick}
        >Clear</button>);

        if (activeCellValue !== null) {
            if (typeof activeCellValue === 'number' && activeCellValue !== completedGridCellValue) {
                return buttonElem;
            } else if (Array.isArray(activeCellValue)
                && typeof completedGridCellValue === 'number'
                && !activeCellValue.includes(completedGridCellValue)
            ){
                return buttonElem;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    function SolveButton() {
        if (activeCellCoords !== null && canCellBeSolved(activeCellCoords[0], activeCellCoords[1])) {
            return (
                <button
                    type="button"
                    value=""
                    className="solve-button"
                    onClick={handleNumberPadButtonClick}
                >Solve</button>
            );
        } else {
            return null;
        }
    }

    function EditCandidatesCheckbox() {
        if (isInGameMode === true) {
            return (
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="manage-candidates-mode"
                        name="manage-candidates-mode"
                        checked={manageCandidatesMode}
                        onChange={(e) => {
                            setManageCandidatesMode(e.target.checked);
                        }}
                    />
                    <label htmlFor="manage-candidates-mode" className="form-check-label">
                        Edit Candidates
                    </label>
                </div>
            );
        } else {
            return null;
        }
    }
        
    return (
        <div
            className={isNumberPadActive ? 'number-pad active' : 'number-pad'}
            style={numberPadStyle}
            ref={numberPadRef}
        >
            { manageCandidatesMode === false ? createNumberButtons() : createCandidateButtons() }
            <ClearButton />
            <SolveButton />
            <EditCandidatesCheckbox />
        </div>
    );

};

export default NumberPad;