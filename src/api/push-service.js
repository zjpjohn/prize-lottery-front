import {get, post, put} from '../libs/http'

export function createApp(params) {
  return post('/push/adm/app', params);
}

export function editApp(params) {
  return put('/push/adm/app', params);
}

export function appList() {
  return get('/push/adm/app/list');
}

export function appDeviceList(params) {
  return get('/push/adm/device/list', params);
}

export function createNotify(params) {
  return post('/push/adm/notify', params);
}

export function editNotify(params) {
  return put('/push/adm/notify', params);
}

export function notifyDetail(id) {
  return get(`/push/adm/notify/${id}`);
}

export function notifyList(params) {
  return get('/push/adm/notify/list', params);
}

export function deviceMetrics(appKey) {
  return get('/push/adm/device/metrics', {appKey: appKey});
}

export function deviceChart() {
  return get('/push/adm/device/chart')
}

export function pushMetrics(appKey) {
  return get('/push/adm/push/metrics', {appKey: appKey});
}

export function pushChart(params) {
  return get('/push/adm/push/chart', params);
}

export function createTagGroup(params) {
  return post('/push/adm/tag/group', params);
}

export function editTagGroup(params) {
  return put('/push/adm/tag/group', params);
}

export function tagGroup(id) {
  return get(`/notify/adm/tag/group/${id}`);
}

export function appTagGroups(appKey) {
  return get('/notify/adm/tag/group/list', {appKey: appKey});
}

export function dilatateTagGroup(groupId) {
  return post('/notify/adm/tag/group/dilatate', {groupId: groupId});
}

export function groupTagList({groupId, page = 1, limit = 10}) {
  return get('/notify/adm/tag/list', {groupId: groupId, page: page, limit: limit})
}
