import moment from 'moment';


export const InitialState = {
    defaultIndex:[3,4],
    index: 1,
    bigNumbers: {},
    convertFlow: {},
    metricsAnalyze: {
        data: [],
        xLabels: [],
        name: [],
        loading: true,
    },
    channelTrend: {
    },
    channelDonut: [],
    title: "ZBJ平台UV",
};
export const PathInfo = {
    channel: "manager/convert/channel",
    region: "manager/convert/region",
    province: "manager/convert/province",
    city: "manager/convert/city",
    bigNumbers: "manager/convert/bigNumbers",
    convertFlow: "manager/convert/convertFlow",
    metricsAnalyze: "manager/convert/metricsAnalyze",
    channelAnalyze: "manager/convert/channelAnalyze",
    convertMetrics: "manager/convert/convertMetrics",
};