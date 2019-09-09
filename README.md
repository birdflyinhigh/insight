### 技术概况
项目使用react+redux+axios搭建，采取以业务划分文件目录的方式；每个业务目录根据功能分为  
1. Container.js-页面和reducer的连接，请求的发送、action的触发
2. constant.js-常量，主要包含path，InitialState
3. action.js-包含actionName以及生成的action，分为Xhr的和纯Ui的
4. reducer.js-包含页面的reducer，纯逻辑操作
5. Compoment.js / Component文件夹-纯UI表现的组件，一个页面太长可被拆分为多个component，存放于文件夹中  
主要是这五种，某些通用的action/constant/reducer会被抽出来独立地在该文件夹中存在；详情参见文件 

### 使用方法
```git clone git@git.zhubajie.la:wangxiaoli/nodejs-data-erp.git```  

```npm install```  

```npm start```  
访问控制台提示地址即可
### 部署方法
1. ```npm run build```打包文件  
2. 打包文件后，将static目录中文件提到build下，static目录删除，打包发送给后端部署
3. 提供给后端新增的url，后端在自己项目中新增url
4. 测试环境验证  

### 环境地址
测试环境：```https://erpbi.test.zbjdev.com/{path}```  
预发布环境：```https://erpbi.zbj.com/{path}```  
线上环境：```https://erpbi.zbj.com/{path}```

### 已有组件
#### src/common/charts中包含公用的组件
src/common/charts中包含的Echarts相关组件：
1. EConfig.js 常用echarts组件的配置；
2. EDnut.js 总经理仪表盘专用带中心文字饼图；
3. NodataEcharts 包含暂无数据和暂无权限提示的echarts组件；
4. LoadingEcharts NodataEcharts基础上，含有正在加载提示的echarts组件
src/common/charts其余皆为recharts组件，主要供采购仪表盘使用，其余并无使用

#### src/common/component中包含公用组件
1. BottomIntro.js 快速生成总经理仪表盘底部介绍的组件
2. Help.js 快速生成页面所用问号小图标以及文本的组件
3. table.js 快速生成可合并列图表的组件(目前只用于采购仪表盘)

#### src/common/tools中包含的公用
1. common.js 包含与批量生成action，发送请求并触发action，仅发送请求不触发action，post请求、下载数据的方法
2. timeUtil.js：包含获取时间的方法，包含昨天、最近7天、最近30天、当前月第一天、当前季度第一天、当年第一天
3. chartTool.js：包含转换图表数据的工具，主要用于采购仪表盘
4. uitl.js： 包含日期方法（老版本可能有用，新开发建议用moment.js重写）+属性（跨页面传参时候，处理刷新情况）+字符串截断（用于帮助浮框）方法

#### src/common/tools中包含的公用
### 已有页面
/manager/  总经理仪表盘  
/hr  人力仪表盘
/admin  行政仪表盘  
更多详见nodejs-data-erp/src/App.js文件；