import {del, get, post, put} from "../libs/http";

export function feedbackList(params) {
    return get('/lope/adm/feedback/list', params);
}

export function feedbackDetail(id) {
    return get(`/lope/adm/feedback/${id}`);
}

export function handleFeedback(params) {
    return put('/lope/adm/feedback', params);
}

export function createFeedType(params) {
    return post('/lope/adm/feedback/type', params);
}

export function editFeedType(params) {
    return put('/lope/adm/feedback/type', params);
}

export function sortFeedType(params) {
    return put('/lope/adm/feedback/type/sort', params);
}

export function delFeedType(id) {
    return del(`/lope/adm/feedback/type/${id}`);
}

export function feedbackType(id) {
    return get(`/lope/adm/feedback/type/${id}`);
}

export function feedTypeList(params) {
    return get('/lope/adm/feedback/type/list', params);
}