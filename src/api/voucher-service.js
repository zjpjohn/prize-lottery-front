import {get, post, put} from "../libs/http";

export function createVoucher(params) {
  return post('/ucenter/adm/voucher/', params);
}

export function editVoucher(params) {
  return put('/ucenter/adm/voucher/', params);
}

export function voucherInfo(seqNo) {
  return get('/ucenter/adm/voucher/', {seqNo: seqNo});
}

export function voucherList(params) {
  return get('/ucenter/adm/voucher/list', params);
}

export function voucherLogList(params) {
  return get('/ucenter/adm/voucher/log/list', params);
}
