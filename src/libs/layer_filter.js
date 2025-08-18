import {filterDan, filterDuanZu, filterKua, filterSum, isZu3, isZu6, twoMaFilter} from "./wens_utils";
import {Message} from "element-ui";

export function danFilter({
                              dan1 = [],
                              dan2 = [],
                              dan3 = [],
                              dan4 = [],
                              twoMa = [],
                              sysDan = [],
                              tenDui = [],
                              currDuan = {},
                              lastDuan = {}
                          }) {
    if (dan1.length === 0) {
        Message.error('请选择胆码');
        return {
            name: '胆码',
            condition: [],
            zu3: [],
            zu6: [],
        }
    }
    let zu3 = new Set();
    let zu6 = new Set();
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 10; k++) {
                if (!filterDan(i, j, k, dan1)) {
                    continue;
                }
                if (!filterDan(i, j, k, dan2)) {
                    continue;
                }
                if (!filterDan(i, j, k, dan3)) {
                    continue;
                }
                if (!filterDan(i, j, k, dan4)) {
                    continue;
                }
                if (!filterDan(i, j, k, sysDan)) {
                    continue;
                }
                if (!filterDan(i, j, k, tenDui)) {
                    continue;
                }
                if (!twoMaFilter(i, j, k, twoMa)) {
                    continue;
                }
                if (filterDuanZu(i, j, k, currDuan)) {
                    continue;
                }
                if (filterDuanZu(i, j, k, lastDuan)) {
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
    return {
        name: '胆码',
        condition: dan1,
        zu3: Array.from(zu3),
        zu6: Array.from(zu6),
    }
}

export function jinWeiFilter(zu3, zu6, jinWei) {
    let zu3Filter = [...zu3];
    let zu6Filter = [...zu6];
    if (jinWei.diff.length <= 0) {
        return {
            name: '和差',
            condition: [],
            zu3: zu3Filter,
            zu6: zu6Filter,
        };
    }
    if (zu3 !== null && zu3.length !== 0) {
        zu3Filter = zu3Filter.filter(e => jinWei.filter.zu3.includes(e));
    }
    if (zu6 !== null && zu6.length !== 0) {
        zu6Filter = zu6Filter.filter(e => jinWei.filter.zu6.includes(e));
    }
    return {
        name: '和差',
        condition: jinWei.diff,
        zu3: zu3Filter,
        zu6: zu6Filter,
    };
}

export function kuaFilter(zu3, zu6, kuaList) {
    let zu3Filter = [...zu3];
    let zu6Filter = [...zu6];
    if (kuaList.length === 0) {
        return {
            name: '跨度',
            condition: [],
            zu3: zu3Filter,
            zu6: zu6Filter,
        };
    }
    if (zu3 !== null && zu3.length !== 0) {
        zu3Filter = zu3Filter.map(e => e.split(' ').map(e => parseInt(e))).filter(e => {
            let kua = Math.abs(e[0] - e[1]);
            return kuaList.includes(kua);
        }).map(e => e.join(' '));
    }
    if (zu6 !== null && zu6.length !== 0) {
        zu6Filter =
            zu6Filter.map(e => e.split(' ').map(e => parseInt(e))).filter(e => filterKua(e[0], e[1], e[2], kuaList)).map(e => e.join(' '));
    }
    return {
        name: '跨度',
        condition: kuaList,
        zu3: zu3Filter,
        zu6: zu6Filter,
    };
}

export function sumFilter(zu3, zu6, sumList) {
    let zu3Filter = [...zu3];
    let zu6Filter = [...zu6];
    if (sumList.length === 0) {
        return {
            name: '和值',
            condition: [],
            zu3: zu3Filter,
            zu6: zu6Filter,
        };
    }
    if (zu3 !== null && zu3.length !== 0) {
        zu3Filter = zu3Filter.map(e => e.split(' ').map(e => parseInt(e))).filter(e => {
            let sum1 = e[0] + e[0] + e[1];
            let sum2 = e[0] + e[1] + e[1];
            return sumList.includes(sum1) || sumList.includes(sum2);
        }).map(e => e.join(' '));
    }
    if (zu6 !== null && zu6.length !== 0) {
        zu6Filter =
            zu6Filter.map(e => e.split(' ').map(e => parseInt(e))).filter(e => filterSum(e[0], e[1], e[2], sumList)).map(e => e.join(' '));
    }
    return {
        name: '和值',
        condition: sumList,
        zu3: zu3Filter,
        zu6: zu6Filter,
    };
}

export function evenSumFilter(zu3, zu6, evenSum) {
    let zu3Filter = [...zu3];
    let zu6Filter = [...zu6];
    if (evenSum.even.length <= 0) {
        return {
            name: '偶合',
            condition: [],
            zu3: zu3Filter,
            zu6: zu6Filter,
        };
    }
    if (zu3 !== null && zu3.length !== 0) {
        zu3Filter = zu3Filter.filter(e => evenSum.filter.zu3.includes(e));
    }
    if (zu6 !== null && zu6.length !== 0) {
        zu6Filter = zu6Filter.filter(e => evenSum.filter.zu6.includes(e));
    }
    return {
        name: '偶合',
        condition: evenSum.even,
        zu3: zu3Filter,
        zu6: zu6Filter,
    };
}