import {get, post, put} from '../libs/http'

export function syncAdApp(acctId) {
    return post('/gromore/adm/app/sync', {acctId: acctId});
}

export function syncAppConf(appId) {
    return post(`/gromore/adm/app/conf/sync/${appId}`);
}

export function adAppList(params) {
    return get('/gromore/adm/app/list', params);
}

export function appDetail(appId) {
    return get(`/gromore/adm/app/${appId}`);
}

export function syncAdUnit(appId) {
    return post('/gromore/adm/unit/sync', {'appId': appId});
}

export function adUnitRatio({
                                unitId,
                                ratio
                            }) {
    return put(`/gromore/adm/unit/${unitId}`, {'ratio': ratio});
}

export function appUnitList(params) {
    return get('/gromore/adm/unit/list', params);
}

export function saveConf(params) {
    return post('/gromore/adm/reward/conf/', params);
}

export function rewardConf(unitId) {
    return get(`/gromore/adm/reward/conf/${unitId}`);
}

export function unitReports(params) {
    return get('/gromore/adm/metrics/unit', params);
}

export function adMetrics(acctId) {
    return get('/gromore/adm/metrics/', {acctId: acctId});
}

export function incomeMetrics(acctId) {
    return get('/gromore/adm/metrics/income', {acctId: acctId});
}

export function incomeChart(params) {
    return get('/gromore/adm/metrics/income/chart', params);
}

export function adDayMetrics(params) {
    return get('/gromore/adm/metrics/day', params);
}

export function impCntChart(params) {
    return get('/gromore/adm/metrics/imp/chart', params);
}

export function appMetric(appId) {
    return get(`/gromore/adm/metrics/app/${appId}`);
}

export function revenueChart() {
    return get('/gromore/adm/metrics/revenue/chart');
}

export function totalAdMetrics(days) {
    return get('/gromore/adm/metrics/total', {days: days});
}

export function createAdAccount(params) {
    return post('/gromore/adm/acct/', params);
}

export function editAdAccount(params) {
    return put('/gromore/adm/acct/', params);
}

export function adAccount(id) {
    return get(`/gromore/adm/acct/${id}`);
}

export function adAccountList() {
    return get('/gromore/adm/acct/list');
}

export function activeAcctCorps() {
    return get('/gromore/adm/acct/active/corps');
}