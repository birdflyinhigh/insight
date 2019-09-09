import {createReducer} from 'redux-act';
import {XhrAct} from './action';
import {InitialState, RegionList} from './constant';

function dealProvince(data) {
    let temp = [];
    data.forEach((item) => {
        temp.push({
            value: item.id,
            label: item.name,
        });
    });
    return temp;
}

const reducer = createReducer({
    [XhrAct["productList"]]: (state, payload) => {
        let temp = [];
        payload.forEach((item) => {
            temp.push({
                value: item.id,
                label: item.name,
            });
        })
        return {...state, productList: temp}
    },
    [XhrAct["regionList"]]: (state, payload) => {
        let temp = [];
        payload.forEach((item, index) => {
            let matchItem = RegionList.find((region) => region.name === item.name);
            if (matchItem) {
                temp.push({
                    value: item.id,
                    label: item.name
                });
                temp[index].enName = matchItem.enName;
            }
        });
        return {...state, regionList: temp}
    },
    [XhrAct["module"]]: (state, payload) => {
        let temp = [];
        payload.forEach((item) => {
            temp.push({
                value: item.module,
                label: item.moduleName,
                id: item.id
            });
        })
        return {...state, module: temp}
    },
    [XhrAct["roles"]]: (state, payload) => {
        let temp = [];
        payload.forEach((item) => {
            temp.push({
                value: item.role,
                label: item.roleName,
                id: item.id
            });
        });
        return {...state, roles: temp}
    },
    [XhrAct["authList"]]: (state, payload) => {
        const newList = payload.map((item) => {
            item.key = item.id + "";
            return item;
        });
        return {...state, authList: newList}
    },
    [XhrAct["deleteList"]]: (state, payload) => {
        let newAuthList = [];
        state.authList.forEach((item, index) => {
            if (item.id !== payload.id) {
                newAuthList.push(item);
            }
        });
        return {...state, authList: newAuthList}
    },
    [XhrAct["hdList"]]: (state, payload) => {
        return {...state, hdList: dealProvince(payload)}
    },
    [XhrAct["hnList"]]: (state, payload) => {
        return {...state, hnList: dealProvince(payload)}
    },
    [XhrAct["hxList"]]: (state, payload) => {
        return {...state, hxList: dealProvince(payload)}
    },
    [XhrAct["hbList"]]: (state, payload) => {
        return {...state, hbList: dealProvince(payload)}
    },
    [XhrAct["hzList"]]: (state, payload) => {
        return {...state, hzList: dealProvince(payload)}
    },
    [XhrAct["cyList"]]: (state, payload) => {
        return {...state, cyList: dealProvince(payload)}
    },
    [XhrAct["bjList"]]: (state, payload) => {
        return {...state, bjList: dealProvince(payload)}
    },
    [XhrAct["xnList"]]: (state, payload) => {
        return {...state, xnList: dealProvince(payload)}
    },
    [XhrAct["sdList"]]: (state, payload) => {
        return {...state, sdList: dealProvince(payload)}
    },
}, InitialState);
export default reducer;