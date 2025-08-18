import {get, post} from "../libs/http";

export function fetchLast({
                              period,
                              size
                          }) {
    return post('/clotto/ssq/fetch/last', {
        before: period,
        size: size
    });
}

export function fetchForecast(period) {
    return post(`/clotto/ssq/fetch/${period}`);
}

export function fetchSsqHistory() {
    return post('/clotto/ssq/fetch/history');
}

export function fetchIncrHistory() {
    return post('/clotto/ssq/fetch/incr');
}

export function calcHit(period) {
    return post('/clotto/ssq/hit', {period: period});
}

export function batchCalcHit() {
    return post('/clotto/ssq/hit/batch');
}

export function incrCalcHit() {
    return post('/clotto/ssq/hit/incr');
}

export function calcRate(period) {
    return post('/clotto/ssq/rate', {period: period});
}

export function incrCalcRate() {
    return post('/clotto/ssq/rate/incr');
}

export function batchCalcRate() {
    return post('/clotto/ssq/rate/batch');
}

export function calcRank(period) {
    return post('/clotto/ssq/rank', {period: period});
}

export function batchCalcRank() {
    return post('/clotto/ssq/rank/batch');
}

export function extractVip(period) {
    return post('/clotto/ssq/vip', {period: period});
}

export function extractHome(period) {
    return post('/clotto/ssq/home', {period: period});
}

export function calcItemChart(period) {
    return post('/clotto/ssq/chart/item', {period: period});
}

export function calcAllChart(period) {
    return post('/clotto/ssq/chart/all', {period: period});
}

export function calcVipChart(period) {
    return post('/clotto/ssq/chart/vip', {period: period});
}

export function calcRateChart(period) {
    return post('/clotto/ssq/chart/rate', {period: period});
}

export function calcHotChart(period) {
    return post('/clotto/ssq/chart/hot', {period: period});
}

export function latestPeriod() {
    return get('/slotto/adm/ssq/period');
}

export function latestRank() {
    return get('/slotto/adm/ssq/rank/period');
}

export function lotteryMasters(params) {
    return get('/slotto/adm/ssq/masters', params);
}

export function rankDataList(params) {
    return get('/slotto/adm/ssq/list', params);
}

export function itemChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/ssq/chart/item/${type}`, {period: period});
}

export function fullChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/ssq/chart/full/${type}`, {period: period});
}

export function vipChart({
                             type,
                             period
                         }) {
    return get(`/slotto/adm/ssq/chart/vip/${type}`, {period: period});
}

export function rateChart(period) {
    return get('/slotto/adm/ssq/chart/rate', {period: period});
}

export function hotChart(period) {
    return get('/slotto/adm/ssq/chart/hot', {period: period});
}
