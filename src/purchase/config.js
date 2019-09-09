export const IndexConfig = {
  overview: {
    height: 300,
    xDataKey: "name",
    barColor: ["#03b8ab"],
    lineColor: ["#f8ce55"],
    link: "/puroverview",
    toolunit: ["万元", "笔"]
  },
  rate: {
    height: 300,
    dataKey: "value",
    color: ["#03b8ab", "#97c9d7", "#5d6b6d", "#78c659", "#f1c80f", "#fc625e", "#374648"],
    innerRadius: 60,
    outerRadius: 90,
    isPie: true,
    link: "/purrate"
  },
  save: {
    height: 300,
    xDataKey: "name",
    barColor: ["#03b8ab", "#87d4eb", "#f3c700"],
    lineColor: ["#f8ce55"],
    yAxisUnit: "%",
    showLegend: true,
    showsaveRate: true,
    link: "/pursave",
    toolunit: ["万元", "万元", "%"]
  },
  manage: {
    height: 300,
    xDataKey: "name",
    barColor: ["#03b8ab", "#87d4eb", "#f3c700"],
    lineColor: ["#f8ce55"],
    unit: "%",
    yAxisUnit: "%",
    link: "/purmanage/cate1",
    rotate: 45,
    transId: true,//需要获取点击时候文字对应的id
    toolunit: ["万元", "%"],
    bottom: -20
  },
  provider: {
    height: 328,
    xDataKey: "name",
    barColor: ["#03b8ab"],
    lineColor: ["#f8ce55"],
    link: "/purprovider/pursubpro",
    cutLabel: 4,
    //transId: true ,将xlabel汉字对应到id
    toolunit: ["万元", "笔"]
  },
  urgent: {
    height: 328,
    xDataKey: "name",
    barColor: ["#03b8ab"],
    lineColor: ["#f8ce55"],
    showLegend: true,
    yAxisUnit: "%",
    link: "/pururgent",
    toolunit: ["万元", "%"]
  },
  project: {
    height: 328,
    xDataKey: "name",
    barColor: ["#03b8ab"],
    lineColor: ["#f8ce55"],
    showLegend: true,
    toolunit: ["万元", "笔"],
    link: "/purproject",
    secondYIndex: 1,
    // xAxisUnit: "年"
  },
  examine: {
    height: 328,
    xDataKey: "name",
    barColor: ["#03b8ab"],
    lineColor: ["#f8ce55"],
    showLegend: true,
    toolunit: ["万元", "笔"],
    link: "/purexamine",
    secondYIndex: 1,//从0开始
    // xAxisUnit: "年"
  }
};
export const DetailConfig = {
  overview: {
    height: 400,
    xDataKey: "name",
    barColor: ["#03b8ab", "#87d4eb"],
    lineColor: ["#87d4eb"],
    showLegend: true,
    xAxisUnit: "月",
    toolunit: ["万元", "笔"]
  },
  manage: {
    height: 500,
    color:["#89a9c0", "#394c9b","#5b73d7", "#448bff","#69a3f5", "#57ceee","#34c196", "#9dd430","#9ee3a2", "#fea758","#97a3bb", "#d1d7e3"],
    showLegend: true,
    margin: {
      left: 50,
      right: 10
    },
    toolunit: ["%", "%"]
  },
  save: {
    height: 400,
    color:["#03b8ab", "#87d4eb"],
    showLegend: true,
    toolunit: ["万元", "万元"],
    xAxisUnit: "月"
  },
  urgent: {
    height: 400,
    xDataKey: "name",
    barColor: ["#03b8ab"],
    lineColor: ["#f8ce55"],
    showLegend: true,
    toolunit: ["万元", "笔"],
    xAxisUnit: "月"
  },
};