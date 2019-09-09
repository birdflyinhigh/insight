export const ProductColumn = [{
  key: "NONE",
  title: "排名",
  dataIndex: "NONE",
  render: (text, record, index) => {
    return index + 1;
  }
}, {
  key: "name",
  title: "产品",
  dataIndex: "name",
}, {
  key: "jiaoyi",
  title: "交易收入",
  dataIndex: "jiaoyi",
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.jiaoyi - b.jiaoyi,
}, {
  key: "jishufuwu",
  title: "技术服务费",
  dataIndex: "jishufuwu",
  sorter: (a, b) => a.jishufuwu - b.jishufuwu,
}, {
  key: "gongchanghuiyuan",
  title: "工场会员收款",
  dataIndex: "gongchanghuiyuan",
  sorter: (a, b) => a.gongchanghuiyuan - b.gongchanghuiyuan,
}, {
  key: "zaixianhuiyuan",
  title: "在线会员收款",
  dataIndex: "zaixianhuiyuan",
  sorter: (a, b) => a.zaixianhuiyuan - b.zaixianhuiyuan,
}];
export const AreaColumn = (type) => {
  return [{
    key: "NONE",
    title: "排名",
    dataIndex: "NONE",
    render: (text, record, index) => {
      return index + 1;
    }
  }, {
    title: type === "area" ? "大区" : "全国省份",
    dataIndex: "name",
  // }, {
  //   title: "收入",
  //   dataIndex: "income",
  //   defaultSortOrder: 'descend',
  //   sorter: (a, b) => a.income - b.income,
  }, {
    title: "八戒管家收入",
    dataIndex: "bajieguanjia",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.bajieguanjia - b.bajieguanjia,
  }, {
    title: "工场会员收入",
    dataIndex: "gongchanghuiyuan",
    sorter: (a, b) => a.gongchanghuiyuan - b.gongchanghuiyuan,
  }, {
    title: "广告收入",
    dataIndex: "guanggao",
    sorter: (a, b) => a.guanggao - b.guanggao,
  }, {
    title: "分包订单金额",
    dataIndex: "fenbao",
    sorter: (a, b) => a.fenbao - b.fenbao,
  }]
};
export const TabInfo = [{
  name: "收入",
  keyValue: "income",
  keyRate: "incomeRate",
  extraText: "收入： 收入数据为公司各类业务收入，包括交易收入、广告收入、会员收入、其他收入；数据来自于ERP系统，为管报分配前收入数据；详细说明请见本页底部说明内容；"
}, {
  name: "主营业务成本",
  keyValue: "cost",
  keyRate: "costRate",
  extraText: "主营业务成本： 各类型收入对应的主营业务成本；"
}, {
  name: "毛利",
  keyValue: "profit",
  keyRate: "profitRate",
  extraText: "毛利： 收入 - （对应的）主营业务成本；"
// }, {
//   name: "人均毛利",
//   keyValue: "avg",
//   keyRate: "avgRate",
//   extraText: "人均毛利： 总毛利 / 总人数"
}];
export const BottomIntroText = `1、整体说明：</br>
（1）因ERP核算暂未实现T+1，仪表盘目前展示营收数据截止时间为5天前，5月31日（预计）ERP核算实现T+1之后，仪表盘营收数据将同步实现T+1；</br>
（2）排行榜模块，因产品、区域线需要更新至昨日的最新数据，故暂未从ERP取数，数据来源为大数据平台，逻辑与ERP管报数据不完全一致；</br>

2、ERP线上管报与财务线下管报数据差异说明：</br>
（1）严选、咨询：线下管报人工调整系统中未打标的严选、咨询订单</br>
（2）行业总分包及会员收入：线下管报人工剔除18年订单在19年确认收入成本、部分未接入ERP的收入</br>
（3）增值服务收入：线下管报人工调整商机广告、顾问平台收入城市字段不符合的部分</br>
（4）工场会员：线下管报人工调整漫游工位收入的城市、代收水电费抵减成本，装修成本计入会员成本</br>
（5）知产板块酷爱、财税：因未在ERP核算，线下管报由人工调整</br>
（6）内部结算：线下管报人工调整抵消了内部结算</br>

3、核心小B数：指今年（自然年）消费2w及以上的雇主数。</br>

4、年均消费额：年均消费额=雇主总消费金额/核心小B数，雇主总消费金额包括：设计、IT、营销、综合、知产、财税、科技服务、企业管家、总分包订单打款金额，其中企业管家、总分包指分包订单结算金额；</br>

5、收入： 收入数据为公司各类业务收入，包括交易收入、广告收入、会员收入、其他收入；数据来自于ERP系统，为管报分配前收入数据；</br>
（1）交易收入包括：</br>
     --总分包收入：指统计周期内，按项目完工进度确认收入</br>
     --企业管家收入：通用管家收入：指统计周期内，按项目完工进度确认收入；批量管家收入：指统计周期内，按收款确认收入</br>
     --知识产权收入：商标、交易、版权等按申报确认收入，加盟费按分期计收入</br>
     --财税收入：代理记账等按照服务期分期确认收入，资质办理、工商注册等按服务完成时确认收入</br>
     --科技咨询收入：指统计周期内，按项目结题确认收入</br>
     --装修收入：指统计周期内，按项目完工确认收入</br>
     --佣金收入（S10改造前）：指统计周期内，按业务完结收取费用时确认收入</br>
（2）会员收入包括</br>
     --在线会员：指统计周期内，按12期摊销确认收入</br>
     --工场会员：指统计周期内，按合同期分期确认收入</br>
（3）广告收入</br>
     --指统计周期内，按消耗确认收入</br>
（4）其他收入包括</br>
     --政府补贴：政府补贴收入：指统计周期内，按收款确认收入；装修补贴收入：指统计周期内，按收款确认收入   </br>
     --运营补贴：指统计周期内，按收款确认收入</br>
     --理财收益：指统计周期内，按照当期实际收益确认收入</br>

6、主营业务成本： 各类型收入对应的主营业务成本；包括以下内容：</br>
（1）交易成本</br>
     --总分包：指统计周期内，按项目完工进度确认分包成本</br>
     --企业管家：通用管家成本：指统计周期内，按结算价确认成本，独立法人行业线按结算价进行消耗并确认收入； 批量管家成本：指统计周期内，按收入的85%确认管家成本</br>
     --知识产权：指统计周期内，确认申报对应的成本（官费等）及分包成本</br>
     --财税：指统计周期内，按服务期确认成本</br>
     --科技咨询：指统计周期内，确认分包成本</br>
     --装修：指统计周期内，按项目完工确认成本</br>
（2）会员成本</br>
     --工场会员：指统计周期内，按实际发生确认成本</br>
（3）广告成本</br>
     --指统计周期内，按实际支付的外投费用确认成本</br>
（4）其他成本</br>
     --政府补贴：指统计周期内，外部采购成本     </br>
     --运营补贴：指统计周期内  ，按收入的97%计提成本</br>

7、毛利： 收入 - （对应的）主营业务成本；</br>

8、产品排行榜 - 交易收入：以订单的打款时间为准，统计时间段内所有成功打款的金额。       </br>

9、产品排行榜 - 技术服务费：行业总分包毛利+佣金+猪币消耗+IT八戒云站自营毛利，其中：   </br>    
（1）总分包毛利：按照分包成交时间统计，毛利=总包成交金额-分包成交金额；</br>
（2）佣金：按照抽佣时间统计的抽佣金额；</br>
（3）猪币消耗：投标或咨询等场景发生的猪币消耗金额；      </br> 
（4）IT八戒云站自营毛利：八戒云站自营店铺收入数据*60% ；</br>
（5）ITCRM领款部分佣金数据；f.互娱官方店铺收支毛利；</br>
（6）互娱发行联运业务毛利：超游收入数据*70%；     </br>  

10、产品排行榜 - 工场会员收款：按照合同支付时间且订单状态已支付获取收款金额。仅统计有效合同（已生效、提前解约、到期退租的合同）的账款。      </br> 

11、产品排行榜 - 在线会员收款：按照支付时间获取收款金额，其中钉耙卡线下数据指：签单系统销售提单数据+工具市场填写“推荐码（即销售工号）”的数据。      </br>

12、区域排行榜 - 八戒管家收入：分包订单消耗元宝数*500 ；</br>

13、区域排行榜 - 分包订单金额：总分包业务分包订单金额；</br>

14、区域排行榜 - 工场会员收入：按已收款的账款总金额来计算，以账单支付日作为统计日期，计每日的实收款金额。</br>

15、区域排行榜 - 广告收入：收款数据。</br>`;
export const IntroText = {
  // rank: "八戒管家收入 ，定义：分包订单消耗元宝数*500 ；</br>分包订单金额：总分包业务分包订单金额；</br>工场会员收入是按已收款的账款总金额来计算，以账单支付日作为统计日期，计每日的实收款金额。</br>广告收入为收款数据。"
  rank:"因ERP核算暂未实现T+1，排行榜数据暂未采用管报数据；</br>5月31日（预估）ERP核算实现T+1后，再进行数据切换；</br>排行榜不受筛选条件影响；"
}