import moment from 'moment';

const page = window.location.pathname;
// const subtractStartDay = page === "/manager/index" ? 13 : 7;
const subtractStartDay = 7;
// const subtractEndDay = page === "/manager/index" ? 6 : 1;
const subtractEndDay = 1;

export const PathInfo = {
    region: "manager/home/getArea",
    province: "manager/home/getProvince",
    product: "manager/home/getProduct",
    authority: "manager/home/getModuleAndRole",
    smallBNumber: "manager/home/title"
};

export const publicModule = {
    "role": "ceo",
    "roleId": 1,
    "module": "traffic",
    "moduleName": "流量热力图",
    "roleName": "ceo",
    "moduleId": 8
};
export const extraModule = {
    "role": "ceo",
    "roleId": 1,
    "module": "trafficdetail",
    "moduleName": "流量热力图",
    "roleName": "ceo",
    "moduleId": 9
};

export const heatSearchModule = {
    "role": "ceo",
    "roleId": 1,
    "module": "heatsearch",
    "moduleName": "热搜热力图",
    "roleName": "ceo",
    "moduleId": 10
};

export const heatSearchSecondModule = {
    "role": "ceo",
    "roleId": 1,
    "module": "heatsearchsecond",
    "moduleName": "流量权益分析",
    "roleName": "ceo",
    "moduleId": 11
};

export const flowAnalysisModule = {
    "role": "ceo",
    "roleId": 1,
    "module": "flowanalysis",
    "moduleName": "流量分析",
    "roleName": "ceo",
    "moduleId": 12
};

export const userModule = {
    "role": "ceo",
    "roleId": 1,
    "module": "user",
    "moduleName": "流量分析",
    "roleName": "ceo",
    "moduleId": 12
};


export const noHeaderPathNames = ["/manager/trafficdetail", "/manager/heatsearchsecond"];


export const publicTab = {link: "/manager/traffic", name: "流量权益分配", component: "CeoTraffic", key: "traffic"};
export const extraTab = {link: "/manager/trafficdetail", name: "", component: "CeoTrafficDetail", key: "trafficdetail"};

export const InitialState = {
    startTime: moment().subtract(subtractStartDay, "days").format('YYYY-MM-DD'),
    endTime: moment().subtract(subtractEndDay, "days").format('YYYY-MM-DD'),
    curBtn: "-1",
    regionId: -1,
    provinceParams: -1,
    provinceId: -1,
    productId: -1,
    channelId: -1,
    cityId: -1,
    region: [],
    province: [],
    product: [],
    channel: [],
    city: [],
    smallBNumber: {},
    authorityList: [publicTab, extraTab],
    userRole: "",
    loadingAthority: false,
    loadedProduct: false
};