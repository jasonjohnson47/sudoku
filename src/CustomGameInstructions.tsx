type GridArr = (number | number[])[][];

interface CustomGameInstructionsProps {
    isInGameMode: boolean,
    createNewGame: (initialGrid: GridArr) => void,
    currentGridValues: GridArr
}

function CustomGameInstructions(props: CustomGameInstructionsProps) {
    const {isInGameMode, createNewGame, currentGridValues} = props;
    return (
        <div
            className={
                isInGameMode === true
                    ? 'custom-game-instructions d-none'
                    : 'custom-game-instructions'
            }
        >
            <p>
                Enter your starting numbers ("givens") in the cells to
                create your own game. When you have finished entering all
                the givens, click "Start Game" to start solving the puzzle.
            </p>
            <button
                className="btn btn-primary"
                onClick={() => {
                    createNewGame(currentGridValues);
                }}
            >
                Start Game
            </button>
        </div>
    );
}

export default CustomGameInstructions;