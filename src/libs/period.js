const FC3D_MAX = '351';
const PL3_MAX  = '351';
const SSQ_MAX  = '151';
const DLT_MAX  = '151';
const QLC_MAX  = '151';

function calcPeriod(period, delta, max) {
    let intPeriod      = parseInt(period);
    let possiblePeriod = intPeriod - delta;
    let pStr           = String(possiblePeriod);
    let year           = pStr.substring(0, 4);
    let tail           = pStr.substring(pStr.length - 4, pStr.length);
    let maxPeriod      = year + max;
    if (possiblePeriod > parseInt(maxPeriod)) {
        let start  = parseInt(period.substring(0, 4) + '001');
        let kDelta = intPeriod - start;
        return String(parseInt(maxPeriod) - delta + kDelta + 1);
    } else if (tail === '000') {
        return String(parseInt(year) - 1) + max;
    }
    return String(possiblePeriod);
}

export function lastFsdPeriod(period, delta) {
    return calcPeriod(period, delta, FC3D_MAX);
}

export function lastPlsPeriod(period, delta) {
    return calcPeriod(period, delta, PL3_MAX);
}

export function lastSsqPeriod(period, delta) {
    return calcPeriod(period, delta, SSQ_MAX);
}

export function lastDltPeriod(period, delta) {
    return calcPeriod(period, delta, DLT_MAX);
}

export function lastQlcPeriod(period, delta) {
    return calcPeriod(period, delta, QLC_MAX);
}

export function lastKl8Period(period, delta) {
    return calcPeriod(period, delta, FC3D_MAX);
}
