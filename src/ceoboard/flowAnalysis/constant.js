import moment from 'moment';
export const outSideItems = {
    header: '各站外来源流量转化情况',
    topItems: ['店铺有效UV', '咨询量', , '1V1订单  提交量', '1V1订单  成交量'],
    infos:
        {
            'SEM': '集团通过市场投放带来的流量',
            '直接访问': '直接访问猪八戒平台的用户带来的流量',
            '引荐': '引荐渠道带来的流量',
            '裂变': '服务商通过自己的运营动作，带来和产生的流量都作为裂变流量，包括服务商分享店铺、通过案例、圈子等方式的内容运营',
            'SEO': 'SEO渠道带来的非直接到店的流量'
        },

    data:[{"key1":96200,"key2":6.2,"key5":14996,"key6":10.7,"key3":5960,"key4":251.6,"name":"SEM","key7":1600},{"key1":419640,"key2":0.6,"key5":14996,"key6":10.7,"key3":2620,"key4":572.4,"name":"SEO","key7":1600},{"key1":1,"key2":0.0,"key5":0,"key3":0,"name":"其他","key7":0},{"key1":760,"key2":18.4,"key5":14996,"key6":10.7,"key3":140,"key4":10711.4,"name":"引荐","key7":1600},{"key1":381840,"key2":4.1,"key5":14996,"key6":10.7,"key3":15680,"key4":95.6,"name":"直接访问","key7":1600}],
    isBottom: false
};


export const insideItems = {
    header: '站内流量分配及转化情况',
    topItems: ['店铺有效UV', '咨询量', , '1V1订单  提交量', '1V1订单  成交量'],
    infos:
        {
            '列表刷新': '通过刷新产品分配的流量，即雇主点击搜索列表中非广告内容，进入服务商店铺后产生的店铺UV',
            '关键词推广': '通过关键词推广产品分配的流量，即雇主点击关键词广告进入服务商店铺后产生的店铺UV',
            '仙位推广': '通过仙位推广产品分配的流量，即雇主点击仙位广告进入服务商店铺后产生的店铺UV',
            '八戒快车': '通过八戒快车推广产品分配的流量，即雇主点击八戒快车广告进入服务商店铺后产生的店铺UV',
            '其他': '通过非广告、非刷新产品分配的流量，即雇主通过非搜索列表页以及站内其他广告产品进入店铺（例如通过交易大厅的招投标页面等方式）'
        },

    data:[{"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "name": "仙位推广", "key7": ""}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "name": "八戒快车", "key7": ""}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "name": "关键词推广", "key7": ""}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "name": "其他", "key7": ""}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "name": "列表刷新", "key7": ""}] ,
    isBottom: false
};


export const bottomItems = {
    header: '各层级服务商流量及转化情况',
    topItems: ['服务商数', '获得流量  服务商数', '店铺有效UV', '咨询量', '1V1订单  提交量', '1V1订单  成交量'],
    infos: {
        'TOP': 'TOP（近3月月均GMV>=8w）',
        'KA': 'KA（1w =<近3月月均GMV<8w）',
        '黑马': '黑马（5000=<近3月月均GMV<1w）',
        '新手': '新手（1=<近3月月均GMV<5000）',
        '有收入': '有收入（近3月月均GMV>=1）'
    },
    data: [{"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "key9": "", "key7": "", "key8": "", "key11": "", "key10": "", "key14": "", "key13": "", "key12": "", "name": "KA"}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "key9": "", "key7": "", "key8": "", "key11": "", "key10": "", "key14": "", "key13": "", "key12": "", "name": "TOP"}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "key9": "", "key7": "", "key8": "", "key11": "", "key10": "", "key14": "", "key13": "", "key12": "", "name": "新手"}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "key9": "", "key7": "", "key8": "", "key11": "", "key10": "", "key14": "", "key13": "", "key12": "", "name": "有收入"}, {"key1": "", "key2": "", "key5": "", "key6": "", "key3": "", "key4": "", "key9": "", "key7": "", "key8": "", "key11": "", "key10": "", "key14": "", "key13": "", "key12": "", "name": "黑马"}],
    isBottom: true
};


export const URLS = {
    GET_TITLE: 'manager/change/getTitle',
    GET_OUT_SOURCE: 'manager/change/getOutSource',
    GET_INNER_SOURCE: 'manager/change/getInnerSource',
    SERVICE: 'manager/change/service'
};

export const bottomIntroText = '（1）集团UV：集团PC、WAP、买家APP端整体UV;</br>' +
    '（2）店铺有效UV：经过流量垃圾识别系统标识为有效的店铺UV之和;</br>' +
    '（3）咨询量：统计周期内，咨询服务商的人数（咨询方式包括IM、隐私小号、企点），注：同一个用户咨询多个店铺，算多个店铺咨询;</br>' +
    '（4）1V1订单提交量：指通过店铺雇佣或者购买店铺服务提交的订单量</br>' +
    '（5）1V1订单成交量：指通过店铺雇佣或者购买店铺服务提交的订单中最终成交的订单量';

export const DISABLED_START_TIME = moment('2019-09-01 00:00:00');
