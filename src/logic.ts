import _ from 'lodash';

type UnitArr = (number | number[])[];
type GridArr = UnitArr[];
type UnitTypes = 'row' | 'column' | 'nonet';
type CellCoords = [number, number];

interface CellObj {
    row: number;
    column: number;
    value: number | number[];
}

interface XWingObj {
    axis: 'row' | 'column';
    positions: CellCoords[];
    value: number
}

function getDiffOfCompletedCells(currentGrid: GridArr, nextGrid: GridArr) {
    const result = nextGrid.map(function(row, i) {
        const rowValues = row.map(function(value, j) {
            if (Number.isInteger(value) && currentGrid[i][j] !== value) {
                return value;
            } else {
                return [];
            }
        });
        return rowValues;
    });
    return result;
}

function getGridNextAnswers(grid: GridArr) {
    return solveCells(solveNonets(reduceCandidatesXWing(removeNakeds(initReduceCandidates(grid)))));
}

function getGridAnswers(grid: GridArr) {
    let completedGrid: GridArr = [];
    let solveGridSteps = 0;

    function solveGrid(grid: GridArr) {
        solveGridSteps++;
        if (verifyCompletedGrid(grid) === true) {
            return;
        } else if (solveGridSteps > 81) {
            console.log('Cannot solve sudoku puzzle');
            return;
        } else {
            completedGrid = getGridNextAnswers(grid);
            solveGrid(completedGrid);
        }
    }
    solveGrid(grid);
    return completedGrid;
}

function updateGrid(grid: GridArr, updatedCells: CellObj[]) {
    const updatedGrid = _.cloneDeep(grid);
    updatedCells.forEach(function(cell: CellObj) {
        updatedGrid[cell.row][cell.column] = cell.value;
    });
    return updatedGrid;
}

function generateNonet(grid: GridArr, topLeftCellRow: number, topLeftCellCol: number) {
    let nonet: UnitArr = [];

    for (let i = topLeftCellRow; i < topLeftCellRow + 3; i++) {
        for (let j = topLeftCellCol; j < topLeftCellCol + 3; j++) {
            nonet.push(grid[i][j]);
        }
    }

    return nonet;
}

function getCellValue(grid: GridArr, row: number, column: number) {
    return grid[row][column];
}

function getRowValues(grid: GridArr, row: number) {
    let rowValues: UnitArr = [];
    grid[row].forEach(function(value) {
        rowValues.push(value);
    });
    return rowValues;
}

function getColumnValues(grid: GridArr, column: number) {
    let columnValues: UnitArr = [];
    grid.forEach(function(row) {
        columnValues.push(row[column]);
    });
    return columnValues;
}

function getNonetValues(grid: GridArr, row: number, column: number) {

    // sqr1
    if (row <= 2 && column <= 2) {
        return generateNonet(grid, 0,0);
    }

    // sqr2
    if (row <= 2 && (column >= 3 && column <= 5)) {
        return generateNonet(grid, 0,3);
    }

    // sqr3
    if (row <= 2 && column >= 6) {
        return generateNonet(grid, 0,6);
    }

    // sqr4
    if ((row >= 3 && row <= 5) && column <= 2) {
        return generateNonet(grid, 3,0);
    }

    // sqr5
    if ((row >= 3 && row <= 5) && (column >= 3 && column <= 5)) {
        return generateNonet(grid, 3,3);
    }

    // sqr6
    if ((row >= 3 && row <= 5) && column >= 6) {
        return generateNonet(grid, 3,6);
    }

    // sqr7
    if (row >= 6 && column <= 2) {
        return generateNonet(grid, 6,0);
    }

    // sqr8
    if (row >= 6 && (column >= 3 && column <= 5)) {
        return generateNonet(grid, 6,3);
    }

    // sqr9
    // row >= 6 && column >= 6
    return generateNonet(grid, 6,6);

}

function getNonetRowsCols(rowOrCol: number) {

    // rowOrCol === 0 || rowOrCol === 3 || rowOrCol === 6
    let rowOrCol1 = rowOrCol,
        rowOrCol2 = rowOrCol + 1,
        rowOrCol3 = rowOrCol + 2;

    if (rowOrCol === 1 || rowOrCol === 4 || rowOrCol === 7) {
        rowOrCol1 = rowOrCol - 1;
        rowOrCol2 = rowOrCol;
        rowOrCol3 = rowOrCol + 1;
    }
    if (rowOrCol === 2 || rowOrCol === 5 || rowOrCol === 8) {
        rowOrCol1 = rowOrCol - 2;
        rowOrCol2 = rowOrCol - 1;
        rowOrCol3 = rowOrCol;
    }

    return [rowOrCol1, rowOrCol2, rowOrCol3];
}

function isCellSolved (grid: GridArr, row: number, column: number) {
    if (typeof grid[row][column] === 'number') {
        return true;
    }
}

function isCleanValue(value: number | number[]) {
    // check if the value is an empty array
    if (Array.isArray(value) && value.length === 0) {
        return true;
    } else {
        return false;
    }
}

function crosshatchNonet (grid: GridArr, row: number, column: number) {

    const nonetValues = getNonetValues(grid, row, column);
    const candidates = [1,2,3,4,5,6,7,8,9].filter(function(value) {
        return !(nonetValues.includes(value));
    });
    let newCandidates: number[][] = [];
    const nonetRows = getNonetRowsCols(row);
    const nonetColumns = getNonetRowsCols(column);

    candidates.forEach(function(candidate) {

        const temporaryNonetValues: (number | 'o' | 'x')[] = nonetValues.map(function(value) {
            if (Array.isArray(value)) {
                return "o";
            } else {
                return value;
            }
        });

        temporaryNonetValues.forEach(function(value, index) {
            let nonetRowValues;
            let nonetColumnValues;

            if (index <= 2) {
                nonetRowValues = getRowValues(grid, nonetRows[0]);
            }
            if (index >=3 && index <=5) {
                nonetRowValues = getRowValues(grid, nonetRows[1]);
            }
            // index >= 6
            nonetRowValues = getRowValues(grid, nonetRows[2]);

            if (index === 0 || index === 3 || index === 6) {
                nonetColumnValues = getColumnValues(grid, nonetColumns[0]);
            }
            if (index === 1 || index === 4 || index === 7) {
                nonetColumnValues = getColumnValues(grid, nonetColumns[1]);
            }
            // index === 2 || index === 5 || index === 8
            nonetColumnValues = getColumnValues(grid, nonetColumns[2]);
            

            if (value === 'o') {
                if (nonetRowValues.includes(candidate)) {
                    temporaryNonetValues[index] = 'x';
                }
                if (nonetColumnValues.includes(candidate)) {
                    temporaryNonetValues[index] = 'x';
                }
            }

        });

        let emptyCount = 0;

        temporaryNonetValues.forEach(function(value) {
            if (value === 'o') {
                emptyCount++;
            }
        });

        const gridCell: CellCoords = nonetValuesArrayIndexToGridCell(temporaryNonetValues.indexOf('o'), row, column);

        if (emptyCount === 1) {
            newCandidates.push([gridCell[0], gridCell[1], candidate]);
        }
        
    });

    if (newCandidates.length === 1) {
        return {
            row: newCandidates[0][0],
            column: newCandidates[0][1],
            value: newCandidates[0][2]
        };
    } 

}

function nonetValuesArrayIndexToGridCell(nonetValuesIndex: number, nonetTopLeftSqRow: number, nonetTopLeftSqCol: number): CellCoords {
    let gridCellRow = nonetTopLeftSqRow;
    let gridCellCol = nonetTopLeftSqCol;

    if (nonetValuesIndex === 1) {
        gridCellCol = nonetTopLeftSqCol + 1;
    }
    if (nonetValuesIndex === 2) {
        gridCellCol = nonetTopLeftSqCol + 2;
    }
    if (nonetValuesIndex === 3) {
        gridCellRow = nonetTopLeftSqRow + 1;
    }
    if (nonetValuesIndex === 4) {
        gridCellRow = nonetTopLeftSqRow + 1;
        gridCellCol = nonetTopLeftSqCol + 1;
    }
    if (nonetValuesIndex === 5) {
        gridCellRow = nonetTopLeftSqRow + 1;
        gridCellCol = nonetTopLeftSqCol + 2;
    }
    if (nonetValuesIndex === 6) {
        gridCellRow = nonetTopLeftSqRow + 2;
    }
    if (nonetValuesIndex === 7) {
        gridCellRow = nonetTopLeftSqRow + 2;
        gridCellCol = nonetTopLeftSqCol + 1;
    }
    if (nonetValuesIndex === 8) {
        gridCellRow = nonetTopLeftSqRow + 2;
        gridCellCol = nonetTopLeftSqCol + 2;
    }

    return [gridCellRow, gridCellCol];
}

function solveNonets(grid: GridArr) {
    const solvedCells = [];
    for (let row = 0; row <= 6; row = row + 3) {
        for (let col = 0; col <= 6; col = col + 3) {
            const cell = crosshatchNonet(grid, row, col);
            if (cell !== undefined) {
                solvedCells.push(cell);
            }
        }
    }
    const updatedGrid = updateGrid(grid, solvedCells);

    return setCandidates(updatedGrid);
}

function getCandidates(grid: GridArr, row: number, column: number) {

    const allValues = Array.from(new Set(getNonetValues(grid, row, column).concat(getRowValues(grid, row)).concat(getColumnValues(grid, column)))).filter(function(value) {
        return typeof value === 'number' || (Array.isArray(value) && value.length !== 0);
    });

    let startingCandidates: number | number[];

    if (isCleanValue(grid[row][column])) {
        startingCandidates = [1,2,3,4,5,6,7,8,9];
    } else {
        startingCandidates = grid[row][column];
    }
    
    let candidates: number | number[];

    if (Array.isArray(startingCandidates)) {
        candidates = startingCandidates.filter(function(value) {
            return !(allValues.includes(value));
        })
    } else {
        candidates = startingCandidates;
    }

    return candidates;

}

/*
naked triple
three cells in a block, row, or column having only the same three candidates, or their subset
all other appearances of the same candidates can be eliminated if they are in the same block, row, or column
[[6,8], [4,6], [4,8], ...cells w/candidates...]

naked quad
four cells in a block, row, or column having only the same four candidates, or their subset
all other appearances of the same candidates can be eliminated if they are in the same block, row, or column
[[2,8], [6,8], [2,6,8,9], [6,8,9], ...cells w/candidates...]

*/

function findNakeds(quantity: number, unitValues: UnitArr) {

    let tempUnitValues: UnitArr = unitValues.slice(0);
    let cellsWithSameCandidates = 0;
    let result: number[] = [];

    function findNakedsStep(arrayOfValues: UnitArr) {

        const cellsWithCandidates = arrayOfValues.filter(function(value) {
            return Array.isArray(value);
        });
        let lastGoodValue: number[] = [];
        let cellsToExcludeCount = 0;
        cellsWithSameCandidates = 0;

        result = arrayOfValues.reduce(function(accumulator: number[], currentValue) {

            if (Array.isArray(currentValue)) {

                const combined = Array.from(new Set(accumulator.concat(currentValue)));

                if (combined.length > quantity) {
                    cellsToExcludeCount++;
                    cellsWithSameCandidates = cellsWithCandidates.length - cellsToExcludeCount;
                    return lastGoodValue;
                } else {
                    cellsWithSameCandidates = cellsWithCandidates.length - cellsToExcludeCount;
                    lastGoodValue = combined;
                    return combined;
                }

            } else {
                return accumulator;
            }

        }, []);

    }

    while (tempUnitValues.length > 0) {
        if (cellsWithSameCandidates === quantity && result.length === quantity) {
            return result;
        } else {
            findNakedsStep(tempUnitValues);
            tempUnitValues.shift();
        }
    }

}

interface UnitIndexesObj {
    row?: number;
    column?: number;
}

function removeNakedsFromUnit(nakeds: number[] | undefined, unitValues: UnitArr, unitIndexes: UnitIndexesObj, unitType: UnitTypes) {

    const results: CellObj[] = [];

    if (nakeds) {
        unitValues.forEach(function(cellValue: number | number[], index: number) {
            if (Array.isArray(cellValue)) {
                const differentCandidates = cellValue.filter(function(value) {
                    return !nakeds.includes(value);
                });
                //differentCandidates.filter(candidate => nakeds.includes(candidate));
                if (differentCandidates.length !== 0 && !_.isEqual(differentCandidates, cellValue)) {
                    if (unitType === 'row') {
                        results.push({
                            row: unitIndexes.row as number,
                            column: index,
                            value: differentCandidates
                        });
                    }
                    if (unitType === 'column') {
                        results.push({
                            row: index,
                            column: unitIndexes.column as number,
                            value: differentCandidates
                        });
                    }
                    if (unitType === 'nonet') {
                        const gridCell = nonetValuesArrayIndexToGridCell(index, unitIndexes.row as number, unitIndexes.column as number);
                        results.push({
                            row: gridCell[0],
                            column: gridCell[1],
                            value: differentCandidates
                        });
                    }
                }
            }
        });
    }

    if (results.length !== 0) {
        return results;
    }

}

function removeNakeds(grid: GridArr) {

    const results = [];
    const gridClone = _.cloneDeep(grid);

    gridClone.forEach(function(rowValues, rowIndex) {
        const removeNakeds3 = removeNakedsFromUnit(findNakeds(3, rowValues), rowValues, { 'row': rowIndex }, 'row');
        const removeNakeds4 = removeNakedsFromUnit(findNakeds(4, rowValues), rowValues, { 'row': rowIndex }, 'row');

        if (removeNakeds3 !== undefined) {
            results.push(...removeNakeds3);
            removeNakeds3.forEach(function(updatedCell: CellObj) {
                gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
            });
        }
        if (removeNakeds4 !== undefined) {
            results.push(...removeNakeds4);
            removeNakeds4.forEach(function(updatedCell: CellObj) {
                gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
            });
        }

    });

    gridClone[0].forEach(function(column, columnIndex) {
        const columnValues = getColumnValues(gridClone, columnIndex);
        const removeNakeds3 = removeNakedsFromUnit(findNakeds(3, columnValues), columnValues, { 'column': columnIndex }, 'column');
        const removeNakeds4 = removeNakedsFromUnit(findNakeds(4, columnValues), columnValues, { 'column': columnIndex }, 'column');

        if (removeNakeds3 !== undefined) {
            results.push(...removeNakeds3);
            removeNakeds3.forEach(function(updatedCell: CellObj) {
                gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
            });
        }
        if (removeNakeds4 !== undefined) {
            results.push(...removeNakeds4);
            removeNakeds4.forEach(function(updatedCell: CellObj) {
                gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
            });
        }
    });

    for (let rowIndex = 0; rowIndex <= 6; rowIndex = rowIndex + 3) {
        for (let columnIndex = 0; columnIndex <= 6; columnIndex = columnIndex + 3) {
            const nonetValues = getNonetValues(gridClone, rowIndex, columnIndex);
            const removeNakeds3 = removeNakedsFromUnit(findNakeds(3, nonetValues), nonetValues, { 'row': rowIndex,'column': columnIndex }, 'nonet');
            const removeNakeds4 = removeNakedsFromUnit(findNakeds(4, nonetValues), nonetValues, { 'row': rowIndex, 'column': columnIndex }, 'nonet');

            if (removeNakeds3 !== undefined) {
                results.push(...removeNakeds3);
                removeNakeds3.forEach(function(updatedCell) {
                    gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
                });
            }
            if (removeNakeds4 !== undefined) {
                results.push(...removeNakeds4);
                removeNakeds4.forEach(function(updatedCell: CellObj) {
                    gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
                });
            }
        }
    }

    return updateGrid(grid, results);

}

/*
x-wing
Candidate appears twice in two different rows (or columns), and those appearances are both in the same column (or row). The candidate appears in four cells that form a square or rectangle. The candidate can only appear in two of the four cells. The two positions have to be diagonal opposites forming an X (hence the name). Safe to eliminate the candidate from other appearances in the cross axis. For example, if the candidate appears twice in two different rows, remove the candidate from the cells of the shared columns.
*/

function findXWings(grid: GridArr) {

    let xWings: XWingObj[] = [];

    function examineUnit(unitValues: UnitArr, unitIndex: number, mainAxis: 'row' | 'column') {

        let candidatesExamined: number[] = [];
        let unitResults: XWingObj[] = [];

        unitValues.forEach(function(cellValue: number | number[], cellIndex: number) {
            if (Array.isArray(cellValue)) {
                cellValue.forEach(function(candidateValue) {

                    let count = 0;
                    let candidatePositions: CellCoords[] = [];

                    unitValues.forEach(function(cellValueForComparison, cellIndexForComparison) {
                        if (Array.isArray(cellValueForComparison)) {
                            if (cellIndexForComparison > cellIndex) {
                                if (!candidatesExamined.includes(candidateValue)) {

                                    if (cellValueForComparison.includes(candidateValue)) {
                                        count++;

                                        if (mainAxis === 'row') {
                                            candidatePositions.push([unitIndex, cellIndex]);
                                            candidatePositions.push([unitIndex, cellIndexForComparison]);
                                        }
                                        if (mainAxis === 'column') {
                                            candidatePositions.push([cellIndex, unitIndex]);
                                            candidatePositions.push([cellIndexForComparison, unitIndex]);
                                        }

                                    }
                                }
                            }
                        }
                    });
                    if (count === 1) {
                        unitResults.push({
                            'axis': mainAxis,
                            'positions': candidatePositions,
                            'value': candidateValue
                        });
                    }
                    candidatesExamined.push(candidateValue);
                });
            }
        });

        unitResults.forEach(function(candidateCellPair) {
            // look for same candidate value in the same cross axis units (rows or columns)

            function findOtherCandidatePair(unit: UnitArr, unitIndex: number) {

                // mainAxis === 'row'
                let candidatePairUnitIndex = candidateCellPair.positions[0][0];
                let cellACrossAxisIndex = candidateCellPair.positions[0][1];
                let cellBCrossAxisIndex = candidateCellPair.positions[1][1];

                if (mainAxis === 'column') {
                    candidatePairUnitIndex = candidateCellPair.positions[0][1];
                    cellACrossAxisIndex = candidateCellPair.positions[0][0];
                    cellBCrossAxisIndex = candidateCellPair.positions[1][0];
                }

                let cellAValue = unit[cellACrossAxisIndex];
                let cellBValue = unit[cellBCrossAxisIndex];

                let count = 0;
                let newCandidatePositions: CellCoords[] = [];

                if (unitIndex > candidatePairUnitIndex) {
                    if (Array.isArray(cellAValue) && Array.isArray(cellBValue)) {
                        if (cellAValue.includes(candidateCellPair.value) && cellBValue.includes(candidateCellPair.value)) {

                            unit.forEach(function(cellValue) {
                                if (Array.isArray(cellValue)) {
                                    if (cellValue.includes(candidateCellPair.value)) {
                                        count++;
                                    }
                                }
                            });

                            if (count === 2) {

                                if (mainAxis === 'row') {
                                    newCandidatePositions.push([unitIndex, cellACrossAxisIndex]);
                                    newCandidatePositions.push([unitIndex, cellBCrossAxisIndex]);
                                }
                                if (mainAxis === 'column') {
                                    newCandidatePositions.push([cellACrossAxisIndex, unitIndex]);
                                    newCandidatePositions.push([cellBCrossAxisIndex, unitIndex]);
                                }

                                const fourPositionsOfCandidate = candidateCellPair.positions.concat(newCandidatePositions);

                                xWings.push({
                                    'axis': candidateCellPair.axis,
                                    'positions': fourPositionsOfCandidate,
                                    'value': candidateCellPair.value
                                });

                            }

                        }
                    }
                }

            }

            if (mainAxis === 'row') {

                grid.forEach(function(unit, unitIndex) {
                    findOtherCandidatePair(unit, unitIndex);
                });

            }
            if (mainAxis === 'column') {

                grid[0].forEach(function(unit, unitIndex) {
                    const unitValues = getColumnValues(grid, unitIndex);
                    findOtherCandidatePair(unitValues, unitIndex);
                });

            }

        });

    }

    function getColumnValues(grid: GridArr, column: number) {
        let columnValues: UnitArr = [];
        grid.forEach(function(row) {
            columnValues.push(row[column]);
        });
        return columnValues;
    }

    // Check rows
    grid.forEach(function(row, index) {
        examineUnit(row, index, 'row');
    });

    // Check columns
    grid[0].forEach(function(column, index) {
        examineUnit(getColumnValues(grid, index), index, 'column');
    });

    return xWings;

}

function reduceCandidatesXWing(grid: GridArr) {

    const gridClone = _.cloneDeep(grid);
    const xWings = findXWings(gridClone);
    const results: CellObj[] = [];

    xWings.forEach(function(xWing: XWingObj) {

        let xWingRows = xWing.positions.map(function(position) {
            return position[0];
        });
        xWingRows = xWingRows.filter(function(rowPosition, index: number) {
            return xWingRows.indexOf(rowPosition) === index;
        });

        let xWingColumns = xWing.positions.map(function(position) {
            return position[1];
        });
        xWingColumns = xWingColumns.filter(function(columnPosition, index: number) {
            return xWingColumns.indexOf(columnPosition) === index;
        });

        if (xWing.axis === 'column') {

            xWingRows.forEach(function(xWingRow: number) {
                const rowValues = getRowValues(gridClone, xWingRow);
                rowValues.forEach(function(cellValue, index) {
                    if (!xWingColumns.includes(index)) {
                        if (Array.isArray(cellValue)) {
                            const candidatesToRemove = removeCandidateFromCell(gridClone, xWingRow, index, xWing.value);
                            if (candidatesToRemove !== undefined) {
                                results.push(candidatesToRemove);
                                gridClone[candidatesToRemove.row][candidatesToRemove.column] = candidatesToRemove.value;
                            }
                        }
                    }
                });
            });
            
        }

        if (xWing.axis === 'row') {

            xWingColumns.forEach(function(xWingColumn: number) {
                const columnValues = getColumnValues(gridClone, xWingColumn);
                columnValues.forEach(function(cellValue, index) {
                    if (!xWingRows.includes(index)) {
                        if (Array.isArray(cellValue)) {
                            const candidatesToRemove = removeCandidateFromCell(gridClone, index, xWingColumn, xWing.value);
                            if (candidatesToRemove !== undefined) {
                                results.push(candidatesToRemove);
                                gridClone[candidatesToRemove.row][candidatesToRemove.column] = candidatesToRemove.value;
                            }
                        }
                    }
                });
            });
            
        }

    });

    return updateGrid(grid, results);

}

function removeCandidateFromCell(grid: GridArr, row: number, column: number, value: number) {
    const cellValue = getCellValue(grid, row, column);

    if (Array.isArray(cellValue) && cellValue.includes(value)) {
        const cellValueResult = cellValue.filter(function(candidate) {
            return candidate !== value;
        });
        //controller.updateCell(row, column, cellValueResult);
        return {
            row: row,
            column: column,
            value: cellValueResult
        };
    }
}

function initReduceCandidates(grid: GridArr) {
    const results = [];
    const gridClone = _.cloneDeep(grid);

    for (let row = 0; row <= 6; row = row + 3) {
        for (let col = 0; col <= 6; col = col + 3) {
            const reducedCandidatesRow = reduceCandidates(gridClone, row, col, 'row');
            const reducedCandidatesColumn = reduceCandidates(gridClone, row, col, 'column');
            if (reducedCandidatesRow !== undefined) {
                results.push(...reducedCandidatesRow);
                reducedCandidatesRow.forEach(function(updatedCell) {
                    gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
                });
            }
            if (reducedCandidatesColumn !== undefined) {
                results.push(...reducedCandidatesColumn);
                reducedCandidatesColumn.forEach(function(updatedCell) {
                    gridClone[updatedCell.row][updatedCell.column] = updatedCell.value;
                });
            }
        }
    }
    return updateGrid(grid, results);
}

function reduceCandidates(grid: GridArr, row: number, column: number, direction: 'row' | 'column') {

    // row and column = the nonet's top left cell, for example 0,0 and 0,3 and 3,6, etc.
    // if direction = row, main axis = row, cross axis = column
    // if direction = column, main axis = column, cross axis = row

    // If a nonet has candidates that only exist in a row or column within the nonet, remove those candidates from other cells in the same row or column outside the nonet.
    // For example: [6, 8, 3, [1,2], [1,2], 9, 7, 4, 5] <- nonetValues; 1s and 2s in the same row
    // For example: [9, 6, [1,4,5], 7, 3, [1,4,5], [1,5], 2, 8] <- nonetValues; 4s in the same column

    const nonetValues = getNonetValues(grid, row, column);
    const results: CellObj[] = [];

    const nonetMainAxisSet1 = nonetValues.filter(function(value, index) {
        if (direction === 'row') {
            return index <= 2;
        } else {
            // direction === 'column'
            return index === 0 || index === 3 || index === 6;
        }
    }).filter(function(value): value is number[] {
        return Array.isArray(value);
    });

    const nonetMainAxisSet2 = nonetValues.filter(function(value, index) {
        if (direction === 'row') {
            return index >=3 && index <=5;
        } else {
            // direction === 'column'
            return index === 1 || index === 4 || index === 7;
        }
    }).filter(function(value): value is number[] {
        return Array.isArray(value);
    });

    const nonetMainAxisSet3 = nonetValues.filter(function(value, index) {
        if (direction === 'row') {
            return index >= 6;
        } else {
            // direction === 'column'
            return index === 2 || index === 5 || index === 8;
        }
    }).filter(function(value): value is number[] {
        return Array.isArray(value);
    });

    const nonetMainAxisSets = [nonetMainAxisSet1, nonetMainAxisSet2, nonetMainAxisSet3];
    let allCandidatesInCrossAxisSets: number[][] = [];

    nonetMainAxisSets.forEach(function(nonetMainAxisSet) {
        if (nonetMainAxisSet.length === 0) {
            allCandidatesInCrossAxisSets.push([]);
        } else {
            let allCandidatesInMainAxisSet = nonetMainAxisSet.reduce(function(accumulator, current) {
                return accumulator.concat(current);
            }, []);
            allCandidatesInMainAxisSet = Array.from(new Set(allCandidatesInMainAxisSet));
            allCandidatesInCrossAxisSets.push(allCandidatesInMainAxisSet);
        }
    });

    allCandidatesInCrossAxisSets.forEach(function(allCandidatesInMainAxisSet, index) {

        // index === 0
        let otherMainAxisSet1 = index + 1;
        let otherMainAxisSet2 = index + 2;

        if (index === 1) {
            otherMainAxisSet1 = index - 1;
            otherMainAxisSet2 = index + 1;
        }
        if (index === 2) {
            otherMainAxisSet1 = index - 2;
            otherMainAxisSet2 = index - 1;
        }

        const allCandidatesUniqueToMainAxisSet = allCandidatesInMainAxisSet.filter(function(value) {
            const otherNonetMainAxisSetsValues = nonetMainAxisSets[otherMainAxisSet1].concat(nonetMainAxisSets[otherMainAxisSet2]).reduce(function(accumulator, current) {
                return accumulator.concat(current);
            }, []);
            return !otherNonetMainAxisSetsValues.includes(value);
        });

        let gridMainAxisSetIndex: number;
        let gridMainAxisSetValues: UnitArr;
        let indexesToInclude: [number, number, number, number, number, number];

        if (direction === 'row') {
            gridMainAxisSetIndex = row + index;
            gridMainAxisSetValues = getRowValues(grid, gridMainAxisSetIndex);

            if (column === 0) {
                indexesToInclude = [3, 4, 5, 6, 7, 8];
            }
            if (column === 3) {
                indexesToInclude = [0, 1, 2, 6, 7, 8];
            }
            if (column === 6) {
                indexesToInclude = [0, 1, 2, 3, 4, 5];
            }
        } else {
            // direction === 'column'
            gridMainAxisSetIndex = column + index;
            gridMainAxisSetValues = getColumnValues(grid, gridMainAxisSetIndex);

            if (row === 0) {
                indexesToInclude = [3, 4, 5, 6, 7, 8];
            }
            if (row === 3) {
                indexesToInclude = [0, 1, 2, 6, 7, 8];
            }
            if (row === 6) {
                indexesToInclude = [0, 1, 2, 3, 4, 5];
            }
        }

        gridMainAxisSetValues.forEach(function(cellValue, gridCrossAxisSetIndex) {
            if (indexesToInclude.includes(gridCrossAxisSetIndex)) {
                if (Array.isArray(cellValue) && cellValue.length > 1) {
                    const newCandidates = cellValue.filter(function(value) {
                        return !allCandidatesUniqueToMainAxisSet.includes(value);
                    });
                    if (direction === 'row') {
                        if (newCandidates.length < cellValue.length) {
                            results.push({
                                row: gridMainAxisSetIndex,
                                column: gridCrossAxisSetIndex,
                                value: newCandidates
                            });
                        }
                    }
                    if (direction === 'column') {
                        if (newCandidates.length < cellValue.length) {
                            results.push({
                                row: gridCrossAxisSetIndex,
                                column: gridMainAxisSetIndex,
                                value: newCandidates
                            });
                        }
                    }
                    
                }
            }
        });

    });

    if (results.length !== 0) {
        return results;
    }

}

function solveCell(grid: GridArr, row: number, column: number) {

    if (!(isCellSolved(grid, row, column))) {

        const candidates = getCandidates(grid, row, column);
        let newCandidates: number[] = [];

        // if a single candidate works, store that value
        if (Array.isArray(candidates) && candidates.length === 1) {    
            return {
                row: row,
                column: column,
                value: candidates[0]
            };
        }

        const rowArrayValues: UnitArr = getRowValues(grid, row).filter(function(value, index) {
            return index !== column;
        }).filter(function(value) {
            return Array.isArray(value) && value.length !== 0;
        });

        const columnArrayValues: UnitArr = getColumnValues(grid, column).filter(function(value, index) {
            return index !== row;
        }).filter(function(value) {
            return Array.isArray(value) && value.length !== 0;
        });

        if (rowArrayValues.length && Array.isArray(candidates)) {
            // if one of the candidates doesn't exist in any rowArrayValues,
            // add that value to newCandidates array
            candidates.forEach(function(candidate) {
                
                const candidateInSomeArray = rowArrayValues.some(function(arrayValue) {
                    if (Array.isArray(arrayValue)) {
                        return arrayValue.includes(candidate);
                    }
                    else if (arrayValue === candidate) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (candidateInSomeArray) {
                    // do nothing, the candidate exists as a candidate for another cell in the same row
                } else {
                    newCandidates.push(candidate);
                }
                
            });
        }

        if (columnArrayValues.length && Array.isArray(candidates)) {
            // if one of the candidates doesn't exist in any columnArrayValues,
            // add that value to newCandidates array
            candidates.forEach(function(candidate) {
                
                const candidateInSomeArray = columnArrayValues.some(function(arrayValue) {
                    if (Array.isArray(arrayValue)) {
                        return arrayValue.includes(candidate);
                    } else if (arrayValue === candidate) {
                        return true;
                    } else {
                        return false;
                    }
                    
                });

                if (candidateInSomeArray) {
                    // do nothing, the candidate exists as a candidate for another cell in the same column
                } else {
                    newCandidates.push(candidate);
                }
                
            });
        }

        newCandidates = Array.from(new Set(newCandidates));

        if (newCandidates.length === 1) {
            return {
                row: row,
                column: column,
                value: newCandidates[0]
            };
        }
        if (newCandidates.length > 1) {
            return {
                row: row,
                column: column,
                value: newCandidates
            };
        }
        
    } // end if

}

function setCandidates(grid: GridArr) {
    const cellsWithCandidates: CellObj[] = [];
    grid.forEach(function(row, i) {
        row.forEach(function(column, j) {
            if (!(isCellSolved(grid, i, j))) {
                const cellValue = getCandidates(grid, i, j);
                if (cellValue !== undefined) {
                    cellsWithCandidates.push({
                        row: i,
                        column: j,
                        value: cellValue
                    });
                }
            }
        });
    });
    return updateGrid(grid, cellsWithCandidates);
}

function solveCells(grid: GridArr) {
    const solvedCells: CellObj[] = [];
    grid.forEach(function(row, i) {
        row.forEach(function(column, j) {
            if (!(isCellSolved(grid, i, j))) {
                const cell = solveCell(grid, i, j);
                if (cell !== undefined) {
                    solvedCells.push(cell);
                }
            }
        });
    });
    const updatedGrid = updateGrid(grid, solvedCells);

    return setCandidates(updatedGrid);
}

function verifyCompletedGrid(grid: GridArr) {
    const gridColumns: UnitArr[] = [];
    const gridNonets: UnitArr[] = [];

    // Check rows
    const allRowsIncludeAllValues = grid.every(function(row) {
        return row.every(function(value) {
            if (typeof value === 'number') {
                return [1,2,3,4,5,6,7,8,9].includes(value);
            } else {
                return false;
            }
        });
    });

    // Check columns
    grid[0].forEach(function(column, index) {
        gridColumns.push(getColumnValues(grid, index));
    });

    const allColumnsIncludeAllValues = gridColumns.every(function(column) {
        return column.every(function(value) {
            if (typeof value === 'number') {
                return [1,2,3,4,5,6,7,8,9].includes(value);
            } else {
                return false;
            }
        });
    });

    // Check nonets
    for (let row = 0; row <= 6; row = row + 3) {
        for (let col = 0; col <= 6; col = col + 3) {
            gridNonets.push(getNonetValues(grid, row, col));
        }
    }

    const allNonetsIncludeAllValues = gridNonets.every(function(nonet) {
        return nonet.every(function(value) {
            if (typeof value === 'number') {
                return [1,2,3,4,5,6,7,8,9].includes(value);
            } else {
                return false;
            }
        });
    });

    if (allRowsIncludeAllValues && allColumnsIncludeAllValues && allNonetsIncludeAllValues) {
        return true;
    }

}

export { setCandidates, solveCells, solveNonets, removeNakeds, reduceCandidatesXWing, initReduceCandidates, verifyCompletedGrid, getGridNextAnswers, getGridAnswers, getDiffOfCompletedCells };
