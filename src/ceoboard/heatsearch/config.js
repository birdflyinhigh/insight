export const BaseInfo = [{
  name: "新增开店数",
  key: "ashop",
  rateKey: "ashopRate",
  extraText: "新增开店数： 统计周期内，新开店的服务商数量，包括天蓬开店和猪八戒开店（开店指开店状态成功，按照开店成功日期统计）。"
}, {
  name: "服务商收入",
  key: "income",
  rateKey: "incomeRate",
  unit: "万",
  extraText: "服务商收入： 统计周期内的服务商收入（服务商收入来源包含服务商赏金、推广员分成、退税给服务商和退还快递费）。"
}, {
  name: "有收入服务商数",
  key: "incomeValue",
  rateKey: "incomeValueRate",
  extraText: "有收入服务商数： 统计周期内，收入>0的服务商数（服务商收入来源包含服务商赏金、推广员分成、退税给服务商和退还快递费）。"
}, {
  name: "核心服务商数",
  key: "core",
  // 为空即为不显示环比
  rateKey: "",
  extraText: "核心服务商数： 指今年（自然年）消费5000及以上的服务商数。"
}, {
  name: "服务商消费留存率",
  key: "rate",
  rateKey: "",
  unit: "%",
  extraText: "服务商消费留存率： 服务商消费留存率 =上一年有消费的服务商在今年贡献的GSV / 上年年度服务商GSV；"
}, {
  name: "服务商好评率",
  key: "greateRate",
  rateKey: "greateRateRate",
  unit: "%",
  extraText: "服务商好评率： 统计周期内，按评价时间，雇主的好评率。雇主主动好评率=雇主主动好评数量/雇主主动评价数量。"
}];
export const IntroInfo = {
  serviceVIP: "服务商会员数：普通会员数、在线会员数和工场会员数之和，为历史累计数据",
  topRank: "服务商成交金额： 统计周期内，按成交时间，服务商所有模式成交金额之和。"
};
export const FunelConfig = [{
  key: "level5",
  rateKey: "level5Rate",
  name: ">100w"
}, {
  key: "level4",
  rateKey: "level4Rate",
  name: "(10w, 100w]"
},{
  key: "level3",
  rateKey: "level3Rate",
  name: "(1w , 10w]"
},{
  key: "level2",
  rateKey: "level2Rate",
  name: "(1000 , 1w]"
},{
  key: "level1",
  rateKey: "level1Rate",
  name: "(0 , 1000]"
}];

export const RankTitle = ["排名", "服务商名", "交易额"];
export const ConsColor = ["#9cb6ff", "#bbccff", "#cfdbff", "#e2e9ff", "#f4f6ff"];
export const BottomIntroText= "</br>1. 搜索次数: 雇主（按照雇主来源IP解析城市)在搜索某个类目次数，其中类目根据搜索内容解析匹配一级类目</br>" +
    "2. 工场会员服务商数： 在某个地区的某类目下，工场会员服务商数量，地区按工场会员服务商购买工位和漫游工位的地区统计";