import {get, post} from "../libs/http";

export function fetchLast({
                              before,
                              size
                          }) {
    return post('/clotto/qlc/fetch/last', {
        before: before,
        size: size
    });
}

export function fetchForecast(period) {
    return post(`/clotto/qlc/fetch/${period}`);
}

export function fetchQlcHistory() {
    return post('/clotto/qlc/fetch/history');
}

export function fetchIncrHistory() {
    return post('/clotto/qlc/fetch/incr/history');
}

export function batchCalcHit() {
    return post('/clotto/qlc/hit/batch');
}

export function incrCalcHit() {
    return post('/clotto/qlc/hit/incr');
}

export function calcHit(period) {
    return post('/clotto/qlc/hit', {period: period});
}

export function batchCalcRate() {
    return post('/clotto/qlc/rate/batch');
}

export function incrCalcRate() {
    return post('/clotto/qlc/rate/incr');
}

export function calcRate(period) {
    return post('/clotto/qlc/rate', {period: period});
}

export function batchCalcRank() {
    return post('/clotto/qlc/rank/batch');
}

export function calcRank(period) {
    return post('/clotto/qlc/rank', {period: period});
}

export function extractVip(period) {
    return post('/clotto/qlc/vip', {period: period});
}

export function extractHome(period) {
    return post('/clotto/qlc/home', {period: period});
}

export function calcItemChart(period) {
    return post('/clotto/qlc/chart/item', {period: period});
}

export function calcAllChart(period) {
    return post('/clotto/qlc/chart/all', {period: period});
}

export function calcVipChart(period) {
    return post('/clotto/qlc/chart/vip', {period: period});
}

export function calcRateChart(period) {
    return post('/clotto/qlc/chart/rate', {period: period});
}

export function calcHotChart(period) {
    return post('/clotto/qlc/chart/hot', {period: period});
}

export function latestPeriod() {
    return get('/slotto/adm/qlc/period');
}

export function latestRank() {
    return get('/slotto/adm/qlc/rank/period');
}

export function lotteryMasters(params) {
    return get('/slotto/adm/qlc/masters', params);
}

export function rankedDataList(params) {
    return get('/slotto/adm/qlc/list', params);
}

export function itemChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/qlc/chart/item/${type}`, {period: period});
}

export function fullChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/qlc/chart/full/${type}`, {period: period});
}

export function vipChart({
                             type,
                             period
                         }) {
    return get(`/slotto/adm/qlc/chart/vip/${type}`, {period: period});
}

export function rateChart(period) {
    return get('/slotto/adm/qlc/chart/rate', {period: period});
}

export function hotChart(period) {
    return get('/slotto/adm/qlc/chart/hot', {period: period});
}

export function qlcWholeBest(params) {
    return get('/slotto/adm/qlc/whole/best', params);
}