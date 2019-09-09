export const TableColum = [{
  key: "recruit_station",
  title: "在招关键岗",
  dataIndex: "recruit_station"
},{
  key: "dept_name",
  title: "组织全称",
  dataIndex: "dept_name"
},{
  key: "po_level",
  title: "目标职级",
  dataIndex: "po_level",
},{
  key: "zprs",
  title: "更新需求人数",
  dataIndex: "zprs"
},{
  key: "zgrs",
  title: "内转人数",
  dataIndex: "zgrs"
},{
  key: "offer_num",
  title: "OFFER人数",
  dataIndex: "offer_num"
},{
  key: "dgrs",
  title: "到岗人数",
  dataIndex: "dgrs"
},{
  key: "keyJobRate",
  title: "到岗率",
  dataIndex: "keyJobRate",
  render: (value) => `${value}%`
}];
export const PathInfo = {
  keyTable: "erp/hr/getPositionRate"
}