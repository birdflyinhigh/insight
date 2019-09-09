import moment from 'moment';

export const quickBtns = [
    {name: "昨天", key: "t1"},
    {name: "近7天", key: "t2"},
    {name: "近30天", key: "t3"},
    {name: "本月", key: "t4"},
    {name: "本季度", key: "t5"},
    {name: "当年", key: "t6"},
    {name: "自定义时间", key: "default"}];

const calDate = (delta) => moment().subtract(delta, 'days');

const t = {
    today: calDate(0),
    yesterday: calDate(1),
    recent7Day: calDate(7),
    recent30Day: calDate(30),
    startOfMonth: moment().startOf('month'),
    startOfQuarter: moment().startOf('quarter'),
    startOfYear: moment().startOf('year'),
};


export const btnDateDict = {
    t1: [{startTime:t.yesterday}, {endTime:t.yesterday}],
    t2: [{startTime:t.recent7Day}, {endTime:t.yesterday}],
    t3: [{startTime:t.recent30Day}, {endTime:t.yesterday}],
    t4: [{startTime:t.startOfMonth}, {endTime:t.yesterday}],
    t5: [{startTime:t.startOfQuarter}, {endTime:t.yesterday}],
    t6: [{startTime:t.startOfYear}, {endTime:t.yesterday}],
    default: ['', ''],
};