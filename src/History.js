import React from 'react';

function History(props) {

    const steps = props.history.map((currentStep, step) => {
        const desc = step ?
            'Go to step ' + step :
            'Go to game start';
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
        <ol className="history">
            {steps}
        </ol>
    );
}

export default History;