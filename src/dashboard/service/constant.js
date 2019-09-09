import moment from 'moment';
export const InitialState = {
	defaultTab: "newService",
	startTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
	defaultKeyStartTime: `${(new Date()).getFullYear()}-01-01`,
	endTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
  regionId: -1,
  provinceId: -1,
  industryId: -1,
	region: [],
	province: [],
	industry: [],
	panelData: [],
	areaServiceTrend: {
		data:[],
		xLabels:[],
		loading: false
	},
	areaServiceRate: {
		data:[],
		xLabels:[],
		loading: false
	},
	areaServiceTop: {
		data:[],
		xLabels:[],
		loading: false
	},
	industryServiceTrend: {
		data:[],
		xLabels:[],
		loading: false
	},
	industryerviceTop: {
		data:[],
		xLabels:[],
		loading: false
	}
};
export const PathInfo = {
	area: "manager/menu/getArea",
	province: "manager/menu/getProvince",
	industry: "manager/menu/getProfession",
	panelData: "manager/business/getBusinessTitle",
	areaServiceTrend: "manager/business/getBusinessAreaTrend",
	areaServiceRate: "manager/business/getBusinessAreaRate",
	areaServiceTop: "manager/business/getBusinessAreaTop",
	industryServiceTrend: "manager/business/getBusinessProfessionTrend",
	industryerviceTop: "manager/business/getBusinessProfessionTop",
};
export const panelKey = {
	newService: "新增开店数",
	serviceIncome: "商家收入",
	serviceContri: "商业贡献额",
	hasIncomeService: "有收入商家数",
	keyService: "核心商家数(累计)",
	zworkService: "入住八戒工场商家数",
};
export const PageKey = {
	newService: "index1",
	serviceIncome: "index2",
	serviceContri: "index3",
	hasIncomeService: "index4",
	keyService: "index5",
	zworkService: "index6",
}