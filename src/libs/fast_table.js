//魔图定位表
export const magic_table = [
    [0],
    [
        0,
        1
    ],
    [
        9,
        1,
        2
    ],
    [
        7,
        0,
        2,
        3
    ],
    [
        4,
        8,
        1,
        3,
        4
    ],
    [
        0,
        5,
        9,
        2,
        4,
        5
    ],
    [
        5,
        1,
        6,
        0,
        3,
        5,
        6
    ],
    [
        9,
        6,
        2,
        7,
        1,
        4,
        6,
        7
    ],
    [
        2,
        0,
        7,
        3,
        8,
        2,
        5,
        7,
        8
    ],
    [
        4,
        3,
        1,
        8,
        4,
        9,
        3,
        6,
        8,
        9
    ]
];

//快速定位表
export const qck_table = [
    [
        "8",
        "3",
        "7",
        "3",
        "6",
        "1",
        "7",
        "7",
        "4",
        "4",
        "2",
        "2",
        "8"
    ],
    [
        "5",
        "1",
        "2",
        "2",
        "0",
        "6",
        "1",
        "9",
        "7",
        "6",
        "4",
        "0",
        "5"
    ],
    [
        "2",
        "5",
        "4",
        "7",
        "2",
        "3",
        "8",
        "4",
        "9",
        "7",
        "3",
        "4",
        "2"
    ],
    [
        "2",
        "4",
        "1",
        "6",
        "5",
        "9",
        "3",
        "4",
        "5",
        "1",
        "9",
        "3",
        "2"
    ],
    [
        "1",
        "2",
        "0",
        "5",
        "8",
        "8",
        "6",
        "7",
        "4",
        "8",
        "8",
        "6",
        "1"
    ],
    [
        "4",
        "3",
        "7",
        "4",
        "0",
        "9",
        "3",
        "0",
        "3",
        "4",
        "0",
        "5",
        "4"
    ],
    [
        "8",
        "5",
        "9",
        "2",
        "4",
        "5",
        "7",
        "8",
        "4",
        "2",
        "0",
        "7",
        "8"
    ],
    [
        "7",
        "0",
        "0",
        "6",
        "9",
        "6",
        "4",
        "9",
        "9",
        "8",
        "9",
        "7",
        "7"
    ],
    [
        "0",
        "6",
        "4",
        "0",
        "7",
        "5",
        "8",
        "3",
        "8",
        "6",
        "2",
        "3",
        "0"
    ],
    [
        "8",
        "3",
        "0",
        "7",
        "1",
        "7",
        "2",
        "6",
        "0",
        "9",
        "4",
        "6",
        "8"
    ],
    [
        "2",
        "1",
        "1",
        "1",
        "8",
        "0",
        "6",
        "5",
        "5",
        "6",
        "1",
        "4",
        "2"
    ],
    [
        "6",
        "4",
        "0",
        "4",
        "2",
        "1",
        "1",
        "6",
        "3",
        "5",
        "1",
        "3",
        "6"
    ],
    [
        "8",
        "9",
        "0",
        "0",
        "0",
        "2",
        "7",
        "3",
        "5",
        "3",
        "4",
        "3",
        "8"
    ],
    [
        "8",
        "5",
        "0",
        "2",
        "8",
        "3",
        "0",
        "1",
        "8",
        "9",
        "7",
        "5",
        "8"
    ],
    [
        "1",
        "7",
        "4",
        "4",
        "2",
        "7",
        "8",
        "4",
        "8",
        "6",
        "0",
        "7",
        "1"
    ],
    [
        "6",
        "8",
        "9",
        "2",
        "8",
        "1",
        "5",
        "4",
        "2",
        "7",
        "9",
        "1",
        "6"
    ],
    [
        "8",
        "3",
        "7",
        "3",
        "6",
        "1",
        "7",
        "7",
        "4",
        "4",
        "2",
        "2",
        "8"
    ]
];

export function fastTable(last, before, current, currentShi) {
    return renderFastTable(chkBall(last), chkBall(before), chkBall(current), chkBall(currentShi));
}

const chkBall = (ball) => {
    //设置结果矩阵
    let chkResult = new Array(qck_table.length);
    for (let i = 0; i < qck_table.length; i++) {
        chkResult[i] = [];
        for (let j = 0; j < qck_table[i].length; j++) {
            chkResult[i][j] = false;
        }
    }
    if (ball) {
        for (let i = 0; i < qck_table.length; i++) {
            let row = qck_table[i];
            for (let j = 0; j < row.length; j++) {
                let element = qck_table[i][j];
                position(ball, element, i, j, chkResult);
            }
        }
    }
    return chkResult;
};

const position = (ball, element, row, column, chkTable) => {
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
        if (sColPlus <= 12) {
            shiPos.push({
                x: sRowMinus,
                y: sColPlus,
                xie: true,
            });
        }
    }
    if (sRowPlus <= 16) {
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
        if (sColPlus <= 12) {
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
    if (sColPlus <= 12) {
        shiPos.push({
            x: row,
            y: sColPlus,
            xie: false
        });
    }
    let shis = [];
    for (let i = 0; i < shiPos.length; i++) {
        const pos = shiPos[i];
        if (ball[1] === qck_table[pos.x][pos.y]) {
            let result    = {};
            result.value  = qck_table[pos.x][pos.y];
            result.row    = pos.x;
            result.column = pos.y;
            result.idx    = 'shi';
            result.xie    = pos.xie;
            shis.push(result);
        }
        if (ball[2] === qck_table[pos.x][pos.y]) {
            let result    = {};
            result.value  = qck_table[pos.x][pos.y];
            result.row    = pos.x;
            result.column = pos.y;
            result.idx    = 'ge';
            result.xie    = pos.xie;
            shis.push(result);
        }
    }
    if (shis.length === 0) {
        return;
    }
    if (shis.filter(e => e.idx === 'shi').length > 0 && shis.filter(e => e.idx === 'ge').length > 0) {
        chkTable[row][column] = true;
        for (let i = 0; i < shis.length; i++) {
            let shi                       = shis[i];
            chkTable[shi.row][shi.column] = chkTable[shi.row][shi.column] || shi.idx === 'shi';
            chkTable[shi.row][shi.column] = chkTable[shi.row][shi.column] || shi.idx === 'ge';
        }
    }
    //个位查找
    let filter = shis.filter(e => e.idx === 'shi');
    if (filter.length > 0) {
        calcPosition(filter, (pos, shi) => {
            if (ball[2] === qck_table[pos.x][pos.y]) {
                chkTable[row][column]         = true;
                chkTable[shi.row][shi.column] = true;
                chkTable[pos.x][pos.y]        = true;
            }
        });
    }
    filter = shis.filter(e => e.idx === 'ge');
    if (filter.length > 0) {
        calcPosition(filter, (pos, shi) => {
            if (ball[1] === qck_table[pos.x][pos.y]) {
                chkTable[row][column]         = true;
                chkTable[shi.row][shi.column] = true;
                chkTable[pos.x][pos.y]        = true;
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
                xie: false,
            });
            if (gColMinus >= 0) {
                gPos.push({
                    x: gRowMinus,
                    y: gColMinus,
                    xie: true,
                });
            }
            if (gColPlus <= 12) {
                gPos.push({
                    x: gRowMinus,
                    y: gColPlus,
                    xie: true,
                });
            }
        }
        if (gRowPlus <= 16) {
            gPos.push({
                x: gRowPlus,
                y: shi.column,
                xie: false,
            });
            if (gColMinus >= 0) {
                gPos.push({
                    x: gRowPlus,
                    y: gColMinus,
                    xie: true,
                });
            }
            if (gColPlus <= 12) {
                gPos.push({
                    x: gRowPlus,
                    y: gColPlus,
                    xie: true,
                });
            }
        }
        if (gColMinus >= 0) {
            gPos.push({
                x: shi.row,
                y: gColMinus,
                xie: false,
            });
        }
        if (gColPlus <= 12) {
            gPos.push({
                x: shi.row,
                y: gColPlus,
                xie: false,
            });
        }
        for (let j = 0; j < gPos.length; j++) {
            const pos = gPos[j];
            callback(pos, shi);
        }
    }
}

const renderFastTable = (lastTable, beforeTable, currentTable, currentShiTable) => {
    let fastTable = [];
    for (let i = 0; i < qck_table.length; i++) {
        let rows = [];
        for (let j = 0; j < qck_table[i].length; j++) {
            let last       = lastTable[i][j];
            let before     = beforeTable[i][j];
            let current    = currentTable[i][j];
            let currentShi = currentShiTable[i][j];
            let data       = {};
            data.key       = qck_table[i][j];
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
