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
export const BottomIntroText= "（1）集团UV：集团PC、WAP、买家APP端整体UV；</br>" +
    "（2）进店UV：指访问过店铺的UV数；</br>" +
    "（3）到店率：进店UV / 集团UV ；</br>" +
    "（4）店铺UV：所有服务商店铺UV之和（如果1个访客访问3个店铺，记为3个UV）；</br>" +
    "（5）人均浏览店铺数：店铺UV / 进店UV;</br>" +
    "（6）店铺有效UV：非直访UV均为有效，直访到店铺的UV占店铺整体UV比例超过30%时记直访UV的30%为有效;</br>" +
    "（7）店铺UV损耗率：1 - （店铺有效UV / 店铺UV）；</br>" +
    "（8）可支撑权益工位数：店铺有效UV / 3 ;</br>" +
    "（9）商家版工位数：即商家版工场会员工位数，取所选时间中最后一天状态下的数据；</br>" +
    "（10）日均店铺咨询量：统计周期内，每天咨询服务商的人数均值（咨询方式包括IM、隐私小号、企点）。注：同一个用户咨询多个店铺，算多个店铺咨询；</br>" +
    "（11）工场会员店铺咨询量：统计周期内，每天咨询工场会员服务商的人数均值（咨询方式包括IM、隐私小号、企点）。</br>" +
    "（12）日均店铺咨询率： 日均店铺咨询量 / 日均店铺有效UV；</br>" +
    "（13）售卖比例：商家工位数 / 可支撑权益工位数；</br>" +
    "（14）潜在需求量：地区&类目下订单提交量 + 地区&类目下搜索次数*搜索转化率 ；</br>" +
    "（15）工场会员服务商数：工场会员的服务商数量，地区按服务商购买商家版工场会员的地区来划分（包括本地与漫游），一个服务商可能复记在多个地区；类目按服务商主营类目划分；";