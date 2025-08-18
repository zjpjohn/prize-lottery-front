import {del, get, post} from "../libs/http";

export function queryMasterList(params) {
    return get('/slotto/adm/master/list', params);
}

export function masterDetail(masterId) {
    return get(`/slotto/adm/master/${masterId}`);
}

export function initLoadMaster(type) {
    return post('/clotto/master/load', {type: type});
}

export function extractGlads() {
    return post('/clotto/master/glad/extract');
}

export function removeGlad(day) {
    return del('/clotto/master/glad', {day: day});
}

export function masterGladList(params) {
    return get('/slotto/adm/master/glad/list', params);
}

export function extractMasterFeeds() {
    return post('/clotto/master/feed/extract');
}

export function removeMasterFeeds(params) {
    return del('/clotto/master/feed', params);
}

export function masterFeedList(params) {
    return get('/slotto/adm/master/feeds/list', params);
}

export function extractEvictMaster(type) {
    return post('/clotto/master/evict/extract', {type: type});
}

export function clearEvictForecast(type) {
    return del('/clotto/master/evict/forecast', {type: type});
}

export function clearEvictRecord(type) {
    return del('/clotto/master/evict/record', {type: type});
}