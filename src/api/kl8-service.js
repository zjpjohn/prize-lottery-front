import {get, post} from "../libs/http";

export function fetchLast({before, size}) {
  return post('/clotto/kl8/fetch/last', {before: before, size: size});
}

export function fetchForecast(period) {
  return post(`/clotto/kl8/fetch-${period}`);
}

export function initCalcHit() {
  return post('/clotto/kl8/hit/init');
}

export function calcHit(period) {
  return post('/clotto/kl8/hit', {period: period});
}

export function initCalcRate() {
  return post('/clotto/kl8/rate/init');
}

export function calcRate(period) {
  return post('/clotto/kl8/rate', {period: period});
}

export function initCalcRank() {
  return post('/clotto/kl8/rank/init');
}

export function calcRank(period) {
  return post('/clotto/kl8/rank', {period: period});
}

export function latestPeriod() {
  return get('/slotto/adm/kl8/period');
}

export function latestRankPeriod() {
  return get('/slotto/adm/kl8/rank/period');
}

export function rankDataList(params) {
  return get('/slotto/adm/kl8/list', params);
}

export function masterList(params) {
  return get('/slotto/adm/kl8/master/list', params);
}

export function kl8LottoMasters(params) {
  return get('/slotto/adm/kl8/masters', params);
}

export function fullChart({type, period}) {
  return get(`/slotto/adm/kl8/chart/full/${type}`, {period: period});
}
