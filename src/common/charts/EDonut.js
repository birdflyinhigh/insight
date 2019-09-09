export const getDonutOption = (data, config) => {
  let sum = data.reduce((sum, item) => sum = sum + item.value, 0);
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        let unit = config && config.unit ? config.unit : "";
        return `${params.name}:${params.value}${unit} (${params.percent}%)`
      }
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 10,
      top: 0,
      bottom: 5,
      // selectedMode: false,
      formatter: function(name){
        let curItem = data.filter((item, index) => item.name == name);
        let percent = curItem[0].value / sum * 100;
        return `${name}: ${percent.toFixed(2)}%`;
      },
      data: (function() {
        if(config.legend){
          return config.legend;
        }
        return data.map((item, index) => item.name)
      })()
    },
    color: ["#03b8ab", "#97c9d7",  "#f8ce55",  "#5d6b6d","#e2c1bf", "#84cdee", "#ff9e64",
     "#ab729c", "#9e9e9e", "#ffb187",  "#c5e1a5", "#80cbc4", "#2d91bb"],
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: (config && config.radius) ? config.radius : ['40%', '60%'],
      center: (config && config.center) ? config.center : ['50%', '50%'],
      avoidLabelOverlap: true,
      label: {
        normal: {
          show: false,
          position: 'left',
          formatter: (params) => {
            let unit = "";
            if (config && config.unit) {
              unit = config.unit;
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
}
export const getPieOption = (data, config) => {
  let sum = data.reduce((sum, item) => {
    return sum + item.value;
  }, 0);
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        let unit = config && config.unit ? config.unit : "";
        return `${params.name}:\n${params.value}${unit}${params.percent}%`
      }
    },
    legend: {
      show: false,
      orient: 'horizontal',
      bottom: 5,
      data: (function() {
        return data.map((item, index) => item.name)
      })()
    },
    color: ["#03b8ab", "#97c9d7", "#5d6b6d", "#78c659", "#f1c80f", "#fc625e", "#374648"],
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: config.radius || '50%',
      avoidLabelOverlap: true,
      startAngle: Math.round(360 * (data[0].value / sum) / 2),
      label: {
        normal: {
          show: true,
          position: 'left',
          formatter: (params) => {
            return `${params.data.name}:${params.percent}%\n${params.data.value}`
          }
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: data
    }]
  };
  return option;
}