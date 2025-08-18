//四段式
let segment1     = [
    [
        1,
        3,
        8
    ],
    [
        4,
        9
    ],
    [
        5,
        7
    ],
    [
        0,
        2,
        6
    ]
];
let segment2     = [
    [
        1,
        6,
        7
    ],
    [
        3,
        8
    ],
    [
        5,
        9
    ],
    [
        0,
        2,
        4
    ]
];
let segment3     = [
    [
        2,
        7,
        9
    ],
    [
        1,
        6
    ],
    [
        3,
        5
    ],
    [
        0,
        4,
        8
    ]
];
let segment4     = [
    [
        3,
        4,
        9
    ],
    [
        2,
        7
    ],
    [
        1,
        5
    ],
    [
        0,
        6,
        8
    ]
];
//胆码表
let danTable     = {
    1: [
        1,
        3,
        6,
        8
    ],
    2: [
        1,
        2,
        6,
        7
    ],
    3: [
        2,
        4,
        7,
        9
    ],
    4: [
        3,
        4,
        8,
        9
    ],
    5: [
        2,
        5,
        7,
        9
    ],
};
//星期胆码表
let weekDanTable = [
    [
        1,
        5,
        2,
        4
    ],
    [
        7,
        9,
        0,
        6
    ],
    [
        5,
        9,
        6,
        8
    ],
    [
        5,
        0,
        4,
        8
    ],
    [
        3,
        6,
        5,
        0
    ],
    [
        3,
        7,
        4,
        6
    ],
    [
        3,
        5,
        2,
        6
    ]
];
//偶合表
let evenSumTable = {
    1: [
        0,
        2,
        4,
        6
    ],
    2: [
        0,
        2,
        4,
        8
    ],
    3: [
        0,
        4,
        6,
        8
    ],
    4: [
        0,
        2,
        6,
        8
    ],
};

let commonTwo = [
    [
        0,
        2
    ],
    [
        0,
        4
    ],
    [
        0,
        5
    ],
    [
        0,
        7
    ],
    [
        0,
        9
    ],
    [
        2,
        4
    ],
    [
        2,
        5
    ],
    [
        2,
        7
    ],
    [
        2,
        9
    ],
    [
        4,
        5
    ],
    [
        4,
        7
    ],
    [
        4,
        9
    ],
    [
        5,
        7
    ],
    [
        5,
        9
    ],
    [
        7,
        9
    ],
    [
        0,
        0
    ],
    [
        2,
        2
    ],
    [
        4,
        4
    ],
    [
        5,
        5
    ],
    [
        7,
        7
    ],
    [
        9,
        9
    ],
    [
        1,
        3
    ],
    [
        1,
        6
    ],
    [
        1,
        8
    ],
    [
        3,
        6
    ],
    [
        3,
        8
    ],
    [
        6,
        8
    ],
    [
        1,
        1
    ],
    [
        3,
        3
    ],
    [
        6,
        6
    ],
    [
        8,
        8
    ]
];

let dayTwoMa = {
    0: [
        [
            0,
            3
        ],
        [
            0,
            4
        ],
        [
            0,
            9
        ],
        [
            1,
            4
        ],
        [
            1,
            5
        ],
        [
            1,
            6
        ],
        [
            2,
            4
        ],
        [
            2,
            5
        ],
        [
            3,
            4
        ],
        [
            3,
            5
        ],
        [
            3,
            8
        ],
        [
            3,
            9
        ],
        [
            4,
            9
        ],
        [
            5,
            7
        ],
        [
            5,
            8
        ],
        [
            5,
            9
        ],
        [
            6,
            6
        ],
        [
            6,
            7
        ]
    ],
    1: [
        [
            0,
            1
        ],
        [
            0,
            2
        ],
        [
            0,
            3
        ],
        [
            0,
            5
        ],
        [
            0,
            7
        ],
        [
            1,
            3
        ],
        [
            1,
            7
        ],
        [
            1,
            9
        ],
        [
            2,
            5
        ],
        [
            2,
            6
        ],
        [
            3,
            6
        ],
        [
            4,
            5
        ],
        [
            4,
            7
        ],
        [
            4,
            8
        ],
        [
            4,
            9
        ],
        [
            5,
            7
        ],
        [
            5,
            9
        ],
        [
            6,
            8
        ],
        [
            6,
            9
        ]
    ],
    2: [
        [
            0,
            3
        ],
        [
            0,
            7
        ],
        [
            1,
            2
        ],
        [
            1,
            5
        ],
        [
            1,
            7
        ],
        [
            1,
            8
        ],
        [
            2,
            4
        ],
        [
            2,
            5
        ],
        [
            2,
            7
        ],
        [
            2,
            9
        ],
        [
            3,
            4
        ],
        [
            3,
            6
        ],
        [
            3,
            7
        ],
        [
            3,
            8
        ],
        [
            4,
            5
        ],
        [
            4,
            8
        ],
        [
            5,
            8
        ],
        [
            8,
            9
        ]
    ],
    3: [
        [
            0,
            3
        ],
        [
            0,
            7
        ],
        [
            1,
            2
        ],
        [
            1,
            5
        ],
        [
            1,
            7
        ],
        [
            1,
            8
        ],
        [
            2,
            4
        ],
        [
            2,
            5
        ],
        [
            2,
            7
        ],
        [
            2,
            9
        ],
        [
            3,
            4
        ],
        [
            3,
            6
        ],
        [
            3,
            7
        ],
        [
            3,
            8
        ],
        [
            4,
            5
        ],
        [
            4,
            8
        ],
        [
            5,
            8
        ],
        [
            5,
            9
        ],
        [
            8,
            9
        ]
    ],
    4: [
        [
            0,
            1
        ],
        [
            0,
            4
        ],
        [
            0,
            5
        ],
        [
            0,
            8
        ],
        [
            1,
            2
        ],
        [
            1,
            3
        ],
        [
            1,
            4
        ],
        [
            1,
            6
        ],
        [
            1,
            8
        ],
        [
            1,
            9
        ],
        [
            2,
            5
        ],
        [
            2,
            9
        ],
        [
            4,
            7
        ],
        [
            4,
            8
        ],
        [
            5,
            9
        ],
        [
            6,
            7
        ],
        [
            6,
            8
        ],
        [
            6,
            9
        ],
        [
            7,
            8
        ],
        [
            8,
            9
        ]
    ],
    5: [
        [
            0,
            1
        ],
        [
            0,
            2
        ],
        [
            0,
            5
        ],
        [
            0,
            7
        ],
        [
            0,
            8
        ],
        [
            1,
            2
        ],
        [
            1,
            4
        ],
        [
            1,
            5
        ],
        [
            1,
            6
        ],
        [
            1,
            9
        ],
        [
            2,
            3
        ],
        [
            2,
            7
        ],
        [
            2,
            9
        ],
        [
            3,
            4
        ],
        [
            3,
            6
        ],
        [
            3,
            8
        ],
        [
            4,
            5
        ],
        [
            4,
            7
        ],
        [
            4,
            9
        ],
        [
            5,
            6
        ],
        [
            6,
            7
        ],
        [
            6,
            9
        ],
        [
            7,
            7
        ],
        [
            8,
            9
        ]
    ],
    6: [
        [
            0,
            1
        ],
        [
            0,
            4
        ],
        [
            0,
            5
        ],
        [
            0,
            6
        ],
        [
            0,
            8
        ],
        [
            0,
            9
        ],
        [
            1,
            2
        ],
        [
            1,
            3
        ],
        [
            1,
            4
        ],
        [
            2,
            3
        ],
        [
            2,
            5
        ],
        [
            2,
            6
        ],
        [
            2,
            9
        ],
        [
            3,
            5
        ],
        [
            4,
            6
        ],
        [
            4,
            7
        ],
        [
            4,
            9
        ],
        [
            5,
            6
        ],
        [
            5,
            7
        ],
        [
            5,
            8
        ],
        [
            6,
            6
        ],
        [
            6,
            8
        ]
    ],
    7: [
        [
            0,
            2
        ],
        [
            0,
            3
        ],
        [
            0,
            5
        ],
        [
            0,
            6
        ],
        [
            0,
            9
        ],
        [
            1,
            5
        ],
        [
            1,
            6
        ],
        [
            1,
            9
        ],
        [
            2,
            3
        ],
        [
            2,
            5
        ],
        [
            2,
            8
        ],
        [
            2,
            9
        ],
        [
            3,
            4
        ],
        [
            3,
            7
        ],
        [
            4,
            5
        ],
        [
            4,
            6
        ],
        [
            4,
            7
        ],
        [
            4,
            8
        ],
        [
            5,
            6
        ],
        [
            5,
            9
        ],
        [
            6,
            6
        ],
        [
            7,
            8
        ],
        [
            8,
            9
        ]
    ],
    8: [
        [
            0,
            1
        ],
        [
            0,
            2
        ],
        [
            0,
            7
        ],
        [
            0,
            8
        ],
        [
            0,
            9
        ],
        [
            1,
            6
        ],
        [
            1,
            7
        ],
        [
            2,
            5
        ],
        [
            2,
            7
        ],
        [
            2,
            8
        ],
        [
            3,
            4
        ],
        [
            3,
            5
        ],
        [
            3,
            6
        ],
        [
            3,
            7
        ],
        [
            3,
            8
        ],
        [
            4,
            5
        ],
        [
            4,
            7
        ],
        [
            4,
            8
        ],
        [
            5,
            9
        ],
        [
            6,
            8
        ],
        [
            7,
            8
        ]
    ],
    9: [
        [
            0,
            1
        ],
        [
            0,
            4
        ],
        [
            0,
            5
        ],
        [
            0,
            6
        ],
        [
            1,
            2
        ],
        [
            1,
            4
        ],
        [
            1,
            7
        ],
        [
            2,
            3
        ],
        [
            2,
            5
        ],
        [
            2,
            8
        ],
        [
            3,
            6
        ],
        [
            3,
            7
        ],
        [
            3,
            9
        ],
        [
            4,
            5
        ],
        [
            4,
            8
        ],
        [
            5,
            6
        ],
        [
            5,
            7
        ],
        [
            6,
            8
        ],
        [
            7,
            8
        ],
        [
            7,
            9
        ],
        [
            8,
            9
        ],
        [
            9,
            9
        ]
    ],
};

let duanZuMa = {
    '0': [
        [
            9,
            5,
            0,
            2,
            7
        ],
        [
            4,
            3,
            8,
            1,
            6
        ]
    ],
    '1': [
        [
            7,
            6,
            1,
            8,
            3
        ],
        [
            2,
            0,
            5,
            9,
            4
        ]
    ],
    '2': [
        [
            5,
            0,
            2,
            7,
            6
        ],
        [
            9,
            4,
            3,
            8,
            1
        ]
    ],
    '3': [
        [
            1,
            8,
            3,
            4,
            9
        ],
        [
            6,
            7,
            2,
            0,
            5
        ]
    ],
    '4': [
        [
            8,
            3,
            4,
            9,
            5
        ],
        [
            1,
            6,
            7,
            2,
            0
        ]
    ],
    '5': [
        [
            4,
            9,
            5,
            0,
            2
        ],
        [
            3,
            8,
            1,
            6,
            7
        ]
    ],
    '6': [
        [
            2,
            7,
            6,
            1,
            8
        ],
        [
            9,
            5,
            0,
            4,
            3
        ]
    ],
    '7': [
        [
            0,
            2,
            7,
            6,
            1
        ],
        [
            5,
            9,
            4,
            3,
            8
        ]
    ],
    '8': [
        [
            6,
            1,
            8,
            3,
            4
        ],
        [
            5,
            9,
            4,
            3,
            8
        ]
    ],
    '9': [
        [
            3,
            4,
            9,
            5,
            0
        ],
        [
            8,
            1,
            6,
            7,
            2
        ]
    ],
};
let maHeDan  = {
    '0516': [
        0,
        2,
        4
    ],
    '0527': [
        0,
        4,
        8
    ],
    '0538': [
        0,
        2,
        6
    ],
    '0549': [
        0,
        6,
        8
    ],
    '1627': [
        4,
        6,
        8
    ],
    '1638': [
        2,
        4,
        8
    ],
    '1649': [
        0,
        4,
        6
    ],
    '2738': [
        0,
        2,
        8
    ],
    '2749': [
        2,
        6,
        8
    ],
    '3849': [
        2,
        4,
        6
    ],
};

function filterMaHeDan(i, j, k, maHeDan) {
    if (filterDan(i, j, k, maHeDan)) {
        return true;
    }
    let twoSum = twoCodeSum([
        i,
        j,
        k
    ]);
    return twoSum.filter(e => maHeDan.includes(e)).length > 0;
}

function lottoMaHeDan(balls) {
    let duiMaList = Array.from(new Set(balls)).map(e => parseInt(e)).map(e => duiMaZu(e));
    duiMaList     = Array.from(new Set(duiMaList));
    let value     = duiMaList[0];
    if (duiMaList.length <= 1) {
        duiMaList.push(value.includes('0') ? '16' : '05');
    }
    let duiMaTxt = duiMaList.sort().join('');
    if (duiMaList.length <= 2) {
        return maHeDan[duiMaTxt];
    }
    let remain = [];
    if (!duiMaTxt.includes('0')) {
        remain.push('05');
    }
    if (!duiMaTxt.includes('1')) {
        remain.push('16');
    }
    if (!duiMaTxt.includes('2')) {
        remain.push('27');
    }
    if (!duiMaTxt.includes('3')) {
        remain.push('38');
    }
    if (!duiMaTxt.includes('4')) {
        remain.push('49');
    }
    let index = remain.sort().join('');
    return maHeDan[index];
}

function duiMaZu(ball) {
    return calcIndex(ball).sort().join('');
}

function duiMaDuanZuList(balls) {
    let codes = balls.map(e => parseInt(e));
    let table = duiMaDuanZu(codes);
    let data  = [];
    for (let i = 0; i < table[0].length; i++) {
        for (let j = 0; j < table[1].length; j++) {
            for (let k = 0; k < table[2].length; k++) {
                let result = Array.from(new Set([
                    table[0][i],
                    table[1][j],
                    table[2][k]
                ]));
                result.sort();
                data.push(result.join(''));
            }
        }
    }
    return data;
}

function duanZuList(balls) {
    let values = Array.from(new Set(balls));
    let result = [];
    values.filter(e => e !== '0').forEach(e => {
        result.push(...itemDuanZu(e));
    });
    return Array.from(new Set(result));
}

function itemDuanZu(ball) {
    let values = duanZuMa[ball];
    let data   = [];
    for (let i = 0; i < values[0].length; i++) {
        for (let j = 1; j < values[0].length; j++) {
            for (let k = 1; k < values[0].length; k++) {
                let result = Array.from(new Set([
                    values[0][i],
                    values[0][j],
                    values[0][k]
                ]));
                result.sort();
                data.push(result.join(''));
            }
        }
    }
    for (let i = 0; i < values[1].length; i++) {
        for (let j = 1; j < values[1].length; j++) {
            for (let k = 1; k < values[1].length; k++) {
                let result = Array.from(new Set([
                    values[1][i],
                    values[1][j],
                    values[1][k]
                ]));
                result.sort();
                data.push(result.join(''));
            }
        }
    }
    return data;
}

export function filterDuanZu(i, j, k, table) {
    let keys = Object.keys(table);
    if (table == null || keys.length <= 0) {
        return false;
    }
    let value = Array.from(new Set([
        i,
        j,
        k
    ])).sort().join('');
    if (keys.length === 1) {
        return table[keys[0]].includes(value);
    }
    if (keys.length === 2) {
        //2个断组全部正确
        if (!table[keys[0]].includes(value) && !!table[keys[1]].includes(value)) {
            return false;
        }
        if (!table[keys[0]].includes(value)) {
            return false;
        }
        return table[keys[1]].includes(value);
    }
    //3个断组全部正确
    if (!table[keys[0]].includes(value) && !table[keys[1]].includes(value) && !table[keys[2]].includes(value)) {
        return false;
    }
    if (!table[keys[0]].includes(value) && !table[keys[1]].includes(value)) {
        return false;
    }
    if (!table[keys[0]].includes(value) && !table[keys[2]].includes(value)) {
        return false;
    }
    return !(!table[keys[1]].includes(value) && !table[keys[2]].includes(value));
}

function filterJinWei(i, j, k, jinWei) {
    if (jinWei.zu3.length === 0 && jinWei.zu6.length === 0) {
        return false;
    }
    let balls = Array.from(new Set([
        i,
        j,
        k
    ])).sort();
    let value = balls.join(' ');
    if (balls.length === 2 && jinWei.zu3.includes(value)) {
        return false;
    }
    return !(balls.length === 3 && jinWei.zu6.includes(value));
}

function filterEvenSum(i, j, k, evenSum) {
    if (evenSum.zu3.length === 0 && evenSum.zu6.length === 0) {
        return false;
    }
    let balls = Array.from(new Set([
        i,
        j,
        k
    ])).sort();
    let value = balls.join(' ');
    if (balls.length === 2 && evenSum.zu3.includes(value)) {
        return false;
    }
    return !(balls.length === 3 && evenSum.zu6.includes(value));
}

//胆码过滤万能两码
function filterCommonTwo(danList, twoList) {
    if (danList == null || danList.length === 0) {
        return twoList;
    }
    return twoList.filter(e => danList.includes(e[0]) || danList.includes(e[1]))
}

//两码过滤号码
function filterTwo(i, j, k, twoList) {
    return twoList.filter(e => (e.includes(i) && e.includes(j)) || (e.includes(i) && e.includes(k)) ||
        (e.includes(j) && e.includes(k))).length > 0;
}

//求邻码
function judgeNeighbor(value) {
    if (value === 0) {
        return [
            1,
            9
        ];
    }
    if (value === 9) {
        return [
            0,
            8
        ];
    }
    return [
        value - 1,
        value + 1
    ];
}

function duiMaDuanZu(codes) {
    let segment  = shiDuiMa(codes);
    let remain   = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ].filter(e => !segment.includes(e)).sort();
    let segment1 = remain.slice(0, 2);
    let segment2 = remain.slice(2, remain.length);
    return [
        segment,
        segment1,
        segment2
    ];
}

function judgePattern(tail, indices) {
    return (Math.abs(indices[0] - indices[1]) === 5 && tail === (indices[0] + indices[1]) % 10) ||
        (Math.abs(indices[0] - indices[2]) === 5 && tail === (indices[0] + indices[2]) % 10) ||
        (Math.abs(indices[1] - indices[2]) === 5 && tail === (indices[1] + indices[2]) % 10);
}

function remainTail(index1, index2, index3, index4, index5) {
    let index12 = (index1 + index2) % 10;
    if (index12 === (index3 + index4) % 10) {
        return index5;
    }
    if (index12 === (index3 + index5) % 10) {
        return index4;
    }
    return index3;
}

function sumTail(index) {
    return (index[0] + index[1]) % 10;
}

export function calcIndex(value) {
    let index = [];
    if (value < 5) {
        index[0] = value;
        index[1] = value + 5;
    } else {
        index[0] = value - 5;
        index[1] = value;
    }
    return index;
}

function remainIndex(indices) {
    return [
        0,
        1,
        2,
        3,
        4
    ].filter(i => !indices.includes(i))
        .map(i => calcIndex(i));
}

function negotiatePattern(tail) {
    if (tail === 5) {
        return {
            type: 5,
            index: 4,
            segment: segment3,
            dan: danTable[5],
            evenSum: evenSumTable[4],
        }
    }
    if (judgePattern(tail, segment1[0])) {
        return {
            type: 1,
            index: 1,
            segment: segment1,
            dan: danTable[1],
            evenSum: evenSumTable[1],
        };
    }
    if (judgePattern(tail, segment2[0])) {
        return {
            type: 2,
            index: 2,
            segment: segment2,
            dan: danTable[2],
            evenSum: evenSumTable[2],
        };
    }
    if (judgePattern(tail, segment3[0])) {
        return {
            type: 3,
            index: 3,
            segment: segment3,
            dan: danTable[3],
            evenSum: evenSumTable[3],
        };
    }
    return {
        type: 4,
        index: 4,
        segment: segment4,
        dan: danTable[4],
        evenSum: evenSumTable[4],
    };
}

export function lotteryDuiMa(balls) {
    let set = Array.from(new Set(balls));
    if (set.length === 1) {
        return [
            calcIndex(balls[0]),
            calcIndex(balls[0] === 5 || balls[0] === 0 ? 1 : 0)
        ];
    }
    if (set.length === 2) {
        if (Math.abs(set[0] - set[1]) === 5) {
            if (set[0] + set[1] !== 5) {
                return [
                    calcIndex(set[0]),
                    calcIndex(0)
                ];
            }
            return [
                [
                    0,
                    5
                ],
                [
                    1,
                    6
                ]
            ];
        }
        return [
            calcIndex(set[0]),
            calcIndex(set[1]),
        ];
    }
    let values = zu6DuiMa(balls);
    if (values.length === 2) {
        return [
            calcIndex(values[0]),
            calcIndex(values[1]),
        ];
    }
    return [
        calcIndex(values[0]),
        calcIndex(values[1]),
        calcIndex(values[2]),
    ];
}

export function duanZu46(balls) {
    let set = Array.from(new Set(balls));
    if (set.length === 1) {
        let index    = calcIndex(balls[0]);
        let index1   = calcIndex(0);
        let segment1 = [
            ...index,
            ...index1
        ];
        let index2   = remainIndex([
            index[0],
            index1[0]
        ]);
        let segment2 = [];
        index2.forEach(e => segment2.push(...e));
        return [
            segment1,
            segment2
        ];
    }
    if (set.length === 2) {
        let collected = Array.from(set);
        if (Math.abs(collected[0] - collected[1]) === 5) {
            if (collected[0] + collected[1] !== 5) {
                let index    = calcIndex(collected[0]);
                let index1   = calcIndex(0);
                let segment1 = [
                    ...index,
                    ...index1
                ];
                let index2   = remainIndex([
                    index[0],
                    index1[0]
                ]);
                let segment2 = [];
                index2.forEach(e => segment2.push(...e));
                return [
                    segment1,
                    segment2
                ];
            }
            let index    = [
                    0,
                    5
                ],
                index1   = [
                    1,
                    6
                ];
            let segment1 = [
                ...index,
                ...index1
            ];
            let index2   = remainIndex([
                index[0],
                index1[0]
            ]);
            let segment2 = [];
            index2.forEach(e => segment2.push(...e));
            return [
                segment1,
                segment2
            ];
        }
        let index1   = calcIndex(collected[0]);
        let index2   = calcIndex(collected[1]);
        let segment1 = [
            ...index1,
            ...index2,
        ];
        let remain   = remainIndex([
            index1[0],
            index2[0]
        ]);
        let segment2 = [];
        remain.forEach(e => segment2.push(...e));
        return [
            segment1,
            segment2
        ];
    }
    let values = zu6DuiMa(balls);
    if (values.length === 2) {
        let index1   = calcIndex(values[0]);
        let index2   = calcIndex(values[1]);
        let segment1 = [
            ...index1,
            ...index2,
        ];
        let remain   = remainIndex([
            index1[0],
            index2[0]
        ]);
        let segment2 = [];
        remain.forEach(e => segment2.push(...e));
        return [
            segment1,
            segment2
        ];
    }
    //组六计算
    let index    = calcIndex(balls[0]);
    let index1   = calcIndex(balls[1]);
    let index2   = calcIndex(balls[2]);
    let segment1 = [
        ...index,
        ...index1,
        ...index2,
    ];
    let remain   = remainIndex([
        index[0],
        index1[0],
        index2[0]
    ]);
    let segment2 = [];
    remain.forEach(e => segment2.push(...e));
    return [
        segment1,
        segment2
    ];
}

function zu6DuiMa(balls) {
    if (Math.abs(balls[0] - balls[1]) === 5) {
        return [
            balls[0],
            balls[2]
        ];
    }
    if (Math.abs(balls[0] - balls[2]) === 5 || Math.abs(balls[1] - balls[2]) === 5) {
        return [
            balls[0],
            balls[1]
        ];
    }
    return balls;
}

function calcPattern(balls) {
    let set       = new Set(balls);
    let collected = balls;
    if (set.length === 1) {
        let neighbor      = judgeNeighbor(collected[0]);
        let index1        = calcIndex(neighbor[0]);
        let index1Tail    = sumTail(index1);
        let index2        = calcIndex(neighbor[1]);
        let index2Tail    = sumTail(index2);
        let remainIndices = remainIndex([
            index1[0],
            index2[0]
        ]);
        let index3        = remainIndices[0];
        let index3Tail    = sumTail(index3);
        let index4        = remainIndices[1];
        let index4Tail    = sumTail(index4);
        let index5        = remainIndices[2];
        let index5Tail    = sumTail(index5);
        let tail          = remainTail(index1Tail, index2Tail, index3Tail, index4Tail, index5Tail);
        return negotiatePattern(tail);
    }

    if (set.length === 2) {
        collected = Array.from(set);
        if (Math.abs(collected[0] - collected[1]) === 5) {
            if (collected[0] + collected[1] !== 5) {
                let index1        = calcIndex(collected[0]);
                let index1Tail    = sumTail(index1);
                let index2        = [
                    0,
                    5
                ];
                let index2Tail    = sumTail(index2);
                let remainIndices = remainIndex([
                    index1[0],
                    index2[0]
                ]);
                let index3        = remainIndices[0];
                let index3Tail    = sumTail(index3);
                let index4        = remainIndices[1];
                let index4Tail    = sumTail(index4);
                let index5        = remainIndices[2];
                let index5Tail    = sumTail(index5);
                let remainedTail  = remainTail(index4Tail, index5Tail, index1Tail, index2Tail, index3Tail);
                return negotiatePattern(remainedTail);
            }
            let index1        = [
                0,
                5
            ];
            let index1Tail    = sumTail(index1);
            let index2        = [
                1,
                6
            ];
            let index2Tail    = sumTail(index2);
            let remainIndices = remainIndex([
                index1[0],
                index2[0]
            ]);
            let index3        = remainIndices[0];
            let index3Tail    = sumTail(index3);
            let index4        = remainIndices[1];
            let index4Tail    = sumTail(index4);
            let index5        = remainIndices[2];
            let index5Tail    = sumTail(index5);
            let remainedTail  = remainTail(index4Tail, index5Tail, index1Tail, index2Tail, index3Tail);
            return negotiatePattern(remainedTail);
        }
        let index1        = calcIndex(collected[0]);
        let index1Tail    = sumTail(index1);
        let index2        = calcIndex(collected[1]);
        let index2Tail    = sumTail(index2);
        let remainIndices = remainIndex([
            index1[0],
            index2[0]
        ]);
        let index3        = remainIndices[0];
        let index3Tail    = sumTail(index3);
        let index4        = remainIndices[1];
        let index4Tail    = sumTail(index4);
        let index5        = remainIndices[2];
        let index5Tail    = sumTail(index5);
        let remainedTail  = remainTail(index1Tail, index2Tail, index3Tail, index4Tail, index5Tail);
        return negotiatePattern(remainedTail);
    }
    //组六计算
    let index1     = calcIndex(collected[0]);
    let index1Tail = sumTail(index1);
    let index2     = calcIndex(collected[1]);
    let index2Tail = sumTail(index2);
    let index3     = calcIndex(collected[2]);
    let index3Tail = sumTail(index3);
    if (index1Tail !== index2Tail && index2Tail !== index3Tail && index1Tail !== index3Tail) {
        let remainIndices = remainIndex([
            index1[0],
            index2[0],
            index3[0]
        ]);
        let index4        = remainIndices[0];
        let index4Tail    = sumTail(index4);
        let index5        = remainIndices[1];
        let index5Tail    = sumTail(index5);
        let remainedTail  = remainTail(index4Tail, index5Tail, index1Tail, index2Tail, index3Tail);
        return negotiatePattern(remainedTail);
    }
    if (index1Tail === index2Tail) {
        let remainIndices = remainIndex([
            index1[0],
            index3[0]
        ]);
        let index4        = remainIndices[0];
        let index4Tail    = sumTail(index4);
        let index5        = remainIndices[1];
        let index5Tail    = sumTail(index5);
        let index6        = remainIndices[2];
        let index6Tail    = sumTail(index6);
        let remainedTail  = remainTail(index1Tail, index3Tail, index4Tail, index5Tail, index6Tail);
        return negotiatePattern(remainedTail);
    }
    let remainIndices = remainIndex([
        index1[0],
        index2[0]
    ]);
    let index4        = remainIndices[0];
    let index4Tail    = sumTail(index4);
    let index5        = remainIndices[1];
    let index5Tail    = sumTail(index5);
    let index6        = remainIndices[2];
    let index6Tail    = sumTail(index6);
    let remainedTail  = remainTail(index1Tail, index2Tail, index4Tail, index5Tail, index6Tail);
    return negotiatePattern(remainedTail);
}

export function weekDan(date) {
    return weekDanTable[date.getDay()];
}

export function shiDuiMa(codes) {
    let code   = codes[1] < 5 ? codes[1] + 5 : codes[1] - 5;
    let result = [
        codes[1],
        code
    ];
    result.push(code - 2 < 0 ? code - 2 + 10 : code - 2);
    result.push(code - 1 < 0 ? code - 1 + 10 : code - 1);
    result.push(code + 1 > 9 ? code + 1 - 10 : code + 1);
    result.push(code + 2 > 9 ? code + 2 - 10 : code + 2);
    return result.sort();
}

function twoCodeSum(codes) {
    let sumTail1 = sumTail([
        codes[0],
        codes[1]
    ]);
    let sumTail2 = sumTail([
        codes[0],
        codes[2]
    ]);
    let sumTail3 = sumTail([
        codes[1],
        codes[2]
    ]);
    return Array.from(new Set([
        sumTail1,
        sumTail2,
        sumTail3
    ])).sort();
}

function towCodeDiff(codes) {
    let diff1 = Math.abs(codes[0] - codes[1]);
    let diff2 = Math.abs(codes[0] - codes[2]);
    let diff3 = Math.abs(codes[1] - codes[2]);
    return Array.from(new Set([
        diff1,
        diff2,
        diff3
    ])).sort();
}

function calcEvenSum(codes) {
    let sumTail1 = sumTail([
        codes[0],
        codes[1]
    ]);
    let sumTail2 = sumTail([
        codes[0],
        codes[2]
    ]);
    let sumTail3 = sumTail([
        codes[1],
        codes[2]
    ]);
    let set      = new Set();
    if (sumTail1 % 2 === 0) {
        set.add(sumTail1);
        if (sumTail1 !== 0) {
            set.add(10 - sumTail1);
        }
    }
    if (sumTail2 % 2 === 0) {
        set.add(sumTail2);
        if (sumTail2 !== 0) {
            set.add(10 - sumTail2);
        }
    }
    if (sumTail3 % 2 === 0) {
        set.add(sumTail3);
        if (sumTail3 !== 0) {
            set.add(10 - sumTail3);
        }
    }
    return Array.from(set).sort();
}

export function filterDan(i, j, k, danList) {
    if (danList == null || danList.length === 0) {
        return true;
    }
    return danList.includes(i) || danList.includes(j) || danList.includes(k);
}

function filterKill(i, j, k, killList) {
    if (killList == null || killList.length === 0) {
        return true;
    }
    return !killList.includes(i) && !killList.includes(j) && !killList.includes(k);
}

export function filterKua(i, j, k, kuaList) {
    if (kuaList == null || kuaList.length === 0) {
        return true;
    }
    let max = Math.max(i, Math.max(j, k));
    let min = Math.min(i, Math.min(j, k));
    return kuaList.includes(max - min);
}

export function filterSum(i, j, k, sumList) {
    if (sumList == null || sumList.length === 0) {
        return true;
    }
    let sum = i + j + k;
    return sumList.includes(sum);
}

function evenSumFilter(i, j, k, evenList) {
    if (evenList == null || evenList.length === 0) {
        return true;
    }
    let evenSum = calcEvenSum([
        i,
        j,
        k
    ]);
    return evenSum.filter(i => evenList.includes(i)).length > 0;
}

function twoDiffFilter(i, j, k, diffList) {
    if (diffList == null || diffList.length === 0) {
        return true;
    }
    let codeDiff = twoDiff([
        i,
        j,
        k
    ].join(' '));
    return codeDiff.filter(i => diffList.includes(i)).length > 0;
}

function towSumFilter(i, j, k, sumList) {
    if (sumList == null || sumList.length === 0) {
        return true;
    }
    let codeSum = twoSum([
        i,
        j,
        k
    ].join(' '));
    return codeSum.filter(i => sumList.includes(i)).length > 0;
}

function sameTwoMa(target, source) {
    return target.sort().join(' ') === source.sort().join(' ');
}

function twoMaIncludes(i, j, k, twoMa) {
    return (twoMa.includes(i) && twoMa.includes(j)) || (twoMa.includes(i) && twoMa.includes(k)) ||
        (twoMa.includes(j) && twoMa.includes(k));
}

export function twoMaFilter(i, j, k, twoMa) {
    if (twoMa == null || twoMa.length === 0 || isZu3(i, j, k)) {
        return true;
    }
    return twoMa.filter(e => twoMaIncludes(i, j, k, e)).length > 0;
}

function patternFilter(i, j, k, pattern) {
    if (pattern == null) {
        return true;
    }
    let set = new Set([
        i,
        j,
        k
    ]);
    if (pattern === 3) {
        return set.size === 3;
    }
    if (pattern === 2) {
        return set.size === 2;
    }
    return set.size === 1;
}

export function isZu3(i, j, k) {
    return new Set([
        i,
        j,
        k
    ]).size === 2;
}

export function isZu6(i, j, k) {
    return new Set([
        i,
        j,
        k
    ]).size === 3;
}

function joinSegment(segment) {
    return segment[0].join('') + '-' + segment[1].join('') + '-' + segment[2].join('') + '-' + segment[3].join('');
}

export function calcDanHit(lottery, danList) {
    return danList.filter(e => lottery.includes(e.toString())).length > 0;
}

export function calcWensInfo(lottery, dateStr) {
    let codes       = lottery.split(' ').map(e => parseInt(e));
    let pattern     = calcPattern(codes);
    let codeDiff    = towCodeDiff(codes);
    let codeSum     = twoCodeSum(codes);
    let shiDuiTable = shiDuiMa(codes);
    let weekDanInfo = [];
    if (dateStr != null) {
        weekDanInfo = weekDan(new Date(dateStr));
    }
    return {
        diff: codeDiff.join(''),
        sum: codeSum.join(''),
        weekDanTable: weekDanInfo,
        weekDan: weekDanInfo.join(''),
        evenSum: pattern.evenSum.join(''),
        danTable: pattern.dan,
        dan: pattern.dan.join(''),
        segment: joinSegment(pattern.segment),
        eSum: calcEvenSum(codes).join(''),
        tenDuiTable: shiDuiTable,
        tenDui: shiDuiTable.join(''),
    };
}


export function twoSum(lottery) {
    let codes = lottery.split(' ').map(e => parseInt(e));
    let set   = new Set();
    set.add((codes[0] + codes[1]) % 10);
    set.add((codes[0] + codes[2]) % 10);
    set.add((codes[1] + codes[2]) % 10);
    if (codes[0] === 0) {
        set.add(0);
    } else {
        set.add(10 - codes[0]);
    }
    if (codes[1] === 0) {
        set.add(0);
    } else {
        set.add(10 - codes[1]);
    }
    if (codes[2] === 0) {
        set.add(0);
    } else {
        set.add(10 - codes[2]);
    }
    return Array.from(set).sort();
}

export function twoDiff(lottery) {
    let codes = lottery.split(' ').map(e => parseInt(e));
    let set   = new Set();
    set.add(Math.abs(codes[0] - codes[1]));
    set.add(Math.abs(codes[0] - codes[2]));
    set.add(Math.abs(codes[1] - codes[2]));
    set.add(Math.abs(codes[0] - 5));
    set.add(Math.abs(codes[1] - 5));
    set.add(Math.abs(codes[2] - 5));
    return Array.from(set).sort();
}

export function wensInfo(lottery, nextShi, date) {
    let codes       = lottery.split(' ').map(e => parseInt(e));
    let pattern     = calcPattern(codes);
    let weekDanInfo = weekDan(date);
    let codeDiff    = twoDiff(lottery);
    let codeSum     = twoSum(lottery);
    let shiDan      = [];
    let shiSegment  = '';
    if (nextShi != null) {
        let shiCodes   = nextShi.split(' ').map(e => parseInt(e));
        let shiPattern = calcPattern(shiCodes);
        shiDan         = shiPattern.dan;
        shiSegment     = joinSegment(shiPattern.segment);
    }
    return {
        twoDiff: codeDiff,
        twoSum: codeSum,
        weekDan: weekDanInfo,
        evenSum: pattern.evenSum,
        wensDan: pattern.dan,
        shiDan: shiDan,
        shiSegment: shiSegment,
        tenDui: shiDuiMa(codes),
        segment: joinSegment(pattern.segment),
    };
}

function joinTwoMa(twoList) {
    return twoList.map(e => e.join(' '));
}

function itemFilter(i, j, k, {
    twoDiff,
    twoSum,
    weekDan,
    wensDan,
    shiDan,
    danList,
    danList2,
    danList3,
    sumList,
    kuaList,
    killList,
    tenDuiList,
    twoMaList,
    sysDan,
    sysShiDan,
    pattern,
    twoList,
}) {
    if (!patternFilter(i, j, k, pattern)) {
        return false;
    }
    if (!filterDan(i, j, k, weekDan)) {
        return false;
    }
    if (!filterDan(i, j, k, wensDan)) {
        return false;
    }
    if (!filterDan(i, j, k, shiDan)) {
        return false;
    }
    if (!filterDan(i, j, k, tenDuiList)) {
        return false;
    }
    if (!filterDan(i, j, k, sysDan)) {
        return false;
    }
    if (!filterDan(i, j, k, sysShiDan)) {
        return false;
    }
    if (!twoMaFilter(i, j, k, twoMaList)) {
        return false;
    }
    if (!twoDiffFilter(i, j, k, twoDiff)) {
        return false;
    }
    if (!towSumFilter(i, j, k, twoSum)) {
        return false;
    }
    if (!filterDan(i, j, k, danList)) {
        return false;
    }
    if (!filterDan(i, j, k, danList2)) {
        return false;
    }
    if (!filterDan(i, j, k, danList3)) {
        return false;
    }
    if (!filterSum(i, j, k, sumList)) {
        return false;
    }
    if (!filterKua(i, j, k, kuaList)) {
        return false;
    }
    return filterKill(i, j, k, killList);
}

export function lotteryFilter({
                                  twoDiff,
                                  twoSum,
                                  weekDan,
                                  wensDan,
                                  shiDan,
                                  evenSum,
                                  danList,
                                  sumList,
                                  kuaList,
                                  killList,
                                  tenDuiList,
                                  twoMaList,
                                  sysDan,
                                  sysShiDan,
                                  pattern,
                              }) {
    let result = new Set();
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 10; k++) {
                if (!itemFilter(i, j, k, {
                    twoDiff: twoDiff,
                    twoSum: twoSum,
                    weekDan: weekDan,
                    wensDan: wensDan,
                    shiDan: shiDan,
                    evenSum: evenSum,
                    danList: danList,
                    sumList: sumList,
                    kuaList: kuaList,
                    killList: killList,
                    tenDuiList: tenDuiList,
                    twoMaList: twoMaList,
                    sysDan: sysDan,
                    sysShiDan: sysShiDan,
                    pattern: pattern,
                })) {
                    continue;
                }
                result.add(Array.from(new Set([
                    i,
                    j,
                    k
                ])).sort().join(' '));
            }
        }
    }
    return Array.from(result);
}

export function lotteryFilterSplitResult({
                                             twoDiff,
                                             twoSum,
                                             weekDan,
                                             wensDan,
                                             shiDan,
                                             evenSum,
                                             danList,
                                             danList2,
                                             danList3,
                                             sumList,
                                             kuaList,
                                             killList,
                                             tenDuiList,
                                             twoMaList,
                                             pattern,
                                             sysDan,
                                             sysShiDan,
                                             currentDuan,
                                             lastDuan,
                                             jinWei,
                                             isMaHe,
                                             lottery,
                                         }) {
    let result  = {
        zu6: [],
        zu3: []
    };
    let maHeDan = isMaHe ? lottoMaHeDan(lottery) : [];
    let zu3     = new Set();
    let zu6     = new Set();
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 10; k++) {
                if (filterDuanZu(i, j, k, currentDuan)) {
                    continue;
                }
                if (filterDuanZu(i, j, k, lastDuan)) {
                    continue;
                }
                if (filterJinWei(i, j, k, jinWei)) {
                    continue;
                }
                if (filterEvenSum(i, j, k, evenSum)) {
                    continue;
                }
                if (isMaHe && !filterMaHeDan(i, j, k, maHeDan)) {
                    continue;
                }
                if (!itemFilter(i, j, k, {
                    twoDiff: twoDiff,
                    twoSum: twoSum,
                    weekDan: weekDan,
                    wensDan: wensDan,
                    shiDan: shiDan,
                    danList: danList,
                    danList2: danList2,
                    danList3: danList3,
                    sumList: sumList,
                    kuaList: kuaList,
                    killList: killList,
                    tenDuiList: tenDuiList,
                    twoMaList: twoMaList,
                    pattern: pattern,
                    sysDan: sysDan,
                    sysShiDan: sysShiDan,
                })) {
                    continue;
                }
                let item = Array.from(new Set([
                    i,
                    j,
                    k
                ])).sort().join(' ');
                if (isZu3(i, j, k)) {
                    zu3.add(item);
                } else if (isZu6(i, j, k)) {
                    zu6.add(item);
                }
            }
        }
    }
    result.zu6.push(...Array.from(zu6));
    result.zu3.push(...Array.from(zu3));
    return result;
}

export function getTwoMaList({
                                 weekDan = [],
                                 wensDan = [],
                                 shiDan = [],
                                 danList = [],
                                 tenDuiList = [],
                                 sysDan = [],
                                 sysShiDan = [],
                             }) {
    let twoList = filterCommonTwo(danList, commonTwo);
    twoList     = filterCommonTwo(wensDan, twoList);
    twoList     = filterCommonTwo(weekDan, twoList);
    twoList     = filterCommonTwo(shiDan, twoList);
    twoList     = filterCommonTwo(tenDuiList, twoList);
    twoList     = filterCommonTwo(sysDan, twoList);
    twoList     = filterCommonTwo(sysShiDan, twoList);
    return twoList;
}

export function dayTwoMaList(date,) {
    if (date == null) {
        return [];
    }
    let index = date.getDate() % 10;
    return dayTwoMa[index]
}

