function duiMa(value) {
    let code   = value < 5 ? value + 5 : value - 5;
    let result = [
        value,
        code
    ];
    result.push(code - 2 < 0 ? code - 2 + 10 : code - 2);
    result.push(code - 1 < 0 ? code - 1 + 10 : code - 1);
    result.push(code + 1 > 9 ? code + 1 - 10 : code + 1);
    result.push(code + 2 > 9 ? code + 2 - 10 : code + 2);
    return result.sort();
}

function duanZuItem(code) {
    let segment  = duiMa(code);
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
    let segment1 = remain.filter(e => e % 2 === 0);
    let segment2 = remain.filter(e => e % 2 === 1);
    return [
        segment,
        segment1,
        segment2
    ];
}

export function duanZu(lottery) {
    let codes  = Array.from(new Set(lottery.split(' ').map(e => parseInt(e))));
    let result = {};
    for (let i = 0; i < codes.length; i++) {
        result[i] = duanZuItem(codes[i]);
    }
    return result;
}

function duanZuTxtItem(table) {
    return table[0].join('') + '-' + table[1].join('') + '-' + table[2].join('');
}

export function duanZuTxt(table) {
    let result = {};
    Object.keys(table).forEach(key => result[key] = duanZuTxtItem(table[key]));
    return result;
}

export function duanZuInfo(lottery) {
    let table  = duanZu(lottery);
    let txt    = duanZuTxt(table);
    let result = {};
    Object.keys(table).forEach(key => {
        result[key] = {
            txt: txt[key],
            table: table[key],
            excludes: [],
        };
    });
    return result;
}

function duanZuLottery(table) {
    let data = [];
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

export function duanZuTable(table) {
    return duanZuLottery(table);
}