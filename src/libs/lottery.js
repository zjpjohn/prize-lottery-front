//选三型中奖类型
let n3_type      = {
    1: '豹子',
    2: '组三',
    3: '组六',
};
let lottery      = {
    'fc3d': '福彩3D',
    'pl3': '排列三',
    'ssq': '双色球',
    'dlt': '大乐透',
    'qlc': '七乐彩',
    'kl8': '快乐8',
};
let fsd_channels = [
    {
        label: '独胆',
        value: 'd1',
        hot: true,
        vip: true
    },
    {
        label: '双胆',
        value: 'd2',
        hot: true,
        vip: true
    },
    {
        label: '三胆',
        value: 'd3',
        hot: true,
        vip: true
    },
    {
        label: '组选五',
        value: 'c5',
        hot: true,
        vip: true
    },
    {
        label: '组选六',
        value: 'c6',
        hot: true,
        vip: true
    },
    {
        label: '组选七',
        value: 'c7',
        hot: true,
        vip: true
    },
    {
        label: '杀一码',
        value: 'k1',
        hot: true,
        vip: true
    },
    {
        label: '杀二码',
        value: 'k2',
        hot: true,
        vip: true
    },
    {
        label: '定位三',
        value: 'cb3',
        hot: false,
        vip: false
    },
    {
        label: '定位四',
        value: 'cb4',
        hot: false,
        vip: false
    },
    {
        label: '定位五',
        value: 'cb5',
        hot: false,
        vip: false
    },
];

let pls_channels = [
    {
        label: '独胆',
        value: 'd1',
        hot: true,
        vip: true
    },
    {
        label: '双胆',
        value: 'd2',
        hot: true,
        vip: true
    },
    {
        label: '三胆',
        value: 'd3',
        hot: true,
        vip: true
    },
    {
        label: '组选五',
        value: 'c5',
        hot: true,
        vip: true
    },
    {
        label: '组选六',
        value: 'c6',
        hot: true,
        vip: true
    },
    {
        label: '组选七',
        value: 'c7',
        hot: true,
        vip: true
    },
    {
        label: '杀一码',
        value: 'k1',
        hot: true,
        vip: true
    },
    {
        label: '杀二码',
        value: 'k2',
        hot: true,
        vip: true
    },
    {
        label: '定位三',
        value: 'cb3',
        hot: false,
        vip: false
    },
    {
        label: '定位四',
        value: 'cb4',
        hot: false,
        vip: false
    },
    {
        label: '定位五',
        value: 'cb5',
        hot: false,
        vip: false
    },
];

let ssq_channels = [
    {
        label: '独胆',
        value: 'r1'
    },
    {
        label: '双胆',
        value: 'r2'
    },
    {
        label: '三胆',
        value: 'r3'
    },
    {
        label: '12码',
        value: 'r12'
    },
    {
        label: '20码',
        value: 'r20'
    },
    {
        label: '25码',
        value: 'r25'
    },
    {
        label: '杀三',
        value: 'rk3'
    },
    {
        label: '杀六',
        value: 'rk6'
    },
    {
        label: '蓝三',
        value: 'b3'
    },
    {
        label: '蓝五',
        value: 'b5'
    },
    {
        label: '杀蓝',
        value: 'bk'
    },
];

let dlt_channels = [
    {
        label: '独胆',
        value: 'r1'
    },
    {
        label: '双胆',
        value: 'r2'
    },
    {
        label: '三胆',
        value: 'r3'
    },
    {
        label: '10码',
        value: 'r10'
    },
    {
        label: '20码',
        value: 'r20'
    },
    {
        label: '杀三',
        value: 'rk3'
    },
    {
        label: '杀六',
        value: 'rk6'
    },
    {
        label: '蓝一',
        value: 'b1'
    },
    {
        label: '蓝二',
        value: 'b2'
    },
    {
        label: '蓝六',
        value: 'b6'
    },
    {
        label: '杀蓝',
        value: 'bk'
    },
];

let qlc_channels = [
    {
        label: '独胆',
        value: 'r1'
    },
    {
        label: '双胆',
        value: 'r2'
    },
    {
        label: '三胆',
        value: 'r3'
    },
    {
        label: '12码',
        value: 'r12'
    },
    {
        label: '18码',
        value: 'r18'
    },
    {
        label: '22码',
        value: 'r22'
    },
    {
        label: '杀三',
        value: 'k3'
    },
    {
        label: '杀六',
        value: 'k6'
    },
];

let kl8_channels = [
    {
        value: 'd1',
        label: '选一'
    },
    {
        value: 'd2',
        label: '选二'
    },
    {
        value: 'd3',
        label: '选三'
    },
    {
        value: 'd4',
        label: '选四'
    },
    {
        value: 'd5',
        label: '选五'
    },
    {
        value: 'd6',
        label: '选六'
    },
    {
        value: 'd7',
        label: '选七'
    },
    {
        value: 'd8',
        label: '选八'
    },
    {
        value: 'd9',
        label: '选九'
    },
    {
        value: 'd10',
        label: '选十'
    },
    {
        value: 'd11',
        label: '11码'
    },
    {
        value: 'd12',
        label: '12码'
    },
    {
        value: 'd13',
        label: '13码'
    },
    {
        value: 'd14',
        label: '14码'
    },
    {
        value: 'd15',
        label: '15码'
    },
    {
        value: 'd20',
        label: '20码'
    },
    {
        value: 'k1',
        label: '杀一'
    },
    {
        value: 'k2',
        label: '杀二'
    },
    {
        value: 'k3',
        label: '杀三'
    },
    {
        value: 'k4',
        label: '杀四'
    },
    {
        value: 'k5',
        label: '杀五'
    },
];

let phoneEncode = function (phone) {
    let type = typeof phone;
    if (type !== 'string' || phone === '') {
        return '';
    }
    let regex = /^(1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8})$/;
    if (!regex.test(phone)) {
        return '';
    }
    return phone.substring(0, 3) + '****' + phone.substr(phone.length - 4);
}
let splitter    = function (balls) {
    if (!balls || balls.trim().length === 0) {
        return null;
    }
    return balls.split(/\s+/);
};

let parseForecast = function (data) {
    if (!data || data.trim().length === 0) {
        return [];
    }
    if (!data.includes('*')) {
        return singleParse(data);
    }
    return segParse(data);
}

let singleParse   = function (data) {
    let splits    = data.trim().split(/\s+/);
    let modeRegex = /\[\d+\]/;
    let regex     = /\[|\]/g;
    let results   = [];
    for (let i = 0; i < splits.length; i++) {
        let item = splits[i];
        if (modeRegex.test(item)) {
            let v = item.replace(regex, '');
            results.push({
                key: v,
                value: 1
            });
        } else {
            results.push({
                key: item,
                value: 0
            });
        }
    }
    return results;
}
let segParse      = function (data) {
    let segments = data.split(/\*/);
    let results  = [];
    for (let i = 0; i < segments.length; i++) {
        let items = singleParse(segments[i]);
        results   = [
            ...results,
            ...items
        ];
        if (i < segments.length - 1) {
            results.push({
                key: '*',
                value: 0
            });
        }
    }
    return results;
}
let d3_categories = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
];

let ssq_red_categories = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33"
];

let ssq_blue_categories = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16"
];

let dlt_red_categories = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35"
];

let dlt_blue_categories = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
];

let qlc_categories = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30"
];

let kl8_categories   = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80"
];
const assistantTypes = {
    'func': '系统功能',
    'acct': '用户账户',
    'fc3d': '福彩3D',
    'pl3': '排列三',
    'ssq': '双色球',
    'dlt': '大乐透',
    'qlc': '七乐彩',
    'kl8': '快乐8',
};

///
/// 计算开奖号码跨度
function kua(balls) {
    let list = balls.map(e => parseInt(e)).sort();
    return list[list.length - 1] - list[0];
}

function hitReplace(ball) {
    if (ball == null || ball.length === 0) {
        return '';
    }
    return ball.replaceAll(' ', '').replaceAll('[', '<span style="color: red">').replaceAll(']', '</span>');
}

function limitName(name, limit) {
    if (name.length > limit) {
        return name.substring(0, limit);
    }
    return name;
}

const lottoHits  = {
    0: '未命中',
    1: '豹子命中',
    2: '组三命中',
    3: '组六命中',
};
const lottoTypes = {
    1: '豹子',
    2: '对子',
    3: '组六',
};

const cell_type = {
    1: '开奖号',
    2: '一级胆码',
    3: '二级胆码',
    4: '拖码',
};
const colors    = {
    1: '#32CD32',
    2: '#ff0000',
    3: '#1E90FF',
    4: '#cccc00',
};
const weeks     = [
    {
        name: '星期天',
        value: 1
    },
    {
        name: '星期一',
        value: 2
    },
    {
        name: '星期二',
        value: 3
    },
    {
        name: '星期三',
        value: 4
    },
    {
        name: '星期四',
        value: 5
    },
    {
        name: '星期五',
        value: 6
    },
    {
        name: '星期六',
        value: 7
    },
];
let weekMap     = {
    'ssq': [
        {
            name: '星期天',
            value: 1
        },
        {
            name: '星期二',
            value: 3
        },
        {
            name: '星期四',
            value: 5
        }
    ],
    'dlt': [
        {
            name: '星期一',
            value: 2
        },
        {
            name: '星期三',
            value: 4
        },
        {
            name: '星期六',
            value: 7
        },
    ],
    'qlc': [
        {
            name: '星期一',
            value: 2
        },
        {
            name: '星期三',
            value: 4
        },
        {
            name: '星期五',
            value: 6
        }
    ],
};
export {
    n3_type,
    lottery,
    lottoHits,
    lottoTypes,
    fsd_channels,
    pls_channels,
    ssq_channels,
    dlt_channels,
    qlc_channels,
    kl8_channels,
    splitter,
    phoneEncode,
    d3_categories,
    ssq_red_categories,
    ssq_blue_categories,
    dlt_red_categories,
    dlt_blue_categories,
    qlc_categories,
    kl8_categories,
    assistantTypes,
    parseForecast,
    kua,
    cell_type,
    colors,
    hitReplace,
    weeks,
    weekMap,
    limitName,
};
