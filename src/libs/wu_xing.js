export const wu_xing_table = [
    [
        '3',
        '8',
        '6',
        '3',
        '2',
        '8',
        '6',
        '8',
        '9',
        '2',
        '9'
    ],
    [
        '5',
        '4',
        '7',
        '4',
        '9',
        '6',
        '1',
        '6',
        '4',
        '1',
        '0'
    ],
    [
        '3',
        '1',
        '8',
        '1',
        '0',
        '5',
        '9',
        '9',
        '8',
        '7',
        '9'
    ],
    [
        '2',
        '6',
        '5',
        '5',
        '3',
        '8',
        '7',
        '5',
        '0',
        '3',
        '7'
    ],
    [
        '5',
        '6',
        '4',
        '9',
        '2',
        '8',
        '4',
        '1',
        '6',
        '7',
        '6'
    ],
    [
        '8',
        '1',
        '0',
        '1',
        '0',
        '6',
        '0',
        '5',
        '5',
        '7',
        '2'
    ],
    [
        '9',
        '7',
        '3',
        '2',
        '8',
        '4',
        '3',
        '4',
        '3',
        '6',
        '1'
    ],
    [
        '1',
        '5',
        '0',
        '6',
        '7',
        '9',
        '1',
        '2',
        '9',
        '7',
        '2'
    ],
    [
        '1',
        '9',
        '4',
        '6',
        '0',
        '1',
        '2',
        '3',
        '6',
        '9',
        '5'
    ],
    [
        '2',
        '7',
        '8',
        '1',
        '2',
        '7',
        '3',
        '0',
        '9',
        '6',
        '4'
    ],
    [
        '6',
        '0',
        '1',
        '0',
        '1',
        '2',
        '5',
        '7',
        '1',
        '0',
        '8'
    ],
];

export function wuXing(last, before, current, currentShi) {
    return renderWuXingTable(chkBall(last), chkBall(before), chkBall(current), chkBall(currentShi));
}

function chkBall(ball) {
    //设置结果矩阵
    let chkResult = new Array(wu_xing_table.length);
    for (let i = 0; i < wu_xing_table.length; i++) {
        chkResult[i] = [];
        for (let j = 0; j < wu_xing_table[i].length; j++) {
            chkResult[i][j] = false;
        }
    }
    if (ball) {
        for (let i = 0; i < wu_xing_table.length; i++) {
            let row = wu_xing_table[i];
            for (let j = 0; j < row.length; j++) {
                let element = wu_xing_table[i][j];
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
        if (sColPlus <= 10) {
            shiPos.push({
                x: sRowMinus,
                y: sColPlus,
            });
        }
    }
    if (sRowPlus <= 10) {
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
        if (sColPlus <= 10) {
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
    if (sColPlus <= 10) {
        shiPos.push({
            x: row,
            y: sColPlus,
        });
    }
    let shis = [];
    for (let i = 0; i < shiPos.length; i++) {
        const pos = shiPos[i];
        if (ball[1] === wu_xing_table[pos.x][pos.y]) {
            let result    = {};
            result.value  = wu_xing_table[pos.x][pos.y];
            result.row    = pos.x;
            result.column = pos.y;
            result.idx    = 'shi';
            shis.push(result);
        }
        if (ball[2] === wu_xing_table[pos.x][pos.y]) {
            let result    = {};
            result.value  = wu_xing_table[pos.x][pos.y];
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
            if (ball[2] === wu_xing_table[pos.x][pos.y]) {
                table[row][column]         = true;
                table[shi.row][shi.column] = true;
                table[pos.x][pos.y]        = true;
            }
        });
    }
    filter = shis.filter(e => e.idx === 'ge');
    if (filter.length > 0) {
        calcPosition(filter, (pos, shi) => {
            if (ball[1] === wu_xing_table[pos.x][pos.y]) {
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
            if (gColPlus <= 10) {
                gPos.push({
                    x: gRowMinus,
                    y: gColPlus,
                });
            }
        }
        if (gRowPlus <= 10) {
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
            if (gColPlus <= 10) {
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
        if (gColPlus <= 10) {
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

function renderWuXingTable(lastTable, beforeTable, currentTable, currentShiTable) {
    let fastTable = [];
    for (let i = 0; i < wu_xing_table.length; i++) {
        let rows = [];
        for (let j = 0; j < wu_xing_table[i].length; j++) {
            let last       = lastTable[i][j];
            let before     = beforeTable[i][j];
            let current    = currentTable[i][j];
            let currentShi = currentShiTable[i][j];
            let data       = {};
            data.key       = wu_xing_table[i][j];
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