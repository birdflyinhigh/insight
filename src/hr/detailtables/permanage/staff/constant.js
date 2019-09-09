export const PerformDetail = (month) => {
  function generateMonthTime(){
    let temp = [];
    let curMonth = month;
    let curYear = (new Date()).getFullYear();
    function getFixed2Month(month){
      return month.length > 1 ? `${month}` : `0${month}`;
    }
    for(let i = 1; i < month + 1; i++){
      temp.push({
        key: `month${i}`,
        title: curYear + getFixed2Month(curMonth + ""),
        dataIndex: `points${curMonth}`,
        render: (value) => {
          return value ? value : "-";
        }
      });
      curMonth -= 1;
      if(curMonth == 0){
        curMonth = 12;
        curYear -= 1
      }
    }
    return temp;
  }
  return [{
    key: "emp_id",
    title: "工号",
    dataIndex: "emp_id"
  },{
    key: "emp_name",
    title: "姓名",
    dataIndex: "emp_name"
  },{
    key: "cst_hire_date",
    title: "入职时间",
    dataIndex: "cst_hire_date"
  },{
    key: "dept_name",
    title: "所在组织全称",
    dataIndex: "dept_name",
    width: 300
  },{
    key: "role",
    title: "角色",
    dataIndex: "role"
  },{
    key: "job_function_descr",
    title: "序列",
    dataIndex: "job_function_descr"
  },{
    key: "station",
    title: "岗位",
    dataIndex: "station"
  },{
    key: "po_level_descr",
    title: "职级",
    dataIndex: "po_level_descr"
  },{
    key: "points",
    title: "YTD绩效均分",
    dataIndex: "points"
  }, ...generateMonthTime()];
};

export const PathInfo = {
  staff: "erp/achievement/selcetJXInfo",
  staffStatus: "erp/achievement/selcetJXLossCompared",
}