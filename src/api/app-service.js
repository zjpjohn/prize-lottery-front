import {del, get, post, postJson, put, putJson} from '../libs/http'

export function addApp(params) {
    return post('/lope/adm/app/', params);
}

export function editApp(params) {
    return put('/lope/adm/app/', params);
}

export function getAppList() {
    return get('/lope/adm/app/list');
}

export function getAppInfo(id) {
    return get(`/lope/adm/app/${id}`)
}

export function getAppByNo(appNo) {
    return get('/lope/adm/app/', {appNo: appNo})
}

export function addAppVersion(params) {
    return postJson('/lope/adm/app/version/', params);
}

export function editAppVersion(params) {
    return putJson('/lope/adm/app/version/', params);
}

export function offlineAppVersion(id) {
    return put(`/lope/adm/app/version/offline/${id}`);
}

export function onlineAppVersion(id) {
    return put(`/lope/adm/app/version/online/${id}`)
}

export function issueMainVersion(id) {
    return put(`/lope/adm/app/version/main/${id}`);
}

export function getAppVersionList(params) {
    return get('/lope/adm/app/version/list', params);
}

export function getAppVersion(id) {
    return get(`/lope/adm/app/version/${id}`);
}

export function batchAppResource(params) {
    return postJson('/lope/adm/resource/batch', params);
}

export function exportAppResource(appNo) {
    return get('/lope/adm/resource/export', {appNo: appNo});
}

export function addAppResource(params) {
    return postJson('/lope/adm/resource/', params);
}

export function editAppResource(params) {
    return putJson('/lope/adm/resource/', params);
}

export function resourceState({
                                  id,
                                  action
                              }) {
    return put('/lope/adm/resource/switch', {
        id: id,
        action: action
    });
}

export function resourceList(params) {
    return get('/lope/adm/resource/list', params);
}

export function resourceDetail(id) {
    return get(`/lope/adm/resource/${id}`);
}

export function loadResources(appNo) {
    return put(`/lope/adm/resource/load/${appNo}`);
}

export function createAssistant(params) {
    return post('/lope/adm/assistant/', params);
}

export function editAssistant(params) {
    return put('/lope/adm/assistant/', params);
}

export function sortAssistant(params = {
    id,
    position
}) {
    return put('/lope/adm/assistant/sort', params);
}

export function assistantApp(appNo) {
    return get(`/lope/adm/assistant/app/${appNo}`);
}

export function assistantList(params) {
    return get('/lope/adm/assistant/list', params);
}

export function assistantDetail(id) {
    return get(`/lope/adm/assistant/${id}`);
}

export function createVerify(params) {
    return post('/lope/adm/uverify', params);
}

export function editVerify(params) {
    return put('/lope/adm/uverify', params);
}

export function appVerify(appNo) {
    return get('/lope/adm/uverify', {appNo: appNo});
}

export function addComment(params) {
    return post('/lope/adm/comment/', params);
}

export function batchComments(params) {
    return postJson('/lope/adm/comment/batch', params);
}

export function editComment(params) {
    return put('/lope/adm/comment/', params);
}

export function appComment(id) {
    return get('/lope/adm/comment/', {id: id});
}

export function commentList(params) {
    return get('/lope/adm/comment/list', params);
}

export function createContact(params) {
    return post('/lope/adm/contact/', params);
}

export function editContact(params) {
    return put('/lope/adm/contact/', params);
}

export function clearContact(appNo) {
    return del('/lope/adm/contact/', {appNo: appNo});
}

export function contactInfo(id) {
    return get('/lope/adm/contact/', {id: id});
}

export function contactList(params) {
    return get('/lope/adm/contact/list', params);
}

