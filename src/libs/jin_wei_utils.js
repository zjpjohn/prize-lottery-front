import {duanZu46} from "./wens_utils";

const jin_wei_table = {
    0: [
        [
            0,
            0
        ],
        [
            1,
            1
        ],
        [
            1,
            9
        ],
        [
            2,
            2
        ],
        [
            2,
            8
        ],
        [
            3,
            3
        ],
        [
            3,
            7
        ],
        [
            4,
            4
        ],
        [
            4,
            6
        ],
        [
            5,
            5
        ],
        [
            6,
            6
        ],
        [
            7,
            7
        ],
        [
            8,
            8
        ],
        [
            9,
            9
        ]
    ],
    1: [
        [
            0,
            1
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
            2,
            3
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
            5,
            6
        ],
        [
            6,
            7
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
    2: [
        [
            0,
            2
        ],
        [
            0,
            8
        ],
        [
            1,
            1
        ],
        [
            1,
            3
        ],
        [
            1,
            9
        ],
        [
            2,
            4
        ],
        [
            3,
            5
        ],
        [
            3,
            9
        ],
        [
            4,
            6
        ],
        [
            4,
            8
        ],
        [
            5,
            7
        ],
        [
            6,
            6
        ],
        [
            6,
            8
        ],
        [
            7,
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
            4
        ],
        [
            1,
            8
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
            3,
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
            8
        ],
        [
            6,
            7
        ],
        [
            6,
            9
        ]
    ],
    4: [
        [
            0,
            4
        ],
        [
            0,
            6
        ],
        [
            1,
            3
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
            2,
            2
        ],
        [
            2,
            6
        ],
        [
            2,
            8
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
            7
        ]
    ],
    5: [
        [
            0,
            5
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
            2,
            3
        ],
        [
            2,
            7
        ],
        [
            3,
            8
        ],
        [
            4,
            9
        ],
        [
            6,
            9
        ],
        [
            7,
            8
        ]
    ],
    6: [
        [
            0,
            4
        ],
        [
            0,
            6
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
            2,
            4
        ],
        [
            2,
            6
        ],
        [
            2,
            8
        ],
        [
            3,
            3
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
            8
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
            8,
            8
        ]
    ],
    7: [
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
            2,
            5
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
            4,
            7
        ],
        [
            5,
            8
        ],
        [
            6,
            9
        ],
        [
            8,
            9
        ]
    ],
    8: [
        [
            0,
            2
        ],
        [
            0,
            8
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
            4
        ],
        [
            2,
            6
        ],
        [
            3,
            5
        ],
        [
            4,
            4
        ],
        [
            4,
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
            9
        ],
        [
            9,
            9
        ]
    ],
    9: [
        [
            0,
            1
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
            8
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
            3,
            4
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
            5,
            6
        ],
        [
            6,
            7
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
};
const jin_wei_list  = [
    [
        0,
        1
    ],
    [
        0,
        2
    ],
    [
        1,
        2
    ]
];

export function jinWeiDiff(lottery, {shi = true}) {
    let balls = lottery.split(' ').map(e => parseInt(e));
    let index = balls[shi ? 1 : 2] % 3;
    return jin_wei_list[index];
}

export function calcDiff(lottery) {
    let balls   = lottery.split(' ').map(e => parseInt(e));
    let segment = duanZu46(balls);
    let sum1    = sum(segment[0]);
    let sum2    = sum(segment[1]);
    return [
        duiMa(sum1 % 10),
        duiMa(sum2 % 10),
    ].sort();
}

function duiMa(value) {
    return value <= 5 ? value : value - 5;
}

function sum(values) {
    let sum = 0;
    values.forEach(e => sum = sum + e);
    return sum;
}

export function jinWeiZuHe(diff) {
    let zu3 = new Set();
    let zu6 = new Set();
    if (diff.length > 0) {
        let weiList = jinWeiList(diff);
        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j < weiList.length; j++) {
                let element = weiList[j];
                for (let k = 0; k < element.length; k++) {
                    let lotto = Array.from(new Set([
                        ...element[k],
                        i
                    ])).sort();
                    if (lotto.length === 2) {
                        zu3.add(lotto.join(' '));
                    }
                    if (lotto.length === 3) {
                        zu6.add(lotto.join(' '));
                    }
                }
            }
        }
    }
    return {
        zu3: Array.from(zu3),
        zu6: Array.from(zu6),
    };
}

export function jinWeiLottery(lottery, {shi = true}) {
    let diff = jinWeiDiff(lottery, {shi: shi});
    return jinWeiZuHe(diff);
}


function jinWeiList(jinList) {
    return jinList.map(i => jin_wei_table[i]);
}