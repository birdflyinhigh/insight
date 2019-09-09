export const InitialState = {
    metrics: {},
    flowFunnel: {},
    heatTable: {
        data: [],
        titles: []
    },
    trendLine: {
        data: [],
        xLabels: [],
        name: [],
        loading: true,
    },
    trendLineMetrics:{
        data: [],
        defaultValue: "",
    },
    defaultProduct: [1234, 12, 2832, 1342]
};
export const PathInfo = {
    heatTable: "manager/search/tableTrendSecond",
    getProduct: "manager/traffic/getProduct",
};

export const defaultProduct = 4;