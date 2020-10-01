import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import './NumberPad.css';

function getNumberPadPosition(activeCell, numberPad) {
    const grid = document.getElementById('grid');
    let gridRect = grid.getBoundingClientRect();
    let gridTop = gridRect.top + document.body.scrollTop;
    let cellBottom = activeCell.offsetHeight + activeCell.offsetTop + gridTop;
    let numberPadBottom = cellBottom + numberPad.offsetHeight;
    let numberPadWidth = numberPad.offsetWidth;
    let numberPadLeft = activeCell.offsetLeft + (activeCell.offsetWidth/2) - numberPadWidth/2;
    let numberPadRight = numberPadLeft + numberPadWidth;
    let windowHeight = document.documentElement.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    let positionStyles = {
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

const NumberPad = forwardRef((props, ref) => {

    const [isActive, setIsActive] = useState(false);
    const [numberPadWidth, setNumberPadWidth] = useState(0);
    const [numberPadStyle, setNumberPadStyle] = useState({
        top: '-9999px',
        bottom: 'auto',
        left: '-9999px',
        right:'auto'
    });

    const activeCell = props.cellClicked ? props.cellClicked.parentElement : null;
    const numberPadRef = useRef(null);

    const showNumberPad = () => {
        setIsActive(true);
    }

    const hideNumberPad = () => {
        setIsActive(false);
    }

    useImperativeHandle(ref, () => {
        return {
            showNumberPad: showNumberPad,
            hideNumberPad: hideNumberPad,
            isActive: isActive
        };
    });

    useEffect(() => {

        const grid = document.getElementById('grid');

        const handleClick = e => {
            if (numberPadRef.current.contains(e.target) || grid.contains(e.target)) {
                // inside click
                return;
            }
            // outside click
            hideNumberPad();
        };
        const handleEscapeKey = e => {
            if (e.key === 'Escape') {
                hideNumberPad();
            }
        };

        if (isActive) {
            setNumberPadWidth(numberPadRef.current.offsetWidth);
            setNumberPadStyle(getNumberPadPosition(activeCell, numberPadRef.current));
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

    }, [isActive, numberPadWidth, activeCell]);

    function createNumberButtons() {
        let numberButtons = [];
    
        for (let i = 1; i < 10; i++) {
            numberButtons.push(<button type="button" value={i} key={`numpad-${i}`} onClick={props.handleClick}>{i}</button>);
        }
    
        return numberButtons;
    }

    let clearButton = (
        <button
            type="button"
            value=""
            className="clear-button"
            onClick={props.handleClick}
        >Clear</button>
    );
        
    return (
        <div
            className={isActive ? 'number-pad active' : 'number-pad'}
            style={numberPadStyle}
            ref={numberPadRef}
        >
            {createNumberButtons()}
            { activeCell && activeCell.querySelector('input').value !== '' ? clearButton : null }
        </div>
    );

});

export default NumberPad;