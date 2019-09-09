const TableUtil = (() => {
  function getMaxDeepTypeObject(data){
    let maxTypeLen = 0;
    data.forEach((item, index) => {
      if (index > 0) {
        item.forEach((content, index1) => {
          if (index1 === 1 && typeof content !== "number") {
            const typeArr = content.split("-");
            maxTypeLen = typeArr.length > maxTypeLen ? typeArr.length : maxTypeLen;
          }
        })
      }
    });
    return maxTypeLen;
  }
  function getFullTypeArray(typeArr, maxTypeLen){
    let len = typeArr.length;
    let tempArray = [];
    for(let i = 0; i < maxTypeLen; i++){
      if(typeArr[i]){
        tempArray[i] = {
          name: typeArr[i],
          // 如果为1，此时为2列/只有当为最后一个才是2列
          col: 1,
          row: 1,
          show: true
        }
      }else{
        tempArray[i - 1].col = maxTypeLen - len + 1;
        tempArray[i] = {
          name: "fillContent",
          col: 1,
          row: 1,
          show: false
        };
      }
    }
    return tempArray;
  }
  function getEndCol(data){
    for(let i = 0; i < data[0].length; i++){
      if(typeof data[0][i].name === "number"){
        return i;
      }
    }
  }
  function isPrevItemSame(posObj, data){
    let curL1Index = posObj.curL1Index;
    let lastL1Index = posObj.lastL1Index;
    for(let i = posObj.curL2Index; i >= 0; i--){
      if(data[curL1Index][i].name !== data[lastL1Index][i].name){
        return false;
      }
    }
    return true;
  }
  function getCollapseData(data, endCols) {
    let lastMatchL1Index = 0;
    let lastMatchL2Index = 0;
    for (let i = 0; i < endCols; i++) {
      for (let j = 1; j < data.length; j++) {
        const isCurSameName = data[j][i].name === data[lastMatchL1Index][lastMatchL2Index].name;
        let isPrevSameName = isPrevItemSame({
          curL1Index: j,
          lastL1Index: lastMatchL1Index,
          curL2Index: i
        }, data);
        // console.log(isPrevSameName);
        // 当前名字 = 上一行同位置名字 && 之前所有名字相同
        if (data[j][i + 1].name != "fillContent" && isCurSameName && isPrevSameName) {
          data[lastMatchL1Index][lastMatchL2Index].row += 1;
          if(j > 0){
            data[j][i].show = false;
          }
        } else {
          lastMatchL1Index = j;
          lastMatchL2Index = i;
        }
      }
      // 每一列的结尾清零
      lastMatchL1Index = 0;
      lastMatchL2Index = i + 1;
    }
    return data;
  }
  function getTableHeader(data, maxTypeLen, productId){
    // productId 用来判断是否需要类型
    let fixedContent = [{
      name: "产品",
      row: 1,
      col: 1,
      show: true
    }];
    if(productId.indexOf(-1) === -1) {
        fixedContent.push({
        name: "类型",
        row: 1,
        col: maxTypeLen || 1,
        show: true
      });
    }
    let province = [];
    let region = [];
    const completeLen = data[0].length + maxTypeLen - 1;
    data[0].forEach((item, index) => {
      const splitArray = item.split("-");
      const fixedLastIndex = fixedContent.length - 1;
      const regionLastIndex = region.length - 1;
      if(splitArray[1] !== undefined){
        province.push({
          name: splitArray[1],
          row: 1,
          col: 1,
          show: true
        });
      }
      if(index > 0){
        if(region[regionLastIndex] === splitArray[0]){
          fixedContent[fixedLastIndex].col += 1;
        }else{
          fixedContent.push({
            name: splitArray[0],
            row: 1,
            col: 1,
            show: true
          });
          region.push(splitArray[0]);
        }
      }else{
        fixedContent.push({
          name: splitArray[0],
          row: 1,
          col: 1,
          show: true
        });
        region.push(splitArray[0]);
      }
    });
    if (province.length > 0) {
      while (province.length < completeLen) {
        province.unshift({
          name: "fillContent",
          row: 1,
          col: 1,
          show: false
        });
      }
      fixedContent[0].row = 2;
      if(productId.indexOf(-1) === -1){
        fixedContent[1].row = 2;
      }
      return [fixedContent, province];
    }
    return [fixedContent];
  }
  function getFlatData(data, productId){
    let temp = [];
    const maxTypeLen = getMaxDeepTypeObject(data);
    // 第0个是表头
    for (let i = 1; i < data.length; i++) {
      temp[i - 1] = [];
      // 根据/层数插入0-2
      for (let j = 0; j < data[i].length; j++) {
        if (j === 1 && typeof data[i][j] !== "number") {
          let tempTypeArray = getFullTypeArray(data[i][j].split("-"), maxTypeLen);
          let level2Index = j;
          tempTypeArray.forEach((item) => {
            temp[i - 1][level2Index] = item;
            level2Index++;
          });
        } else if(j > 1){
          const addColums = maxTypeLen ? maxTypeLen - 1 : 0;
          let tempStartIndex = j + addColums;
          temp[i - 1][tempStartIndex] = {
            name: data[i][j],
            col: 1,
            row: 1,
            show: true
          }
        }else{
          temp[i - 1][j] = {
            name: data[i][j],
            col: 1,
            row: 1,
            show: true
          }
        }
      }
    }
    return {
      header: getTableHeader(data, maxTypeLen, productId),
      // 类型+产品列数
  
      table: getCollapseData(temp, maxTypeLen + 1),
      endCol: getEndCol(temp)
    };
  }
  return {
    getTableHeader,
    getFlatData
  }
})();
export default TableUtil;
