export const InitialState = {
    metrics: {},
    flowFunnel: {},
    heatTable: {
        data: [1, 2, 3]
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
    }

};
export const PathInfo = {
    heatTable: "manager/search/tableTrend",
};

