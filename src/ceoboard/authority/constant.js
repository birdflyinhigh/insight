export const InitialState = {
    productList: [],
    regionList: [],
    provinceList: [],
    module: [],
    roles: [],
    hdList: [],
    hnList: [],
    hxList: [],
    hbList: [],
    hzList: [],
    cyList: [],
    bjList: [],
    otherList: [],
    authList: [],
    xnList: [],
    sdList: []

};
export const PathInfo = {
    productList: "manager/auth/getProduct",
    regionList: "manager/auth/getArea",
    provinceList: "manager/auth/getProvince",
    module: "manager/auth/getModule",
    roles: "manager/auth/getRole",
    authList: "manager/auth/getAllUser",
    insert: "manager/auth/insertAuth",
    delete: "manager/auth/delete"
};
export const RegionList = [{
    enName: "hdList",
    name: "华东大区",
    id: 1
}, {
    enName: "hnList",
    name: "华南大区",
    id: 2
}, {
    enName: "hxList",
    name: "华西大区",
    id: 3
}, {
    enName: "hbList",
    name: "华北大区",
    id: 4
}, {
    enName: "hzList",
    name: "华中大区",
    id: 5
}, {
    enName: "cyList",
    name: "川渝大区",
    id: 6
}, {
    enName: "bjList",
    name: "北京大区",
    id: 7,
    // nosec: true
}, {
    enName: "otherList",
    name: "其它大区",
    id: 8,
    nosec: true
}, {
    enName: "xnList",
    name: "西南大区",
    id: 9,
    nosec: true
}, {
    enName: "sdList",
    name: "山东省",
    id: 10,
    nosec: true
},];