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
    metrics: "manager/traffic/flowDispatch",
    flowFunnel: "manager/traffic/flowFunnel",
    heatTable: "manager/traffic/tableTrend",
    trendLine: "manager/traffic/flowTrend",
    trendLineMetrics: "manager/traffic/getIndex",
};

