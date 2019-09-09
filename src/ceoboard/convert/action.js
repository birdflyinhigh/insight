import {CommonMethod} from '../../common/tools/common';

export const XhrName = [
    "channel",
    'region',
    'province',
    "city",
    "convertMetrics",
    "bigNumbers",
    "convertFlow",
    "metricsAnalyze",
    "channelAnalyze",
];
export const ChartXhrName = [
    "convertMetrics",
    "bigNumbers",
    "convertFlow",
    "metricsAnalyze",
    "metricsAnalyze",
    // "channelAnalyze",
];
export const XhrAct = CommonMethod.generateActions(XhrName);
export const ChartXhrAct = CommonMethod.generateActions(ChartXhrName);
