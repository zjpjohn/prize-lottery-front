import {get, post, postJson, put} from "../libs/http";

export function latestPeriod() {
    return get('/slotto/adm/fsd/period');
}

export function latestRankPeriod() {
    return get('/slotto/adm/fsd/rank/period');
}

export function getFc3dRankedDatas(params) {
    return get('/slotto/adm/fsd/list', params);
}

export function getFc3dMasterList(params) {
    return get('/slotto/adm/fsd/masters', params);
}

export function getFc3dItemChart({
                                     period,
                                     type
                                 }) {
    return get(`/slotto/adm/fsd/chart/item/${type}`, {period: period});
}

export function getFc3dFullChart({
                                     period,
                                     type
                                 }) {
    return get(`/slotto/adm/fsd/chart/full/${type}`, {period: period});
}

export function getFc3dVipChart({
                                    period,
                                    type
                                }) {
    return get(`/slotto/adm/fsd/chart/vip/${type}`, {period: period});
}

export function getFc3dRateChart(period) {
    return get(`/slotto/adm/fsd/chart/rate`, {period: period});
}

export function getFc3dHotChart(period) {
    return get(`/slotto/adm/fsd/chart/hot`, {period: period});
}

export function fetchFc3dHistory() {
    return post('/clotto/fc3d/fetch/history');
}

export function fetchIncrHistory() {
    return post('/clotto/fc3d/fetch/incr/history');
}

export function fetchFc3dLast({
                                  before,
                                  size
                              }) {
    return post('/clotto/fc3d/fetch/last', {
        before: before,
        size: size
    });
}

export function fetchFc3dForecast(period) {
    return post(`/clotto/fc3d/fetch/${period}`);
}

export function batchCalcFc3dHit() {
    return post('/clotto/fc3d/hit/batch');
}

export function incrCalcHit() {
    return post('/clotto/fc3d/hit/incr');
}

export function calcFc3dHit(period) {
    return post(`/clotto/fc3d/hit`, {period: period});
}

export function batchCalcFc3dRate() {
    return post('/clotto/fc3d/rate/batch');
}

export function incrCalcFc3dRate() {
    return post('/clotto/fc3d/rate/incr');
}

export function calcFc3dRate(period) {
    return post(`/clotto/fc3d/rate`, {period: period});
}

export function batchCalcFc3dRank() {
    return post('/clotto/fc3d/rank/batch');
}

export function calcFc3dRank(period) {
    return post(`/clotto/fc3d/rank`, {period: period});
}

export function extractFc3dVipMaster(period) {
    return post(`/clotto/fc3d/vip`, {period: period});
}

export function extractFc3dHomeMaster(period) {
    return post(`/clotto/fc3d/home`, {period: period});
}

export function calcFc3dItemChart(period) {
    return post(`/clotto/fc3d/chart/item`, {period: period});
}

export function calcFc3dAllChart(period) {
    return post(`/clotto/fc3d/chart/all`, {period: period});
}

export function calcFc3dVipChart(period) {
    return post(`/clotto/fc3d/chart/vip`, {period: period});
}

export function calcFc3dRateChart(period) {
    return post(`/clotto/fc3d/chart/rate`, {period: period});
}

export function calcFc3dHotChart(period) {
    return post(`/clotto/fc3d/chart/hot`, {period: period});
}

export function calcFc3dIndex(period) {
    return post('/clotto/fc3d/index', {period: period});
}

export function differAnalyze(period) {
    return get('/clotto/fc3d/differ/analyze', {period: period});
}

export function combineAnalyze(period) {
    return get('/clotto/fc3d/combine/analyze', {period: period});
}

export function reverseAnalyze(period) {
    return get('/clotto/fc3d/reverse/analyze', {period: period});
}

export function comRecommendAna(params) {
    return postJson('/clotto/fc3d/comRec/analyze', params);
}

export function dkRecommend(params) {
    return postJson('/clotto/fc3d/dk/recommend', params);
}

export function comRecommendCalc(period) {
    return put(`/clotto/fc3d/comRec/calc/${period}`);
}

export function comRecommendList(params) {
    return get('/slotto/adm/fsd/com/recommend/list', params);
}

export function comRecommend(period) {
    return get('/slotto/adm/fsd/com/recommend', {period: period});
}

export function itemRankList({
                                 channel,
                                 period
                             }) {
    return get('/slotto/adm/fsd/item/list', {
        channel: channel,
        period: period
    });
}

export function mulRankList(period) {
    return get('/slotto/adm/fsd/mul/list', {
        period: period
    });
}

export function fc3dDanFilter(params) {
    return postJson('/slotto/adm/fsd/dan/best', params);
}

export function com7Combine(params) {
    return postJson('/slotto/adm/fsd/com7/combine', params);
}

export function fsdItemCensus(period) {
    return get('/slotto/adm/fsd/item/census', {period: period});
}

export function fsdItemTable(period, limit) {
    return get('/slotto/adm/fsd/item/table', {
        period: period,
        limit: limit
    });
}

export function fsdPivotList(params) {
    return get('/slotto/adm/fsd/pivot/list', params);
}

export function fsdPivot(id) {
    return get('/slotto/adm/fsd/pivot', {id: id});
}

export function addFc3dPivot(params) {
    return postJson('/clotto/fc3d/pivot', params);
}

export function calcFc3dPivotHit(period) {
    return put('/clotto/fc3d/pivot', {period: period});
}

export function fc3dDan3Filter(params) {
    return postJson('/slotto/adm/fsd/d3/filter', params);
}

export function fc3dWholeBest(params) {
    return get('/slotto/adm/fsd/whole/best', params);
}

export function fc3dD1D2Filter(params) {
    return get('/slotto/adm/fsd/dan/filter', params);
}

export function fc3dComFilter(params) {
    return postJson('/slotto/adm/fsd/dan3/filter', params);
}
