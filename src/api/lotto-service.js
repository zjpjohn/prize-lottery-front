import {del, get, post, postJson, put} from "../libs/http";

export function newestLottery(type) {
    return get(`/slotto/share/lotto/newest/${type}`);
}

export function lotteryList(params) {
    return get('/slotto/share/lotto/list', params);
}

export function filterNum3Lottery(params) {
    return postJson('/slotto/share/lotto/num3/filter', params);
}

export function lottoFastTable(params) {
    return get('/slotto/share/lotto/qtable', params);
}

export function latestLottoPeriod(type) {
    return get(`/slotto/share/lotto/latest/period/${type}`);
}

export function fetchLatestLottery(type) {
    return post(`/clotto/lottery/${type}`);
}

export function fetchLotteries({
                                   type,
                                   size
                               }) {
    return post(`/clotto/lottery/${type}/${size}`);
}

export function fetchRangeLotteries({
                                        type,
                                        start,
                                        end
                                    }) {
    return post('/clotto/lottery/range', {
        type: type,
        start: start,
        end: end
    });
}

export function fetchLotteryTrails({
                                       type,
                                       size
                                   }) {
    return post(`/clotto/lottery/trial/${type}/${size}`);
}

export function fetchLotteryTrail(type, period) {
    return post(`/clotto/lottery/trial/${type}`, {period: period});
}

export function initializeOmit(type) {
    return post(`/clotto/lottery/omit/calc/${type}`);
}

export function calcKuaOmit(type) {
    return post('/clotto/lottery/omit/kua/calc', {type: type});
}

export function calcSumOmit(type) {
    return post('/clotto/lottery/omit/sum/calc', {type: type});
}

export function calcTrendOmit(type) {
    return post('/clotto/lottery/omit/trend/calc', {type: type});
}

export function calcMatchOmit(type) {
    return post('/clotto/lottery/omit/match/calc', {type: type});
}

export function calcItemOmit(type) {
    return post('/clotto/lottery/omit/item/calc', {type: type});
}

export function lottoCodeInit(type) {
    return post(`/clotto/lottery/code/calc/${type}`);
}

export function initFetchNews() {
    return post('/clotto/news/init');
}

export function fetchLotteryNews() {
    return post('/clotto/news/fetch')
}

export function lotteryNewsList(params) {
    return get('/slotto/adm/news/list', params);
}

export function newsDetail(seq) {
    return get(`/slotto/adm/news/${seq}`);
}

export function initFetchSkill() {
    return post('/clotto/skill/init');
}

export function fetchLotterySkill() {
    return post('/clotto/skill/fetch');
}

export function skillLotteryList(params) {
    return get('/slotto/adm/skill/list', params);
}

export function skillDetail(seq) {
    return get(`/slotto/adm/skill/${seq}`);
}

export function lotteryIndexes(params) {
    return get('/slotto/adm/lotto/index/list', params);
}

export function lottoCodeList(params) {
    return get('/slotto/adm/lotto/code/list', params)
}

export function lottoDanInit(type) {
    return post('/clotto/lottery/dan/init', {type: type});
}

export function lottoOttInit(type) {
    return post('/clotto/lottery/ott/init', {type: type});
}

export function browseList(params) {
    return get('/slotto/adm/lotto/browse/list', params);
}

export function addAround(data) {
    return postJson('/clotto/lottery/around', data);
}

export function addAroundBatch(data) {
    return postJson('/clotto/lottery/around/batch', data);
}

export function calcAroundResult(type, period) {
    return put('/clotto/lottery/around/calc', {
        type: type,
        period: period
    });
}

export function fetchAround(size) {
    return post('/clotto/lottery/around/fetch', {
        size: size
    });
}

export function aroundList(params) {
    return get('/slotto/adm/lotto/around/list', params);
}

export function removeAround(id) {
    return del('/clotto/adm/lotto/around', {id: id});
}

export function addHoney(type, data) {
    return postJson(`/clotto/lottery/honey?type=${type}`, data);
}

export function addHoneyBatch(type, data) {
    return postJson(`/clotto/lottery/honey/batch?type=${type}`, data);
}

export function removeHoney(id) {
    return del('/clotto/adm/lotto/honey', {id: id});
}

export function honeyList(params) {
    return get('/slotto/adm/lotto/honey/list', params);
}

export function lotteryPeriods(type, limit) {
    return get('/slotto/share/lotto/periods', {
        type: type,
        limit: limit
    });
}

export function wensFilter(params) {
    return postJson('/slotto/adm/lotto/filter', params);
}

export function num3Lottery(type, period) {
    return get('/slotto/share/lotto/num3/lottery', {
        type: type,
        period: period
    });
}

export function num3LastLottery(type, period) {
    return get('/slotto/share/lotto/num3/last/lottery', {
        type: type,
        period: period
    });
}

export function createNum3Warn(params) {
    return postJson('/clotto/lottery/num3/warn', params);
}


export function calcWarnHit(id) {
    return get('/clotto/lottery/num3/warn/hit', {id: id});
}

export function num3WarnList(params) {
    return get('/slotto/adm/warning/list', params);
}

export function num3WarnInfo(id) {
    return get('/slotto/adm/warning/', {id: id});
}

export function num3LottoIndex(params) {
    return get('/slotto/adm/lotto/num3/index', params);
}

export function calcNum3Index(type, period) {
    return post('/clotto/lottery/num3/index', {
        type: type,
        period: period
    });
}

export function num3LottoDan(type, period) {
    return get('/slotto/share/lotto/num3/dan', {
        type: type,
        period: period
    });
}

export function initPianOmit(type) {
    return post(`/clotto/lottery/omit/pian/calc/${type}`);
}

export function initNum3Com(type) {
    return put('/clotto/lottery/init/n3/com', {type: type});
}

export function initNum3Same(type) {
    return put('/clotto/lottery/init/n3/same', {type: type});
}

export function saveNum3Layer(params) {
    return postJson('/clotto/lottery/num3/layer', params);
}

export function syncNum3Layer(type) {
    return post('/clotto/lottery/num3/layer/sync', {type: type});
}

export function calcNum3Layer(id) {
    return put('/clotto/lottery/num3/layer/hit', {id: id});
}

export function num3LayerList(params) {
    return get('/slotto/adm/layer/list', params);
}

export function num3Layer(id) {
    return get('/slotto/adm/layer/', {id: id});
}