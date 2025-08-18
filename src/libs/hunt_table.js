export const treasure_table = [
    [
        '1',
        '4',
        '7',
        '2',
        '5',
        '8',
        '0',
        '3',
        '6',
        '9',
        '3'
    ],
    [
        '0',
        '3',
        '6',
        '9',
        '1',
        '4',
        '7',
        '2',
        '8',
        '5',
        '0'
    ],
    [
        '1',
        '4',
        '7',
        '0',
        '3',
        '6',
        '9',
        '1',
        '7',
        '4',
        '9'
    ],
    [
        '2',
        '5',
        '8',
        '1',
        '0',
        '3',
        '6',
        '9',
        '2',
        '5',
        '8'
    ],
    [
        '0',
        '3',
        '6',
        '9',
        '3',
        '2',
        '8',
        '8',
        '1',
        '4',
        '7'
    ],
    [
        '0',
        '3',
        '6',
        '9',
        '2',
        '5',
        '8',
        '0',
        '3',
        '6',
        '9'
    ],
    [
        '1',
        '4',
        '7',
        '0',
        '3',
        '6',
        '8',
        '9',
        '2',
        '5',
        '8'
    ],
    [
        '2',
        '5',
        '8',
        '1',
        '0',
        '3',
        '6',
        '9',
        '1',
        '4',
        '7'
    ],
    [
        '1',
        '4',
        '7',
        '2',
        '5',
        '8',
        '1',
        '4',
        '7',
        '0',
        '3'
    ],
    [
        '0',
        '3',
        '6',
        '9',
        '0',
        '3',
        '6',
        '9',
        '2',
        '5',
        '8'
    ],
    [
        '1',
        '3',
        '7',
        '1',
        '3',
        '5',
        '8',
        '9',
        '7',
        '5',
        '3'
    ]
];

export function huntTable(last, before, current, currentShi) {
    return renderTreasureTable(chkBall(last), chkBall(before), chkBall(current), chkBall(currentShi));
}

function chkBall(ball) {
    //设置结果矩阵
    let chkResult = new Array(treasure_table.length);
    for (let i = 0; i < treasure_table.length; i++) {
        chkResult[i] = [];
        for (let j = 0; j < treasure_table[i].length; j++) {
            chkResult[i][j] = false;
        }
    }
    if (ball) {
        for (let i = 0; i < treasure_table.length; i++) {
            let row = treasure_table[i];
            for (let j = 0; j < row.length; j++) {
                let element = treasure_table[i][j];
                position(ball, element, i, j, chkResult);
            }
        }
    }
    return chkResult;
}

function position(ball, element, row, column, table) {
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
        xie: false
    });
    if (sRowMinus >= 0) {
        shiPos.push({
            x: sRowMinus,
            y: column,
            xie: false
        });
        if (sColMinus >= 0) {
            shiPos.push({
                x: sRowMinus,
                y: sColMinus,
                xie: true,
            });
        }
        if (sColPlus <= 10) {
            shiPos.push({
                x: sRowMinus,
                y: sColPlus,
                xie: true,
            });
        }
    }
    if (sRowPlus <= 10) {
        shiPos.push({
            x: sRowPlus,
            y: column,
            xie: false
        });
        if (sColMinus >= 0) {
            shiPos.push({
                x: sRowPlus,
                y: sColMinus,
                xie: true
            });
        }
        if (sColPlus <= 10) {
            shiPos.push({
                x: sRowPlus,
                y: sColPlus,
                xie: true
            });
        }
    }
    if (sColMinus >= 0) {
        shiPos.push({
            x: row,
            y: sColMinus,
            xie: false
        });
    }
    if (sColPlus <= 10) {
        shiPos.push({
            x: row,
            y: sColPlus,
            xie: false
        });
    }
    let shis = [];
    for (let i = 0; i < shiPos.length; i++) {
        const pos = shiPos[i];
        if (ball[1] === treasure_table[pos.x][pos.y]) {
            let result    = {};
            result.value  = treasure_table[pos.x][pos.y];
            result.row    = pos.x;
            result.column = pos.y;
            result.xie    = pos.xie;
            shis.push(result);
        }
    }
    if (shis.length === 0) {
        return;
    }
    //个位查找
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
            xie: false
        });
        if (gRowMinus >= 0) {
            gPos.push({
                x: gRowMinus,
                y: shi.column,
                xie: false
            });
            if (gColMinus >= 0) {
                gPos.push({
                    x: gRowMinus,
                    y: gColMinus,
                    xie: true
                });
            }
            if (gColPlus <= 10) {
                gPos.push({
                    x: gRowMinus,
                    y: gColPlus,
                    xie: true
                });
            }
        }
        if (gRowPlus <= 10) {
            gPos.push({
                x: gRowPlus,
                y: shi.column,
                xie: false
            });
            if (gColMinus >= 0) {
                gPos.push({
                    x: gRowPlus,
                    y: gColMinus,
                    xie: true
                });
            }
            if (gColPlus <= 10) {
                gPos.push({
                    x: gRowPlus,
                    y: gColPlus,
                    xie: true
                });
            }
        }
        if (gColMinus >= 0) {
            gPos.push({
                x: shi.row,
                y: gColMinus,
                xie: false
            });
        }
        if (gColPlus <= 12) {
            gPos.push({
                x: shi.row,
                y: gColPlus,
                xie: false
            });
        }
        for (let j = 0; j < gPos.length; j++) {
            const pos = gPos[j];
            if (ball[2] === treasure_table[pos.x][pos.y]) {
                table[row][column]         = true;
                table[shi.row][shi.column] = true;
                table[pos.x][pos.y]        = true;
            }
        }
    }
}

function renderTreasureTable(lastTable, beforeTable, currentTable, currentShiTable) {
    let fastTable = [];
    for (let i = 0; i < treasure_table.length; i++) {
        let rows = [];
        for (let j = 0; j < treasure_table[i].length; j++) {
            let last       = lastTable[i][j];
            let before     = beforeTable[i][j];
            let current    = currentTable[i][j];
            let currentShi = currentShiTable[i][j];
            let data       = {};
            data.key       = treasure_table[i][j];
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
        fastTable.push(rows);
    }
    return fastTable;
}