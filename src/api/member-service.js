import {del, get, post, put} from "../libs/http";


export function createPack(params) {
    return post('/ucenter/adm/pack/', params);
}

export function editPack(params) {
    return put('/ucenter/adm/pack/', params);
}

export function deletePack(packNo) {
    return del('/ucenter/adm/pack/', {packNo: packNo});
}

export function addPrivilege(params) {
    return post('/ucenter/adm/pack/privilege', params);
}

export function editPrivilege(params) {
    return put('/ucenter/adm/pack/privilege', params);
}

export function removePrivilege(pId) {
    return del('/ucenter/adm/pack/privilege', {pId: pId});
}

export function sortPrivilege(params) {
    return put('/ucenter/adm/pack/privilege/sort', params);
}

export function packList() {
    return get('/ucenter/adm/pack/list')
}

export function usingPackList() {
    return get('/ucenter/adm/pack/using/list')
}

export function packInfo(packNo) {
    return get('/ucenter/adm/pack/', {packNo: packNo})
}

export function packPrivileges() {
    return get('/ucenter/adm/pack/privilege/list');
}

export function packRankMetrics() {
    return get('/ucenter/adm/pack/metrics/rank');
}

export function packTimeMetrics() {
    return get('/ucenter/adm/pack/metrics/time');
}

export function packCensusChart(day) {
    return get('/ucenter/adm/pack/census/chart', {day: day});
}

export function openMember(params) {
    return post('/ucenter/adm/member/', params);
}

export function userMember(userId) {
    return get('/ucenter/adm/member/', {userId: userId});
}

export function memberList(params) {
    return get('/ucenter/adm/member/list', params);
}

export function memberLogs(params) {
    return get('/ucenter/adm/member/log/list', params);
}