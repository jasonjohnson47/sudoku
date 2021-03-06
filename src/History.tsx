import './History.css';

type GridArr = (number | number[])[][];

interface HistoryObj {
    grid: GridArr;
}

interface HistoryProps {
    history: HistoryObj[];
    jumpToStepInHistory: (step:number) => void;
    currentStep: number;
    heading: string;
}

function History(props: HistoryProps) {

    const {history, jumpToStepInHistory, currentStep, heading} = props;

    const historyLength = history.length;

    // Previous Button
    const previousButtonAttrs = {
        onClick: () => jumpToStepInHistory(currentStep - 1),
        disabled: false,
        className: 'btn btn-primary'
    }
    if (currentStep === 0) {
        previousButtonAttrs.disabled = true;
    }

    // Next Button
    const nextButtonAttrs = {
        onClick: () => jumpToStepInHistory(currentStep + 1),
        disabled: false,
        className: 'btn btn-primary'
    }
    if (historyLength - 1 === currentStep) {
        nextButtonAttrs.disabled = true;
    }

    function handleCurrentStepClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.currentTarget.select();
    }

    function handleCurrentStepKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.currentTarget.select();
            event.preventDefault();
        }
    }

    function handleCurrentStepChange(event: React.FormEvent<HTMLInputElement>) {
        const value = parseInt(event.currentTarget.value, 10);
        jumpToStepInHistory(value);
    }

    return (
        <div className="history">
            <h2 className="text-center">{heading}</h2>
            <div className="history-nav d-flex justify-content-center">
                <button {...previousButtonAttrs}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-left" className="svg-inline--fa fa-caret-left fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path></svg><span className="sr-only">Previous Step</span></button>
                    <span className="history-current-step">
                        <label htmlFor="current-step" className="sr-only">Current Step</label>
                        <input className="form-control" id="current-step" name="current-step" type="text" value={currentStep} onChange={handleCurrentStepChange} onClick={handleCurrentStepClick} onKeyDown={handleCurrentStepKeyDown} />&nbsp;/&nbsp;{historyLength - 1}
                    </span>
                <button {...nextButtonAttrs}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg><span className="sr-only">Next Step</span></button>
            </div>
        </div>
    );
}

export default History;