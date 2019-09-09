export const InitialState = {
  tableData: []
};
export const PathInfo = {
  table: "erp/finance/getManageAllRegionList"
}
export const Columns = {
  income: [{
    title: '城市',
    dataIndex: 'regionName',
    key: 'regionName',
  },{
    title: '预算收入（万元）',
    dataIndex: 'accBudget',
    key: 'accBudget',
    render: (value) => value || 0
  },{
    title: '实际收入（万元）',
    dataIndex: 'accReal',
    key: 'accReal',
    render: (value) => value || 0
  },{
    title: '预算完成率',
    dataIndex: 'rate',
    key: 'rate',
    render: (value) =>(value || 0) + "%"
  }],
  little_profit: [{
    title: '城市',
    dataIndex: 'regionName',
    key: 'regionName',
  },{
    title: '预算毛利（万元）',
    dataIndex: 'accBudget',
    key: 'accBudget',
    render: (value) => value || 0
  },{
    title: '实际毛利（万元）',
    dataIndex: 'accReal',
    key: 'accReal',
    render: (value) => value || 0
  },{
    title: '预算完成率',
    dataIndex: 'rate',
    key: 'rate',
    render: (value) => (value || 0) + "%"
  }],
  profit: [{
    title: '城市',
    dataIndex: 'regionName',
    key: 'regionName',
  },{
    title: '预算利润（万元）',
    dataIndex: 'accBudget',
    key: 'accBudget',
    render: (value) => value || 0
  },{
    title: '实际利润（万元）',
    dataIndex: 'accReal',
    key: 'accReal',
    render: (value) => value || 0
  },{
    title: '预算完成率',
    dataIndex: 'rate',
    key: 'rate',
    render: (value) => (value || 0) + "%"
  }]
}