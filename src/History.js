import React from 'react';
import './History.css';

function History(props) {

    const steps = props.history.map((currentStep, step) => {
        const desc = step ?
            step :
            'Start';
        return (
            <li key={step}>
                <button
                    onClick={() => props.jumpToStep(step)}
                >
                    {desc}
                </button>
            </li>
        );
    });

    return (
        <div className="history">
            <h2>Game History</h2>
            <ol>
                {steps}
            </ol>
        </div>
    );
}

export default History;