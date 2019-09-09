function generateStackArray(chartConfig, data) {
    let finalArray = [];
    data.data.forEach((item, index, array) => {
        finalArray.push({
            name: data.name[index],
            data: item,
            type: "bar",
            barMaxWidth: 12,
            stack: index < chartConfig.stackIdIndex ? "default" : chartConfig.stackId1,
            itemStyle: {
                normal: {
                    barBorderRadius: (function () {
                        if (chartConfig.horizontal) {
                            return [0, 0, 0, 0];
                        }
                        if (index === 0 || index === chartConfig.stackIdIndex) {
                            if (!chartConfig.stackId1 || array.length > 2) {
                                return [0, 0, 6, 6];
                            } else {
                                return [6, 6, 6, 6]
                            }
                        } else if (index === chartConfig.stackIdIndex - 1 || index === array.length - 1) {
                            if (!chartConfig.stackId1 || array.length > 2) {
                                return [6, 6, 0, 0];
                            } else {
                                return [6, 6, 6, 6]
                            }
                        } else {
                            return [0, 0, 0, 0];
                        }
                    })()
                }
            }
        });
    });
    return finalArray;
}

function generateMarkLineBarArray(chartConfig, data) {
    let seriesArray = [];
    data.data.forEach((item, index, array) => {
        seriesArray.push({
            type: 'bar',
            name: data.name ? data.name[index] : "",
            label: {
                show: (chartConfig.showLabel && index == array.length - 1) ? chartConfig.showLabel : false,
                position: "top",
                textStyle: {
                    color: "#2b7bff"
                },
                formatter: (params) => data.total[params.dataIndex]
            },
            barMaxWidth: chartConfig.barMaxWidth || 12,
            stack: chartConfig.stackId ? chartConfig.stackId : null,
            itemStyle: {
                normal: {
                    color: function (params) {
                        if (chartConfig.stackId || chartConfig.sameSeriesColor) {
                            return chartConfig.barColor[index];
                        }
                        return chartConfig.barColor[params.dataIndex % chartConfig.barColor.length];
                    },
                },
            },
            data: (function () {
                let temp = [];
                item.forEach((data, index1, itemData) => {
                    temp.push({
                        itemStyle: {
                            normal: {
                                barBorderRadius: (function () {
                                    if (chartConfig.noRadius) return [0, 0, 0, 0];
                                    if (!chartConfig.stackId || array.length === 1 || (index < array.length - 1 && array[index + 1][index1] == 0)) {
                                        return 6;
                                    } else if (index === array.length - 1) {
                                        return [6, 6, 0, 0];
                                    } else if (index === 0) {
                                        return [0, 0, 6, 6];
                                    } else {
                                        return [0, 0, 0, 0]
                                    }
                                })(),
                            },
                        },
                        value: data
                    });
                    if (typeof data === "object") {
                        temp[index1].specifiedId = data.specifiedId;
                        temp[index1].value = data.value;
                    }
                });
                return temp;
            })(),
        });
    });
    seriesArray[0].markLine = {
        symbol: "circle",
        symbolSize: 1,
        lineStyle: {
            normal: {
                color: "#ea5453",
                width: 2
            }
        },
        label: {
            normal: {
                show: true,
                position: "end",
            }
        },
        data: data.markPoint || []
    };
    return seriesArray;
}

function generateLegend(chartConfig, data) {
    let legendName = data.name || [""];
    if (chartConfig.normalLegend) return legendName;
    let temp = [];
    if (!legendName) {
        return [""];
    }
    legendName.forEach((item, index) => {
        temp.push({
            name: item,
            icon: "circle"
        })
    });
    return temp;
}

function legendSizeOption(chartConfig) {
    return {
        itemWidth: chartConfig.normalLegend ? 18 : 10,
        itemHeight: 10
    }
}

function gridOption(chartConfig) {
    // 和以前部分配置做兼容
    let bottom = chartConfig.gridBottom || chartConfig.bottom;
    return {
        left: chartConfig.gridLeft ? chartConfig.gridLeft : '3%',
        right: chartConfig.gridRight ? chartConfig.gridRight : '9%',
        bottom: bottom ? bottom : '5%',
        top: chartConfig.gridTop ? chartConfig.gridTop : 30,
        containLabel: chartConfig.containLabel === false ? false : true
    }
}

const Option = {
    radiusBarOption: (chartConfig, data) => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                show: chartConfig.showLegend ? true : false,
                ...legendSizeOption(chartConfig),
                data: generateLegend(chartConfig, data),
                bottom: 0
            },
            grid: {...gridOption(chartConfig)},
            xAxis: [{
                type: 'category',
                data: data.xLabels,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#333",
                    formatter: (value) => value + (chartConfig.xFormatter || ""),
                    interval: chartConfig.interval != undefined ? chartConfig.interval : 'auto'
                },
                axisLine: {
                    lineStyle: {
                        color: "#aaa"
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                }
            }],
            series: generateMarkLineBarArray(chartConfig, data),
        };
        return option;
    },
    hRadiusBarOption: (chartConfig, data) => {
        let option = {
            legend: {
                show: chartConfig.showLegend ? true : false,
                itemWidth: 10,
                data: (function () {
                    let temp = [];
                    if (!data.name) {
                        return [""];
                    }
                    data.name.forEach((item, index) => {
                        temp.push({
                            name: item,
                            icon: "circle"
                        })
                    });
                    return temp;
                })(),
                bottom: 0
            },
            tooltip: {
                trigger: 'item',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '11%',
                bottom: 0,
                top: 30,
                containLabel: true
            },
            xAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            }],
            yAxis: [{
                type: 'category',
                data: data.xLabels,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }],
            series: generateMarkLineBarArray(chartConfig, data)
        };
        return option;
    },
    stairsBarOption: (chartConfig, data) => {
        let max = Math.max.apply(null, data.data[0]);
        let data1 = data.data[0].map((item, index) => (max - item) / 2);
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (params) => {
                    let circle = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[1].color};"></span>`
                    let temp = circle + params[1].name + ': \n' + params[1].data;
                    if (chartConfig.formatter) {
                        return temp + "%";
                    }
                    return temp
                }
            },
            legend: {
                show: false,
            },
            grid: {
                left: '3%',
                right: 50,
                bottom: 0,
                top: 30,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                max: max,
            },
            yAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0
                },
                data: data.xLabels
            },
            color: [chartConfig.barColor],
            series: [{
                type: 'bar',
                stack: "stack",
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)"
                    }
                },
                data: data1
            },
                {
                    type: 'bar',
                    stack: "stack",
                    barWidth: 8,
                    data: data.data[0],
                    markLine: {
                        symbol: "circle",
                        symbolSize: 1,
                        lineStyle: {
                            normal: {
                                color: "#aaa",
                                width: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "end",
                                color: chartConfig.barColor
                            }
                        },
                        data: (() => {
                            let temp = [];
                            if (chartConfig.showIndexLine) {
                                temp = [{
                                    name: "indexline",
                                    yAxis: data.xLabels.indexOf("Z4"),
                                    label: {
                                        normal: {
                                            show: false,
                                            formatter: function (value) {
                                                return data.markLabel[0] + "%";
                                            }
                                        }
                                    },
                                }, {
                                    name: "indexline",
                                    yAxis: data.xLabels.indexOf("Z10"),
                                    label: {
                                        normal: {
                                            show: false,
                                            formatter: function (value) {
                                                return data.markLabel[1] + "%";
                                            }
                                        }
                                    },
                                }, {
                                    name: "indexline",
                                    yAxis: data.xLabels.length - 1,
                                    label: {
                                        normal: {
                                            show: false,
                                            formatter: function (value) {
                                                return data.markLabel[2] + "%";
                                            }
                                        }
                                    },
                                    // }, {
                                    // name: "centerline",
                                    // xAxis: (max / 2),
                                    // lineStyle: {
                                    //   normal: {
                                    //     type: "solid",
                                    //     color: chartConfig.barColor[0],
                                    //     width:1
                                    //   }
                                    // },
                                    // label: {
                                    //   normal: {
                                    //     show: false
                                    //   }
                                    // },
                                }]
                            }
                            return temp;
                        })()
                    }
                }
            ]
        };
        return option;
    },
    gradientLineOption: (chartConfig, data) => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    let finanlStr = params[0].axisValue;
                    let tipsStr = params.map((item, index) => {
                        let unit = chartConfig.yFormatter ? chartConfig.yFormatter : "";
                        return item.marker + item.seriesName + ":" + item.value + unit + "</br>";
                    }).join("");
                    return `${finanlStr}</br>${tipsStr}`;
                }
            },
            legend: {
                show: chartConfig.showLegend ? chartConfig.showLegend : false,
                ...legendSizeOption(chartConfig),
                data: generateLegend(chartConfig, data),
                bottom: 0
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                axisLabel: {
                    color: "#333"
                },
                data: data.xLabels
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: chartConfig.hideSplitLine ? false : true,
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                axisLabel: {
                    formatter: function (value) {
                        return chartConfig.yFormatter ? value + chartConfig.yFormatter : value;
                    }

                }
            },
            series: (function () {
                let temp = [];
                data.data.forEach((item, index) => {
                    temp.push({
                        name: data.name[index],
                        data: item,
                        type: 'line',
                        smooth: chartConfig.smooth ? true : false,
                        lineStyle: {
                            color: chartConfig.lineColor[index]
                        },
                        itemStyle: {
                            normal: {
                                color: chartConfig.lineColor[index]
                            }
                        }
                    });
                });
                return temp;
            })()
        };
        return option;
    },

    fullSizeLineOption: (chartConfig, data) => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    let finanlStr = params[0].axisValue;
                    let tipsStr = params.map((item, index) => {
                        let unit = chartConfig.yFormatter ? chartConfig.yFormatter : "";
                        return item.marker + item.seriesName + ":" + item.value + unit + "</br>";
                    }).join("");
                    return `${finanlStr}</br>${tipsStr}`;
                }
            },
            grid: {
                "left": '1%',
                "right": '1.5%',
                "bottom": '10%',
                'top': "15%",
                "containLabel": true
            },
            legend: {
                show: chartConfig.showLegend ? chartConfig.showLegend : false,
                ...legendSizeOption(chartConfig),
                data: generateLegend(chartConfig, data),
                bottom: 0
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                axisLabel: {
                    color: "#333"
                },
                data: data.xLabels
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: chartConfig.hideSplitLine ? false : true,
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                axisLabel: {
                    formatter: function (value) {
                        return chartConfig.yFormatter ? value + chartConfig.yFormatter : value;
                    }

                }
            },
            series: (function () {
                let temp = [];
                data.data.forEach((item, index) => {
                    temp.push({
                        name: data.name[index],
                        data: item,
                        type: 'line',
                        smooth: chartConfig.smooth ? true : false,
                        lineStyle: {
                            color: chartConfig.lineColor[index]
                        },
                        itemStyle: {
                            normal: {
                                color: chartConfig.lineColor[index]
                            }
                        }
                    });
                });
                return temp;
            })()
        };
        return option;
    },
    waringLineChart: (chartConfig, data) => {
        let option = {
            tooltip: {
                show: true
            },
            legend: {
                show: true,
                itemWidth: 10,
                data: (function () {
                    let temp = [];
                    if (!data.name) {
                        return [""];
                    }
                    data.name.forEach((item, index) => {
                        temp.push({
                            name: item,
                            icon: index === data.name.length - 1 ? "emptyCircle" : "circle"
                        })
                    });
                    return temp;
                })(),
                bottom: 0,

            },
            tooltip: {
                trigger: "axis"
            },
            xAxis: {
                type: 'category',
                data: data.xLabels,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#333",
                    interval: chartConfig.interval != undefined ? chartConfig.interval : 'auto'
                },
                axisLine: {
                    lineStyle: {
                        color: "#aaa"
                    }
                }
            },
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: (value, index) => {
                        let formatter = chartConfig.yFormatter ? chartConfig.yFormatter : "";
                        return value + formatter;
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                }
            }, {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            ],
            series: (function () {
                let finalArray = [];
                data.data.forEach((item, index, array) => {
                    finalArray.push({
                        name: data.name[index],
                        data: item,
                        type: chartConfig.barIndex == index ? "bar" : "line",
                        yAxisIndex: chartConfig.startAntherIndex == index ? 1 : 0,
                        itemStyle: {
                            normal: {
                                color: chartConfig.color[index]
                            }
                        }
                    });
                    if (chartConfig.barIndex == index) {
                        finalArray[index].barMaxWidth = 12;
                        finalArray[index].itemStyle.normal.barBorderRadius = 6;
                    }
                });
                finalArray.push({
                    name: data.name[data.name.length - 1],
                    data: data.warnData,
                    type: 'scatter',
                    yAxisIndex: 0,
                    symbol: "emptyCircle",
                    symbolSize: 7,
                    itemStyle: {
                        color: 'red'
                    }
                });
                return finalArray;
            })()
        };
        return option;
    },
    lineBarChart: (chartConfig, data) => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                formatter: (params) => {
                    let xFormatter = chartConfig.xFormatter || "";
                    let finanlStr = `${params[0].axisValue.replace(/\n/g, "")}${xFormatter}</br>`;
                    let formatter = "";
                    params.forEach((item, index) => {
                        if (index < chartConfig.startAntherIndex && chartConfig.yFormatter) {
                            formatter = chartConfig.yFormatter;
                        } else if (!(index < chartConfig.startAntherIndex) && chartConfig.y1Formatter) {
                            formatter = chartConfig.y1Formatter;
                        }
                        finanlStr += `${item.marker}${item.seriesName}: ${item.value}${formatter}</br>`
                    });
                    return finanlStr;
                }
            },
            legend: {
                show: true,
                ...legendSizeOption(chartConfig),
                data: generateLegend(chartConfig, data),
                bottom: 0,
            },
            grid: {
                left: chartConfig.gridLeft ? chartConfig.gridLeft : "10%",
                right: chartConfig.gridRight ? chartConfig.gridRight : "10%",
                bottom: chartConfig.bottom ? chartConfig.bottom : 60
            },
            xAxis: {
                type: 'category',
                data: data.xLabels,
                axisTick: {
                    show: false,

                },
                axisLabel: {
                    color: "#333",
                    interval: chartConfig.interval != undefined ? chartConfig.interval : 'auto',
                    formatter: (value) => chartConfig.xFormatter ? value + chartConfig.xFormatter : value
                },
                axisLine: {
                    lineStyle: {
                        color: "#aaa"
                    }
                }
            },
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: (value, index) => {
                        if (chartConfig.hideY1AxisFormat) return value;
                        let formatter = chartConfig.yFormatter ? chartConfig.yFormatter : "";
                        return value + formatter;
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                }
            }, {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: (value, index) => {
                        if (chartConfig.hideY2AxisFormat) return value;
                        let formatter = chartConfig.y1Formatter ? chartConfig.y1Formatter : "";
                        return value + formatter;
                    }
                },
            },
            ],
            series: (function () {
                let finalArray = [];
                data.data.forEach((item, index, array) => {
                    finalArray.push({
                        name: data.name[index],
                        data: item,
                        type: index >= chartConfig.lineIndex ? "line" : "bar",
                        yAxisIndex: index >= chartConfig.startAntherIndex ? 1 : 0,
                        itemStyle: {
                            normal: {
                                color: chartConfig.color[index]
                            }
                        }
                    });
                    if (chartConfig.lineIndex != index) {
                        finalArray[index].barMaxWidth = chartConfig.barMaxWidth || 12;
                        if (!chartConfig.noRadius) {
                            finalArray[index].itemStyle.normal.barBorderRadius = 6;
                        }
                    }
                    if (index >= chartConfig.lineIndex) {
                        finalArray[index].smooth = chartConfig.smooth ? true : false;
                    }
                });
                return finalArray;
            })()
        };
        return option;
    },
    multiStackBar: (chartConfig, data) => {
        // 默认只支持两个系列堆叠
        let option = {
            legend: {
                show: true,
                itemWidth: 10,
                data: (function () {
                    let temp = [];
                    if (!data.name) {
                        return [""];
                    }
                    data.name.forEach((item, index) => {
                        temp.push({
                            name: item,
                            icon: "circle"
                        })
                    });
                    return temp;
                })(),
                bottom: 0,

            },
            tooltip: {
                trigger: "axis",
                formatter: (params) => {
                    let baseStr = params[0].axisValue + "</br>";
                    let rateKey = chartConfig.rateKey ? chartConfig.rateKey : "";
                    params.forEach((item, index) => {
                        baseStr += `${item.marker}${item.seriesName}: ${item.value}`;
                        if (rateKey) {
                            baseStr += ` | ${data[rateKey][index][item.dataIndex]}%</br>`;
                        }
                    });
                    return baseStr;
                }
            },
            xAxis: {
                type: 'category',
                data: data.xLabels,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#333",
                    interval: chartConfig.interval != undefined ? chartConfig.interval : 'auto'
                },
                axisLine: {
                    lineStyle: {
                        color: "#aaa"
                    }
                }
            },
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: (value, index) => {
                        let formatter = chartConfig.yFormatter ? chartConfig.yFormatter : "";
                        return value + formatter;
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                }
            }],
            color: chartConfig.color,
            series: generateStackArray(chartConfig, data)
        };
        return option;
    },
    donutChart: (chartConfig, originData) => {
        let data = originData.data;
        let sum = data.reduce((sum, item) => sum = sum + item.value, 0);
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    let unit = chartConfig && chartConfig.unit ? chartConfig.unit : "";
                    let dataIndex = params["dataIndex"];
                    let percent = chartConfig.showSelfPercent ? originData["data"][dataIndex]["percent"] : params.percent;
                    return `${params.name}:${params.value}${unit} (${percent}%)`
                }
            },
            legend: {
                show: chartConfig.hideLegend ? false : true,
                orient: 'vertical',
                left: chartConfig.legendLeft !== undefined ? chartConfig.legendLeft : 10,
                top: chartConfig.legendTop !== undefined ? chartConfig.legendTop : 20,
                itemGap: chartConfig.legendGap !== undefined ? chartConfig.legendGap : 10,
                ...legendSizeOption(chartConfig),
                formatter: function (name) {
                    let curItem = data.filter((item, index) => item.name == name);
                    let percent = 0;
                    let finalName = name;
                    let isThrehold = document.documentElement.clientWidth > 1800;
                    if (sum != 0) {
                        percent = chartConfig.showSelfPercent ? curItem[0].percent : (curItem[0].value / sum * 100).toFixed(2);
                    }
                    if (chartConfig.maxLegendLength && name.length > chartConfig.maxLegendLength && !isThrehold) {
                        finalName = name.slice(0, chartConfig.maxLegendLength) + "...";
                    }
                    if (chartConfig.showSelfNum) return `${finalName}: ${curItem[0].value}`;
                    if (chartConfig.showSelfBoth) return `${finalName}: ${curItem[0].value}   ${percent}%`;
                    return `${finalName}: ${percent}%`;
                },
                data: (function () {
                    if (chartConfig.legend) return chartConfig.legend;
                    if (chartConfig.normalLegend) return data;
                    return data.map((item, index) => ({name: item.name, icon: "circle"}))
                })()
            },
            color: chartConfig.color ? chartConfig.color : ["#78a7ff", "#2b7bff", "#f98c4a", "#f06868", "#16c17a", "#9999ff"],
            series: [{
                name: '',
                type: 'pie',
                radius: (chartConfig && chartConfig.radius) ? chartConfig.radius : ['40%', '55%'],
                center: (chartConfig && chartConfig.center) ? chartConfig.center : ['50%', '50%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: (params) => {
                            let unit = "";
                            if (chartConfig && chartConfig.unit) {
                                unit = chartConfig.unit;
                            }
                            return `${params.data.name}:\n${params.percent}%\n${params.data.value}${unit}`
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: data
            }]
        };
        return option;
    },
    sumTipsRBarChart: (chartConfig, data) => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (params) => {
                    let temp = `${params[0].name}</br>携程差旅费：${data.total[params[0]["dataIndex"]]}</br>`;
                    let newAryStr = params.map((item) => `${item.marker}${item.seriesName}：${item.value}</br>`)
                    return temp + newAryStr.join("");
                }
            },
            legend: {
                show: chartConfig.showLegend ? true : false,
                ...legendSizeOption(chartConfig),
                data: generateLegend(chartConfig, data),
                bottom: 0
            },
            xAxis: [{
                type: 'category',
                data: data.xLabels,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#333",
                    formatter: (value) => value + (chartConfig.xFormatter || ""),
                    interval: chartConfig.interval != undefined ? chartConfig.interval : 'auto'
                },
                axisLine: {
                    lineStyle: {
                        color: "#aaa"
                    }
                },
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                }
            }],
            color: chartConfig.barColor,
            series: (() => {
                let seriesArray = [];
                data.data.forEach((item, index, array) => {
                    seriesArray.push({
                        type: 'bar',
                        name: data.name[index],
                        barMaxWidth: 12,
                        stack: chartConfig.stackId ? chartConfig.stackId : null,
                        data: (function () {
                            let temp = [];
                            item.forEach((data, index1, itemData) => {
                                temp.push({
                                    itemStyle: {
                                        normal: {
                                            barBorderRadius: (function () {
                                                if (chartConfig.noRadius) return [0, 0, 0, 0];
                                                if (!chartConfig.stackId || array.length === 1 || (index < array.length - 1 && array[index + 1][index1] == 0)) {
                                                    return 6;
                                                } else if (index === array.length - 1) {
                                                    return [6, 6, 0, 0];
                                                } else if (index === 0) {
                                                    return [0, 0, 6, 6];
                                                } else {
                                                    return [0, 0, 0, 0]
                                                }
                                            })(),
                                        },
                                    },
                                    value: data
                                })
                            });
                            return temp;
                        })(),
                    });
                });
                return seriesArray;
            })()
        }
        return option;
    },
    multiStackHBar: (chartConfig, data) => {
        let option = {
            legend: {
                show: true,
                itemWidth: 10,
                data: (function () {
                    let temp = [];
                    if (!data.name) {
                        return [""];
                    }
                    data.name.forEach((item, index) => {
                        temp.push({
                            name: item,
                            icon: "circle"
                        })
                    });
                    return temp;
                })(),
                bottom: 0,
            },
            grid: {
                left: '5%',
                right: 50,
                bottom: 0,
                top: 30,
                containLabel: true
            },
            tooltip: {
                trigger: "axis",
                formatter: (params) => {
                    let baseStr = params[0].axisValue + "</br>";
                    let rateKey = chartConfig.rateKey ? chartConfig.rateKey : "";
                    params.forEach((item, index) => {
                        baseStr += `${item.marker}${item.seriesName}: ${item.value}${chartConfig.formatter}`;
                        if (rateKey) {
                            baseStr += ` | ${data[rateKey][index][item.dataIndex]}%</br>`;
                        } else {
                            baseStr += "</br>"
                        }
                    });
                    return baseStr;
                }
            },
            xAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                max: chartConfig.max || null,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            }],
            yAxis: [{
                type: 'category',
                data: data.xLabels,
                axisLine: {
                    show: false
                },

                axisTick: {
                    show: false
                }
            }],
            color: chartConfig.color,
            series: generateStackArray(chartConfig, data)
        }
        return option;
    },
    areaLineChart: (chartConfig, data) => {
        let option = {
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                show: chartConfig.showLegend ? true : false,
                ...legendSizeOption(chartConfig),
                data: generateLegend(chartConfig, data),
                bottom: 0
            },
            grid: {
                left: chartConfig.gridLeft ? chartConfig.gridLeft : "10%",
                right: chartConfig.gridRight ? chartConfig.gridRight : "10%",
                bottom: chartConfig.gridBottom ? chartConfig.gridBottom : 60
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                axisLabel: {
                    color: "#333"
                },
                data: data.xLabels
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value) {
                        return chartConfig.yFormatter ? value + chartConfig.yFormatter : value;
                    }

                }
            },
            color: chartConfig.color,
            series: (function () {
                let temp = [];
                data.data.forEach((item, index) => {
                    temp.push({
                        name: data.name[index],
                        data: item,
                        type: 'line',
                        symbolSize: 2,
                        smooth: chartConfig.smooth ? true : false,
                        stack: chartConfig.stackId ? chartConfig.stackId : null,
                        areaStyle: {
                            normal: {
                                opacity: 1
                            }
                        }
                    });
                });
                return temp;
            })()
        };
        return option;
    },
    CNMapChart: (chartConfig, data) => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            tooltip: {
                formatter: (params) => {
                    if (!chartConfig.mapFormatterKeys) {
                        return `${params.seriesName}</br>${params.name}: ${params.value}`;
                    }
                    let data = params.data;
                    let finanlStr = params.seriesName + "</br>";
                    if (chartConfig.tips) finanlStr += chartConfig.tips + "</br>";
                    chartConfig.mapFormatterKeys[0].forEach((item, index) => {
                        finanlStr += `${chartConfig.mapFormatterKeys[1][index]}: ${(typeof data[item] == "undefined" ? "-" : data[item])}</br>`
                    });
                    return finanlStr;
                }
            },
            visualMap: {
                show: false,
                min: 0,
                // max: 1000,
                left: 'left',
                top: 'bottom',
                calculable: true,
                align: "right",
                color: chartConfig.color
            },
            toolbox: {
                show: false
            },
            series: [
                {
                    name: chartConfig.name || "",
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: data.data
                },
            ]
        };
        return option;
    },
    // color->[positive,negative]; (normalColor->[] topColor->[] --- topNum)
    topHBarChart: (chartConfig, data) => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                show: false,
            },
            grid: {
                left: chartConfig.gridLeft ? chartConfig.gridLeft : '3%',
                right: 100,
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show: false,
            },
            yAxis: {
                type: 'category',
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                data: data.xLabels
            },
            series: (() => {
                let temp = [];
                data.data.map((item, index) => {
                    let seriesItem = item.map((singleData, index1) => {
                        return ({
                            value: singleData,
                            itemStyle: {
                                normal: {
                                    color: (() => {
                                        if (!chartConfig.topNum) {
                                            return singleData > 0 ? chartConfig.color[0] : chartConfig.color[1]
                                        }
                                        return (index1 < chartConfig.topNum) ? chartConfig.topColor[index] : chartConfig.normalColor[index];
                                    })()
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "right",
                                    // formatter: (params) => `${params.value} ${params.dataIndex}`
                                    formatter: (params) => {
                                        // if(!params.value) return "";
                                        let percent = data.percent ? (" | " + data.percent[params.dataIndex]) : ""
                                        return `${params.value}${percent}`
                                    }
                                }
                            }
                        });
                    });
                    temp.push({
                        name: data.name[index],
                        type: 'bar',
                        barMaxWidth: 10,
                        data: seriesItem
                    });
                });
                return temp;
            })()
        };
        return option;
    }
}
export default Option;