import './HighlightCellOptions.css';

interface HighlightCellOptionsProps {
    highlightCellValue: string;
    setHighlightCellValue: React.Dispatch<React.SetStateAction<string>>;
}

function HighlightCellOptions(props: HighlightCellOptionsProps) {

    const {highlightCellValue, setHighlightCellValue} = props;

    return (
        <div className="highlight-cell-options">
            <h2 className="text-center">Highlight Cells</h2>
            <div className="form-inline justify-content-center">
                <label htmlFor="highlight-cell-selector" className="mr-2">Show me the: </label>
                <select
                    id="highlight-cell-selector"
                    className="form-control"
                    value={highlightCellValue}
                    onChange={(e) => {
                        setHighlightCellValue(e.target.value);
                    }}
                >
                    <option value="off">Select</option>
                    <option value="1">Ones</option>
                    <option value="2">Twos</option>
                    <option value="3">Threes</option>
                    <option value="4">Fours</option>
                    <option value="5">Fives</option>
                    <option value="6">Sixes</option>
                    <option value="7">Sevens</option>
                    <option value="8">Eights</option>
                    <option value="9">Nines</option>
                </select>
            </div>
        </div>
    );
}

export default HighlightCellOptions;