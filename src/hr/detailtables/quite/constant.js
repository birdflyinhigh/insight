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
  key: "dept_name",
  title: "所在组织全称",
  dataIndex: "dept_name",
  width: 250
},{
  key: "job_function_descr",
  title: "序列",
  dataIndex: "job_function_descr"
},{
  key: "subsequence_descr",
  title: "子序列",
  dataIndex: "subsequence_descr"
},{
  key: "station",
  title: "岗位类",
  dataIndex: "station"
},{
  key: "po_level_descr",
  title: "职级",
  dataIndex: "po_level_descr",
},{
  key: "points",
  title: "近半年绩效均分",
  dataIndex: "points",
},{
  key: "age_comp",
  title: "司龄",
  dataIndex: "age_comp",
},{
  key: "termination_date",
  title: "离职时间",
  dataIndex: "termination_date",
// },{
//   key: "termination_type_descr",
//   title: "主动/被动",
//   dataIndex: "termination_type_descr",
// },{
//   key: "termination_type",
//   title: "离职类别",
//   dataIndex: "termination_type",
},{
  key: "termination_reason",
  title: "离职原因",
  dataIndex: "termination_reason",
}];
export const PathInfo = {
  table: "erp/hr/getQuitNumInfo",
  leaveReason: "erp/hr/getQuitNumReasonInfo",
  looseRate: "erp/hr/getStaffLossInfo"
}