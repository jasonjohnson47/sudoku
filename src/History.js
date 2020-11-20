import React from 'react';
import './History.css';

function History(props) {

    const currentStep = props.currentStep;
    const historyLength = props.history.length;

    // Previous Button
    const previousButtonProps = {
        onClick: () => props.jumpToStepInHistory(currentStep - 1),
        disabled: false
    }
    if (currentStep === 0) {
        previousButtonProps.disabled = true;
    }

    // Next Button
    const nextButtonProps = {
        onClick: () => props.jumpToStepInHistory(currentStep + 1),
        disabled: false
    }
    if (historyLength - 1 === currentStep) {
        nextButtonProps.disabled = true;
    }

    return (
        <div className="history">
            <h2>Game History</h2>
            <div className="history-nav">
                <button {...previousButtonProps}>Previous Step</button>
                <span className="history-current-step">{currentStep}</span>
                <button {...nextButtonProps}>Next Step</button>
            </div>
        </div>
    );
}

export default History;