import {del, get, post, put} from "../libs/http";

export function resetProxyExpire() {
  return put('/sproxy/proxy/pack/reset');
}

export function addWhiteList(params) {
  return post('/sproxy/proxy/white', params);
}

export function delWhiteList(params) {
  return del('/sproxy/proxy/white', params);
}

export function whiteList() {
  return get('/sproxy/proxy/white');
}

export function proxyFetch() {
  return post('/sproxy/proxy/fetch');
}

export function proxyIpList(params) {
  return get('/sproxy/proxy/list', params);
}

export function latestTime() {
  return get('/sproxy/proxy/latestTime');
}
