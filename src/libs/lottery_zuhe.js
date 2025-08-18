import {calcIndex, lotteryDuiMa} from "./wens_utils";

export function lottoDanZu(lottery) {
    let balls = lottery.split(' ').map(e => parseInt(e));
    let duiMa = lotteryDuiMa(balls);
    if (duiMa.length === 2) {
        let danList = danMaZu(duiMa);
        let zuHe    = lotteryZuHe(danList);
        return {
            dan: danList.flatMap(e => e).sort(),
            zuHe: zuHe,
            zuHeTxt: zuHeTxt(zuHe),
        };
    }
    let ts      = duiMa.sort((e1, e2) => e2[0] - e1[0]).slice(0, 2);
    let danList = danMaZu(ts);
    let zuHe    = lotteryZuHe(danList);
    return {
        dan: danList.flatMap(e => e).sort(),
        zuHe: zuHe,
        zuHeTxt: zuHeTxt(zuHe),
    };
}

function zuHeTxt(values) {
    return values.map(e => e.join('')).sort().join(' ');
}

function lotteryZuHe(danMaZu) {
    let summarize = summarizeDuiMa(danMaZu);
    let result    = [];
    result.push(...calcZuHe(summarize[0], [
        0,
        2,
        4,
        6,
        8
    ]));
    result.push(...calcZuHe(summarize[1], [
        1,
        3,
        5,
        7,
        9
    ]));
    return result;
}

function calcZuHe(values, all) {
    let remain = all.filter(e => !values.includes(e));
    let result = [];
    result.push(values.sort());
    for (let i = 0; i < remain.length; i++) {
        for (let j = 0; j < values.length; j++) {
            result.push([
                values[j],
                remain[i]
            ].sort());
        }
    }
    return result;
}

function danMaZu(duiMa) {
    return [
        calcIndex((duiMa[0][0] + duiMa[0][1]) % 10),
        calcIndex((duiMa[1][0] + duiMa[1][1]) % 10),
    ];
}

function summarizeDuiMa(danMaZu) {
    let odd  = [],
        even = [];
    danMaZu.forEach(e => {
        isOdd(e[0]) ? odd.push(e[0]) : even.push(e[0]);
        isOdd(e[1]) ? odd.push(e[1]) : even.push(e[1]);
    })
    return {
        0: even,
        1: odd
    };
}

function isOdd(value) {
    return value % 2 === 1;
}

function isEven(value) {
    return value % 2 === 0;
}