import {get, post, postJson, put, putJson} from "../libs/http";

export function userMetrics() {
    return get('/ucenter/adm/census');
}

export function metricsTrends() {
    return get('/ucenter/adm/census/trends');
}

export function userMetricsChart(day) {
    return get('/ucenter/adm/census/chart', {day: day});
}

export function memberTotal(days) {
    return get('/ucenter/adm/census/member/total', {days: days});
}

export function userList(params) {
    return get('/ucenter/adm/user/list', params);
}

export function userInfo(uid) {
    return get('/ucenter/adm/user/', {userId: uid});
}

export function launchList(params) {
    return get('/ucenter/adm/user/launch/list', params);
}

export function userBalance(uid) {
    return get('/ucenter/adm/user/balance', {userId: uid});
}

export function inviteMaster(userId) {
    return get('/ucenter/adm/user/invite/master', {userId: userId});
}

export function totalUserMetrics(days) {
    return get('/ucenter/adm/census/total', {days: days});
}

export function balanceCharge(userId, value) {
    return put('/ucenter/adm/user/balance/charge', {
        userId: userId,
        value: value
    });
}

export function balanceWithdraw(uid) {
    return put('/ucenter/adm/user/balance/withdraw', {userId: uid});
}

export function balanceProfit(uid) {
    return put('/ucenter/adm/user/balance/profit', {userId: uid});
}

export function activeUserList(params) {
    return get('/ucenter/adm/user/active/list', params);
}

export function createPutChannel(params) {
    return post('/ucenter/put/channel', params);
}

export function editPutChannel(params) {
    return put('/ucenter/put/channel', params);
}

export function putChannel(bizNo) {
    return get('/ucenter/put/channel', {bizNo: bizNo});
}

export function putChannelList(params) {
    return get('/ucenter/put/channel/list', params);
}

export function createPutRecord(params) {
    return post('/ucenter/put/record', params);
}

export function editPutRecord(params) {
    return put('/ucenter/put/record', params);
}

export function putRecords(channel) {
    return get('/ucenter/put/record/list', {channel: channel});
}

export function addActivity(params) {
    return postJson('/ucenter/adm/activity/', params);
}

export function editActivity(params) {
    return putJson('/ucenter/adm/activity/', params);
}

export function activityList(params) {
    return get('/ucenter/adm/activity/list', params);
}

export function activityDetail(id) {
    return get('/ucenter/adm/activity/', {id: id});
}

export function activityDrawList(params) {
    return get('/ucenter/adm/activity/draw/list', params);
}

export function activityDraw(id) {
    return get('/ucentner/adm/activity/draw/', {id: id});
}
