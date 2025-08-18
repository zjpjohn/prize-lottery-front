import {get, post, postJson, put} from "../libs/http";

export function fetchLast({
                              period,
                              count
                          }) {
    return post('/clotto/pl3/fetch/last', {
        before: period,
        size: count
    });
}

export function fetchForecast(period) {
    return post(`/clotto/pl3/fetch/${period}`);
}

export function fetchPl3History() {
    return post('/clotto/pl3/fetch/history');
}

export function fetchIncrHistory() {
    return post('/clotto/pl3/fetch/incr/history');
}

export function calcHit(period) {
    return post('/clotto/pl3/hit', {period: period});
}

export function batchCalcHit() {
    return post('/clotto/pl3/hit/batch');
}

export function incrCalcHit() {
    return post('/clotto/pl3/hit/incr');
}

export function calcRate(period) {
    return post('/clotto/pl3/rate', {period: period});
}

export function batchCalcRate() {
    return post('/clotto/pl3/rate/batch');
}

export function incrCalcRate() {
    return post('/clotto/pl3/rate/incr');
}

export function calcRank(period) {
    return post('/clotto/pl3/rank', {period: period});
}

export function batchCalcRank() {
    return post('/clotto/pl3/rank/batch');
}

export function extractVip(period) {
    return post('/clotto/pl3/vip', {period: period});
}

export function extractHome(period) {
    return post('/clotto/pl3/home', {period: period});
}

export function calcItemChart(period) {
    return post('/clotto/pl3/chart/item', {period: period});
}

export function calcAllChart(period) {
    return post('/clotto/pl3/chart/all', {period: period});
}

export function calcVipChart(period) {
    return post('/clotto/pl3/chart/vip', {period: period});
}

export function calcPl3Index(period) {
    return post('/clotto/pl3/index', {period: period});
}

export function calcRateChart(period) {
    return post('/clotto/pl3/chart/rate', {period: period});
}

export function calcHotChart(period) {
    return post('/clotto/pl3/chart/hot', {period: period});
}

export function latestN3Period(type) {
    if (type === 'fc3d') {
        return get('/slotto/adm/fsd/period');
    }
    return get('/slotto/adm/pls/period');
}

export function latestPeriod() {
    return get('/slotto/adm/pls/period');
}

export function latestRank() {
    return get('/slotto/adm/pls/rank/period');
}

export function lotteryMasters(params) {
    return get('/slotto/adm/pls/masters', params);
}

export function rankDataList(params) {
    return get('/slotto/adm/pls/list', params);
}

export function itemChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/pls/chart/item/${type}`, {period: period});
}

export function fullChart({
                              type,
                              period
                          }) {
    return get(`/slotto/adm/pls/chart/full/${type}`, {period: period});
}

export function vipChart({
                             type,
                             period
                         }) {
    return get(`/slotto/adm/pls/chart/vip/${type}`, {period: period});
}

export function rateChart(period) {
    return get('/slotto/adm/pls/chart/rate', {period: period});
}

export function hotChart(period) {
    return get('/slotto/adm/pls/chart/hot', {period: period});
}

export function comRecommendAna(params) {
    return postJson('/clotto/pl3/comRec/analyze', params);
}

export function dkRecommend(params) {
    return postJson('/clotto/pl3/dk/recommend', params);
}

export function comRecommendCalc(period) {
    return put(`/clotto/pl3/comRec/calc/${period}`);
}

export function comRecommendList(params) {
    return get('/slotto/adm/pls/com/recommend/list', params);
}

export function comRecommend(period) {
    return get('/slotto/adm/pls/com/recommend', {period: period});
}

export function itemRankList({
                                 channel,
                                 period
                             }) {
    return get('/slotto/adm/pls/item/list', {
        channel: channel,
        period: period
    });
}

export function mulRankList(period) {
    return get('/slotto/adm/pls/mul/list', {
        period: period
    });
}

export function pl3DanFilter(params) {
    return postJson('/slotto/adm/pls/dan/best', params);
}

export function com7Combine(params) {
    return postJson('/slotto/adm/pls/com7/combine', params);
}

export function differAnalyze(period) {
    return get('/clotto/pl3/differ/analyze', {period: period});
}


export function plsItemCensus(period) {
    return get('/slotto/adm/pls/item/census', {period: period});
}

export function plsItemTable(period, limit) {
    return get('/slotto/adm/pls/item/table', {
        period: period,
        limit: limit
    });
}


export function pl3PivotList(params) {
    return get('/slotto/adm/pls/pivot/list', params);
}

export function pl3Pivot(id) {
    return get('/slotto/adm/pls/pivot', {id: id});
}

export function addPl3Pivot(params) {
    return postJson('/clotto/pl3/pivot', params);
}

export function calcPl3PivotHit(period) {
    return put('/clotto/pl3/pivot', {period: period});
}

export function pl3Dan3Filter(params) {
    return postJson('/slotto/adm/pls/d3/filter', params);
}

export function pl3WholeBest(params) {
    return get('/slotto/adm/pls/whole/best', params);
}

export function pl3D1D2Filter(params) {
    return get('/slotto/adm/pls/dan/filter', params);
}

export function pl3ComFilter(params) {
    return postJson('/slotto/adm/pls/dan3/filter', params);
}
