export const diagrams_table = [
    [
        '1',
        '9',
        '7',
        '5',
        '1',
        '9',
        '7',
        '5',
        '3'
    ],
    [
        '2',
        '0',
        '6',
        '8',
        '4',
        '2',
        '8',
        '6',
        '4'
    ],
    [
        '3',
        '1',
        '9',
        '7',
        '5',
        '1',
        '9',
        '7',
        '5'
    ],
    [
        '4',
        '2',
        '0',
        '8',
        '4',
        '2',
        '0',
        '8',
        '6'
    ],
    [
        '5',
        '3',
        '1',
        '9',
        '5',
        '3',
        '1',
        '9',
        '7'
    ],
    [
        '6',
        '4',
        '2',
        '0',
        '6',
        '4',
        '2',
        '0',
        '8'
    ],
    [
        '7',
        '5',
        '3',
        '1',
        '7',
        '5',
        '3',
        '1',
        '9'
    ],
    [
        '8',
        '6',
        '4',
        '2',
        '8',
        '6',
        '4',
        '2',
        '8'
    ],
    [
        '7',
        '5',
        '1',
        '9',
        '7',
        '5',
        '1',
        '9',
        '7'
    ],
    [
        '6',
        '2',
        '0',
        '8',
        '6',
        '2',
        '0',
        '8',
        '6'
    ],
    [
        '3',
        '1',
        '9',
        '7',
        '3',
        '1',
        '9',
        '7',
        '3'
    ],
    [
        '2',
        '0',
        '8',
        '4',
        '2',
        '0',
        '8',
        '4',
        '2'
    ],
    [
        '1',
        '9',
        '5',
        '3',
        '1',
        '9',
        '5',
        '3',
        '1'
    ],
    [
        '0',
        '6',
        '4',
        '2',
        '0',
        '6',
        '4',
        '2',
        '0'
    ]
];

export function diagramTable(last, before, current, currentShi) {
    return renderDiagramTable(chkBall(last), chkBall(before), chkBall(current), chkBall(currentShi));
}

function chkBall(ball) {
    //设置结果矩阵
    let chkResult = new Array(diagrams_table.length);
    for (let i = 0; i < diagrams_table.length; i++) {
        chkResult[i] = [];
        for (let j = 0; j < diagrams_table[i].length; j++) {
            chkResult[i][j] = false;
        }
    }
    if (ball) {
        for (let i = 0; i < diagrams_table.length; i++) {
            let row = diagrams_table[i];
            for (let j = 0; j < row.length; j++) {
                let element = diagrams_table[i][j];
                position(ball, element, i, j, chkResult);
            }
        }
    }
    return chkResult;
}

let position = (ball, element, row, column, table) => {
    //百位判断
    if (ball[0] !== element) {
        return;
    }
    //十位查找
    let sRowMinus = row - 1;
    let sRowPlus  = row + 1;
    let sColMinus = column - 1;
    let sColPlus  = column + 1;
    let shiPos    = [];
    shiPos.push({
        x: row,
        y: column,
    });
    if (sRowMinus >= 0) {
        shiPos.push({
            x: sRowMinus,
            y: column,
        });
        if (sColMinus >= 0) {
            shiPos.push({
                x: sRowMinus,
                y: sColMinus,
            });
        }
        if (sColPlus <= 8) {
            shiPos.push({
                x: sRowMinus,
                y: sColPlus,
            });
        }
    }
    if (sRowPlus <= 13) {
        shiPos.push({
            x: sRowPlus,
            y: column,
        });
        if (sColMinus >= 0) {
            shiPos.push({
                x: sRowPlus,
                y: sColMinus,
            });
        }
        if (sColPlus <= 8) {
            shiPos.push({
                x: sRowPlus,
                y: sColPlus,
            });
        }
    }
    if (sColMinus >= 0) {
        shiPos.push({
            x: row,
            y: sColMinus,
        });
    }
    if (sColPlus <= 8) {
        shiPos.push({
            x: row,
            y: sColPlus,
        });
    }
    let shis = [];
    for (let i = 0; i < shiPos.length; i++) {
        const pos = shiPos[i];
        if (ball[1] === diagrams_table[pos.x][pos.y]) {
            let result    = {};
            result.value  = diagrams_table[pos.x][pos.y];
            result.row    = pos.x;
            result.column = pos.y;
            result.idx    = 'shi';
            shis.push(result);
        }
        if (ball[2] === diagrams_table[pos.x][pos.y]) {
            let result    = {};
            result.value  = diagrams_table[pos.x][pos.y];
            result.row    = pos.x;
            result.column = pos.y;
            result.idx    = 'ge';
            shis.push(result);
        }
    }
    if (shis.length === 0) {
        return;
    }
    if (shis.filter(e => e.idx === 'shi').length > 0 && shis.filter(e => e.idx === 'ge').length > 0) {
        table[row][column] = true;
        for (let i = 0; i < shis.length; i++) {
            let shi                    = shis[i];
            table[shi.row][shi.column] = table[shi.row][shi.column] || shi.idx === 'shi';
            table[shi.row][shi.column] = table[shi.row][shi.column] || shi.idx === 'ge';
        }
    }
    //个位查找
    let filter = shis.filter(e => e.idx === 'shi');
    if (filter.length > 0) {
        calcPosition(filter, (pos, shi) => {
            if (ball[2] === diagrams_table[pos.x][pos.y]) {
                table[row][column]         = true;
                table[shi.row][shi.column] = true;
                table[pos.x][pos.y]        = true;
            }
        });
    }
    filter = shis.filter(e => e.idx === 'ge');
    if (filter.length > 0) {
        calcPosition(filter, (pos, shi) => {
            if (ball[1] === diagrams_table[pos.x][pos.y]) {
                table[row][column]         = true;
                table[shi.row][shi.column] = true;
                table[pos.x][pos.y]        = true;
            }
        });
    }
};

let calcPosition = (shis, callback) => {
    for (let i = 0; i < shis.length; i++) {
        let shi       = shis[i];
        let gRowMinus = shi.row - 1;
        let gRowPlus  = shi.row + 1;
        let gColMinus = shi.column - 1;
        let gColPlus  = shi.column + 1;
        let gPos      = [];
        gPos.push({
            x: shi.row,
            y: shi.column,
        });
        if (gRowMinus >= 0) {
            gPos.push({
                x: gRowMinus,
                y: shi.column,
            });
            if (gColMinus >= 0) {
                gPos.push({
                    x: gRowMinus,
                    y: gColMinus,
                });
            }
            if (gColPlus <= 8) {
                gPos.push({
                    x: gRowMinus,
                    y: gColPlus,
                });
            }
        }
        if (gRowPlus <= 13) {
            gPos.push({
                x: gRowPlus,
                y: shi.column,
            });
            if (gColMinus >= 0) {
                gPos.push({
                    x: gRowPlus,
                    y: gColMinus,
                });
            }
            if (gColPlus <= 8) {
                gPos.push({
                    x: gRowPlus,
                    y: gColPlus,
                });
            }
        }
        if (gColMinus >= 0) {
            gPos.push({
                x: shi.row,
                y: gColMinus,
            });
        }
        if (gColPlus <= 8) {
            gPos.push({
                x: shi.row,
                y: gColPlus,
            });
        }
        for (let j = 0; j < gPos.length; j++) {
            const pos = gPos[j];
            callback(pos, shi);
        }
    }
}

function renderDiagramTable(lastTable, beforeTable, currentTable, currentShiTable) {
    let diagramTable = [];
    for (let i = 0; i < diagrams_table.length; i++) {
        let rows = [];
        for (let j = 0; j < diagrams_table[i].length; j++) {
            let last       = lastTable[i][j];
            let before     = beforeTable[i][j];
            let current    = currentTable[i][j];
            let currentShi = currentShiTable[i][j];
            let data       = {};
            data.key       = diagrams_table[i][j];
            if (current) {
                data.value = 4;
            } else if (last) {
                data.value = 3;
            } else if (before) {
                data.value = 2;
            } else if (currentShi) {
                data.value = 1;
            } else {
                data.value = 0;
            }
            rows.push(data);
        }
        diagramTable.push(rows);
    }
    return diagramTable;
}