import {get, post, postJson, put, putJson} from "../libs/http";

export function addPayChannel(params) {
    return post('/pay/adm/channel/', params);
}

export function editPayChannel(params) {
    return put('/pay/adm/channel/', params);
}

export function payChannel(id) {
    return get('/pay/adm/channel/', {'id': id});
}

export function payChannelList() {
    return get('/pay/adm/channel/list');
}

export function addAuditRule(params) {
    return post('/pay/adm/audit/rule/', params);
}

export function editAuditRule(params) {
    return put('/pay/adm/audit/rule/', params);
}

export function auditRule(id) {
    return get('/pay/adm/audit/rule/', {'id': id});
}

export function auditRuleList() {
    return get('/pay/adm/audit/rule/list');
}

export function transferList(params) {
    return get('/pay/adm/transfer/list', params);
}

export function transferRecord(transNo) {
    return get('/pay/adm/transfer/', {'transNo': transNo});
}

export function auditTransfer(params) {
    return post('/pay/adm/transfer/audit', params);
}

export function auditTransfers(transNo) {
    return get('/pay/adm/transfer/audit/list', {'transNo': transNo});
}


export function orderMetrics() {
    return get('/pay/adm/order/metrics');
}

export function orderTrends() {
    return get('/pay/adm/order/trends');
}

export function orderChart(day) {
    return get('/pay/adm/order/chart', {day: day});
}

export function orderList(params) {
    return get('/pay/adm/order/list', params);
}

export function orderDetail(orderNo) {
    return get('/pay/adm/order/', {orderNo: orderNo});
}

export function payTotalMetrics(days) {
    return get('/pay/adm/metrics/total', {days: days});
}

export function transferStatistics() {
    return get('/pay/adm/transfer/metrics');
}

export function createWithLevel(params) {
    return postJson('/ucenter/adm/withdraw/level', params);
}

export function editWithLevel(params) {
    return putJson('/ucenter/adm/withdraw/level', params);
}

export function withdrawLevel(id) {
    return get(`/ucenter/adm/withdraw/level/${id}`);
}

export function withdrawLevelList(params) {
    return get('/ucenter/adm/withdraw/level/list', params);
}

export function withdrawScenes() {
    return get('/ucenter/share/withdraw/scenes');
}

export function addWithdrawRule(params) {
    return post('/ucenter/adm/withdraw/rule', params);
}

export function editWithdrawRule(params) {
    return put('/ucenter/adm/withdraw/rule', params);
}

export function withdrawRule(id) {
    return get('/ucenter/adm/withdraw/rule', {id: id});
}

export function withdrawRuleList() {
    return get('/ucenter/adm/withdraw/rule/list');
}

export function withdrawList(params) {
    return get('/ucenter/adm/withdraw/list', params);
}

export function withdrawRecord(seqNo) {
    return get('/ucenter/adm/withdraw/', {'seqNo': seqNo});
}
