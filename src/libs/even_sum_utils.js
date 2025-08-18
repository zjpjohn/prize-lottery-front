import {duanZu46} from "./wens_utils";

const even_table = {
    0: [
        [
            0,
            0
        ],
        [
            1,
            9
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
            4,
            6
        ],
        [
            5,
            5
        ],
        [
            0,
            5
        ],
    ],
    2: [
        [
            0,
            2
        ],
        [
            1,
            1
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
            7
        ],
        [
            6,
            6
        ],
        [
            1,
            6
        ]
    ],
    4: [
        [
            1,
            3
        ],
        [
            2,
            2
        ],
        [
            6,
            8
        ],
        [
            7,
            7
        ],
        [
            5,
            9
        ],
        [
            0,
            4
        ],
        [
            2,
            7
        ]
    ],
    6: [
        [
            0,
            6
        ],
        [
            1,
            5
        ],
        [
            3,
            3
        ],
        [
            2,
            4
        ],
        [
            8,
            8
        ],
        [
            7,
            9
        ],
        [
            3,
            8
        ]
    ],
    8: [
        [
            0,
            8
        ],
        [
            1,
            7
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
            9,
            9
        ],
        [
            4,
            9
        ]
    ],
};

export function calcEvenSum(lottery) {
    let codes  = lottery.split(' ').map(e => parseInt(e));
    let duanZu = duanZu46(codes);
    if (duanZu[0].length === 6) {
        return duanZu[0].filter(e => e % 2 === 0).sort();
    }
    return duanZu[1].filter(e => e % 2 === 0).sort();
}

function calcEven(value) {
    let sum = new Set();
    sum.add((value[0] + value[1]) % 10);
    sum.add((value[0] + value[2]) % 10);
    sum.add((value[1] + value[2]) % 10);
    return Array.from(sum).sort();
}

function evenCom(list) {
    return list.map(e => even_table[e]);
}

export function evenSumZuHe(even) {
    let zu3 = new Set();
    let zu6 = new Set();
    if (even.length > 0) {
        let com = evenCom(even);
        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j < com.length; j++) {
                let element = com[j];
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

export function evenSumLottery(lottery) {
    let evenSum = calcEvenSum(lottery);
    return evenSumZuHe(evenSum);
}