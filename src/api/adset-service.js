import {get, post, put} from "../libs/http";

export function createAdMedia(params) {
    return post('/gromore/adm/ads/media', params);
}

export function editMedia(params) {
    return put('/gromore/adm/ads/media', params)
}

export function adMediaInfo(id) {
    return get('/gromore/adm/ads/media', {id: id});
}

export function adMediaList(params) {
    return get('/gromore/adm/ads/media/list', params);
}

export function createAdUnit(params) {
    return post('/gromore/adm/ads/unit', params);
}

export function editAdUnit(params) {
    return put('/gromore/adm/ads/unit', params);
}

export function adUnitList(mediaId) {
    return get('/gromore/adm/ads/unit/list', {mediaId: mediaId});
}

export function adReportList(params) {
    return get('/gromore/adm/ads/report/list', params);
}

export function adTimeMetrics(appNo) {
    return get('/gromore/adm/ads/time/metrics', {appNo: appNo});
}

export function appMediaMetrics(mediaId) {
    return get('/gromore/adm/ads/media/metrics', {mediaId: mediaId});
}

export function adTypeIncomes(appNo) {
    return get('/gromore/adm/ads/type/incomes', {appNo: appNo});
}

export function adIncomeChart(params) {
    return get('/gromore/adm/ads/income/chart', params);
}