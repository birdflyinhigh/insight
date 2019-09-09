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
    defaultProduct: [1234]
};
export const PathInfo = {
    heatTable: "manager/traffic/tableTrendSecond",
    getProduct: "manager/traffic/getProduct",
};

export const defaultProduct = 4;