export const chartTool = {
  generateChartKeyData: (datas) => {
    let data = datas.data;
    let finalData = {
        dataKey: [],
        data: data,
        name: datas.name,
        loading: datas.loading
    }
    for(let key in data[0]){
      if(key != "name" && key != "id"){
        finalData.dataKey.push(key);
      }
    }
    return finalData;
  },
  generateBarLineData: (datas, lineKey) => {
    let data = datas.data;
    let temp = {
      barKey: [],
      lineKey: data.length == 0 ? [] : lineKey,
      data: data,
      name: datas.name,
      loading: datas.loading
    };
  var isSame = (value, akeys) => {
    for(let i = 0; i < akeys.length; i++){
      if(value == akeys[i]){
        return true;
      }
    }
  }
  
  for(let key in data[0]){
    if(key != "name" && key != "id"){
      if(!isSame(key, lineKey)){
        temp.barKey.push(key);
      }
    }
  }
  return temp;
}
}