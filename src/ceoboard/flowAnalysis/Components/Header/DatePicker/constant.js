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
    t1: [t.yesterday, t.yesterday],
    t2: [t.recent7Day, t.yesterday],
    t3: [t.recent30Day, t.yesterday],
    t4: [t.startOfMonth, t.yesterday],
    t5: [t.startOfQuarter, t.yesterday],
    t6: [t.startOfYear, t.yesterday],
    default: ['', ''],
};