import React from 'react';

function GameSettingsPanel(props) {

    const {
        showCandidates, setShowCandidates,
        highlightGivens, setHighlightGivens,
        highlightSolvableCells, setHighlightSolvableCells,
        highlightIncorrectCells, setHighlightIncorrectCells
    } = props;

    return (
        <div className="game-settings">
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="show-candidates"
                    name="show-candidates"
                    checked={showCandidates}
                    onChange={(e) => {
                        setShowCandidates(e.target.checked);
                    }}
                />
                <label htmlFor="show-candidates" className="form-check-label">
                    Show Candidates
                </label>
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="highlight-givens"
                    name="highlight-givens"
                    checked={highlightGivens}
                    onChange={(e) => {
                        setHighlightGivens(e.target.checked);
                    }}
                />
                <label htmlFor="highlight-givens" className="form-check-label">
                    Highlight Givens
                </label>
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="highlight-solvable"
                    name="highlight-solvable"
                    checked={highlightSolvableCells}
                    onChange={(e) => {
                        setHighlightSolvableCells(e.target.checked);
                    }}
                />
                <label htmlFor="highlight-solvable" className="form-check-label">
                    Highlight Solvable Cells
                </label>
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="highlight-incorrect-cells"
                    name="highlight-incorrect-cells"
                    checked={highlightIncorrectCells}
                    onChange={(e) => {
                        setHighlightIncorrectCells(e.target.checked);
                    }}
                />
                <label htmlFor="highlight-incorrect-cells" className="form-check-label">
                    Highlight Incorrect Cells
                </label>
            </div>
        </div>
    );
}

export default GameSettingsPanel;