import {get, post, put} from "../libs/http";

export function createAnnounce(params) {
  return post('/push/adm/message/announce', params);
}

export function editAnnounce(params) {
  return put('/push/adm/message/announce', params);
}

export function announceList(params) {
  return get('/push/adm/message/announce/list', params);
}

export function remindList(params) {
  return get('/push/adm/message/remind/list', params);
}

export function createChannel(params) {
  return post('/push/adm/channel/', params);
}

export function editChannel(params) {
  return put('/push/adm/channel/', params);
}

export function channelInfo(channel) {
  return get('/push/adm/channel/', {channel: channel});
}

export function channelList(params) {
  return get('/push/adm/channel/list', params);
}

export function typedChannels(type) {
  return get(`/push/adm/channel/${type}/list`);
}
