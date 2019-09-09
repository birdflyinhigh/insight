export const TableColum = [{
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
  dataIndex: "cst_hire_date",
},{
  key: "station",
  title: "岗位类",
  dataIndex: "station"
},{
  key: "po_level_descr",
  title: "职级",
  dataIndex: "po_level_descr"
},{
  key: "per_workhours",
  title: "日均工作时长（小时）",
  dataIndex: "per_workhours",
  render: (value) => {
    return value ? value : "-";
  }
},{
  key: "overtime",
  title: "周末加班时长（小时）",
  dataIndex: "overtime"
}];
export const PathInfo = {
  table: "erp/hrcost/selectWorkHours"
}