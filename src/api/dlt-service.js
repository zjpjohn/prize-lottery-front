import {get, post} from "../libs/http";

export function fetchLast({
                              before,
                              size
                          }) {
    return post('/clotto/dlt/fetch/last', {
        before: before,
        size: size
    });
}

export function fetchDltHistory() {
    return post('/clotto/dlt/fetch/history');
}

export function fetchIncrHistory() {
    return post('/clotto/dlt/fetch/incr');
}

export function fetchForecast(period) {
    return post(`/clotto/dlt/fetch/${period}`);
}

export function batchCalcHit() {
    return post('/clotto/dlt/hit/batch');
}

export function incrCalcHit() {
    return post('/clotto/dlt/hit/incr');
}

export function calcHit(period) {
    return post('/clotto/dlt/hit', {period: period});
}

export function batchCalcRate() {
    return post('/clotto/dlt/rate/batch');
}

export function calcRate(period) {
    return post('/clotto/dlt/rate', {period: period});
}

export function incrCalcRate() {
    return post('/clotto/dlt/rate/incr');
}

export function batchCalcRank() {
    return post('/clotto/dlt/rank/batch');
}

export function calcRank(period) {
    return post('/clotto/dlt/rank', {period: period});
}

export function extractVip(period) {
    return post('/clotto/dlt/vip', {period: period});
}

export function extractHome(period) {
    return post('/clotto/dlt/home', {period: period});
}

export function calcItemChart(period) {
    return post('/clotto/dlt/chart/item', {period: period});
}

export function calcAllChart(period) {
    return post('/clotto/dlt/chart/all', {period: period});
}

export function calcVipChart(period) {
    return post('/clotto/dlt/chart/vip', {period: period});
}

export function calcHotChart(period) {
    return post('/clotto/dlt/chart/hot', {period: period});
}

export function calcRateChart(period) {
    return post('/clotto/dlt/chart/rate', {period: period});
}

export function latestPeriod() {
    return get('/slotto/adm/dlt/period');
}

export function lastPeriods({
                                type,
                                size
                            }) {
    return get(`/slotto/adm/${type}/periods`, {size: size});
}

export function latestRank() {
    return get('/slotto/adm/dlt/rank/period');
}

export function lotteryMasters(params) {
    return get('/slotto/adm/dlt/masters', params);
}

export function rankDataList(params) {
    return get('/slotto/adm/dlt/list', params);
}

export function itemChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/dlt/chart/item/${type}`, {period: period});
}

export function fullChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/dlt/chart/full/${type}`, {period: period});
}

export function vipChart({
                             type,
                             period
                         }) {
    return get(`/slotto/adm/dlt/chart/vip/${type}`, {period: period});
}

export function rateChart(period) {
    return get('/slotto/adm/dlt/chart/rate', {period: period});
}

export function hotChart(period) {
    return get('/slotto/adm/dlt/chart/hot', {period: period});
}
