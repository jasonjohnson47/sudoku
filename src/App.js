import React, { useState } from 'react';
import Grid from './Grid';
import History from './History';

function App() {

    const [history, setHistory] = useState([{
        grid: [[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]]]
    }]);
    const [stepNumber, setStepNumber] = useState(0);

    const clone = require('rfdc')();
    const prevHistory = clone(history);
    const addHistory = newHistory => setHistory([...prevHistory, newHistory]);

    function onValueChange(values) {
        addHistory({
            grid: values
        });
        setStepNumber(stepNumber + 1);
    }

    function jumpToStep(step) {
        setStepNumber(step);
    }

    return (
        <div className="App">
            <Grid values={history[stepNumber].grid} onValueChange={onValueChange} />
            <History history={history} jumpToStep={jumpToStep} />
        </div>
    );
}

export default App;
