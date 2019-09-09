export const RainbowColor = ["#5888f4", "#c1b6fb", "#84e1bf", "#ffee62", "#ffb762", "#db9be4", "#a4ebf5", "#f375a5",
"#4ec67e", "#1096eb", "#ee8036", "#ffe403", "#acd7dd", "#8fb1ff", "#8fb1ff", "#dcc4df", "#f8f4d3"];
export const ProductList = [{ 
  name: "企业管家",
  value: 0
},{
  name: "非企业管家",
  value: 1
}];
export const EmployTabKey = [{
  title: "成交雇主数",
  key: "employe",
  link: "/manager/enum"
},{
  title: "成交订单数",
  key: "serverorder",
  link: "/manager/eorder"
},{
  title: "GMV",
  key: "income",
  link: "/manager/eincome"
},{
  title: "订单毛利",
  key: "profit",
  link: "/manager/profit"
},{
  title: "核心雇主数",
  key: "keyemploy",
  link: "/manager/kemploy"
},{
  title: "客户消费留存率",
  key: "cusrate",
  link: "/manager/cusrate"
}];
export const CommonPath = {
  region: "manager/menu/getArea",
	province: "manager/menu/getProvince",
  industry: "manager/menu/getProfession",
  epanelData: "manager/employer/getEmployerTitle"
}
