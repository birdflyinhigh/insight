export const OrgIndex = [{
  key: "deptId",
  title: "部门ID",
  dataIndex: "deptId"
},{
  key: "deptName",
  title: "部门全称",
  dataIndex: "deptName",
  width: 300
},{
  key: "departmentRate",
  title: "当月部门业务达成率",
  dataIndex: "departmentRate"
},{
  key: "staffRate",
  title: "当月员工平均业务达成率",
  dataIndex: "staffRate"
},{
  key: "points",
  title: "达成率偏差（员工平均达成率-部门达成率）",
  dataIndex: "points"
},{
  key: "maxPoints",
  title: "年初至今最大偏差",
  dataIndex: "maxPoints"
},{
  key: "averPoints",
  title: "年初至今平均偏差",
  dataIndex: "averPoints"
},{
  key: "contriType",
  title: "有效性判定",
  dataIndex: "contriType"
}];
export const PathInfo = {
  index: "erp/achievement/selectAssessInfo",
}