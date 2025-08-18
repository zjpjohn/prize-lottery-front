import {del, get, post, put} from "../libs/http";

export function agentRuleList(params) {
  return get('/ucenter/adm/agent/rule/list', params);
}

export function addAgentRule(params) {
  return post('/ucenter/adm/agent/rule/', params);
}

export function editAgentRule(params) {
  return put('/ucenter/adm/agent/rule/', params);
}

export function clearRules() {
  return del('/ucenter/adm/agent/rule/clear')
}

export function agentApplyList(params) {
  return get('/ucenter/adm/agent/apply/list', params);
}

export function confirmApply(params) {
  return put('/ucenter/adm/agent/apply', params);
}

export function agentUserList(params) {
  return get('/ucenter/adm/agent/list', params);
}

export function topUserAgent() {
  return get('/ucenter/adm/agent/top');
}

export function agentDetail(userId) {
  return get('/ucenter/adm/agent/detail', {userId: userId});
}

export function agentInvitedList(params) {
  return get('/ucenter/adm/agent/invited/list', params);
}
