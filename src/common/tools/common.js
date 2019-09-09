import {createAction} from 'redux-act';
import axios from 'axios';
import {SERVER_ADDRESS} from '../common';

export const CommonMethod = {
  generateActions: (actionName) => {
    let temp = {};
    actionName.forEach((item, index) => {
      temp[item] = createAction(item);
    });
    return temp;
  },
  onlysendRequest: (options, fn) => {
    let actionName = options.actionName; 
    let params = options.params;
      return axios.get(SERVER_ADDRESS + options.path, {
          withCredentials: true,
          params: {...params}
        })
        .then((response) => {   
          if(fn){
            fn(response);
          }
          return response;
        })
        .catch((error) => {
          console.log('something went wrong', error);
        })
  },
  // options--actionName: string,path: string, params: {}, actions: ofns, fn--fn
  sendRequest: (options,fn) => {
      let actionName = options.actionName; 
      let params = options.params;
      return (dispatch) => {
        return axios.get(SERVER_ADDRESS + options.path, {
          withCredentials: true,
          params: {...params}
        })
        .then((response) => {
          dispatch(options.actions[actionName](response.data));     
          if(fn){
            fn(response);
          }
        })
        .catch((error) => {
          console.log('something went wrong', error);
        })
      }
  },
  postRequest: (options) => {
    const actionName = options.actionName;
    const postRequest = options.params;
    const successFn = options.successFn;
    const failFn = options.failFn;
    return (dispatch) => {
      return axios.post(SERVER_ADDRESS + options.path, {
        ...postRequest
      }).then((response) => {
        if(actionName){
          dispatch(options.actions[actionName](response.data))
        }
        if(successFn){
          successFn(response);
        }
      }).catch((error) => {
        if(failFn){
          failFn(error);
        }
        console.log('something went wrong', error);
      })
    }
  },
  download: (url, params) => {
    let queryString = "";
    for(let key in params){
      queryString += key + "=" + params[key] + "&"
    }
    let finalString = queryString.replace(/&$/, '');
    window.open(`${SERVER_ADDRESS}${url}?${finalString}`);
  }
}