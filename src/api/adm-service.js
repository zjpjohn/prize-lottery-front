import {del, get, post, put} from '../libs/http'

export function adminAuth(params) {
    return post("/lope/auth", params);
}

export function adminLoginOut() {
    return post('/lope/loginOut');
}

export function createAdminAcct(params) {
    return post("/lope/admin/", params);
}

export function resetAdminPwd(params) {
    return put("/lope/admin/reset", params);
}

export function frozenAdmin(id) {
    return put(`/lope/admin/frozen/${id}`);
}

export function unfrozenAdmin(id) {
    return put(`/lope/admin/unfrozen/${id}`);
}

export function deleteAdmin(id) {
    return del(`/lope/admin/${id}`);
}

export function queryMine() {
    return get('/lope/admin/mine');
}

export function queryAdmin(id) {
    return get(`/lope/admin/${id}`);
}

export function queryAdminList() {
    return get(`/lope/admin/list`);
}

export function ossPolicy(dir) {
    return get('/lope/oss/policy', {dir: dir});
}

export function adminLoginLogs(params) {
    return get('/lope/admin/login/logs', params);
}

export function adminPassword(adminId) {
    return get('/lope/admin/password', {adminId: adminId});
}
