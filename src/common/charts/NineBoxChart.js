import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class NineBoxChart extends Component{
  constructor(props){
    super(props);
    this.intro = {
      hl: {
        key: "hl",
        title: "高驱动低贡献",
        text1: "正激励（物质）",
        text2:  "业绩改善计划"
      },
      hm: {
        key: "hm",
        title: "高驱动中贡献",
        text1: "正激励（物质+精神）",
        text2:  "员工后备计划"
      },
      hh: {
        key: "hh",
        title: "高驱动高贡献",
        text1: "正激励（精神）",
        text2:  "员工提拔计划"
      },
      ml: {
        key: "ml",
        title: "中驱动低贡献",
        text1: "负激励",
        text2: "业绩改善计划",
        text3: "重点关注"
      },
      mm: {
        key: "mm",
        title: "中驱动中贡献",
        text1: "正激励（物质）",
        text2:  "业绩改善计划"
      },
      mh: {
        key: "mh",
        title: "中驱动高贡献",
        text1: "正激励（物质+精神）",
        text2:  "员工后备计划"
      },
      ll: {
        key: "ll",
        title: "低驱动低贡献",
        text1: "负激励",
        text2:  "员工退出计划"
      },
      lm: {
        key: "lm",
        title: "低驱动中贡献",
        text1: "负激励",
        text2:  "业绩改善计划",
        text3: "重点关注"
      },
      lh: {
        key: "lh",
        title: "低驱动高贡献",
        text1: "正激励（物质）",
        text2:  "业绩改善计划"
      }
    };
    this.nineColor = this.generateColorArray("", this.props.colors);
    this.radius = this.props.circleRadius || 2;
    this.circleColor = this.props.circleColor || "#ffe082";
  }
  generateColorArray(names, colors){
    let defaultName = names || [["hl", "hm", "hh"], ["ml", "mm", "mh"], ["ll", "lm", "lh"]];
    let defaultColor = colors || [["#2196f3", "#1e88e5", "#1565c0"], ["#64b5f6", "#42a5f5", "#1e88e5"], ["#bbdefb", "#64b5f6", "#2196f3"]];
    return defaultName.map((item, index) => {
      return item.map((name, index1) => ({
        name: name,
        color: defaultColor[index][index1] || "#000"
      }));
    });
  }
  clickNineBoxItem(item){
    this.props.clickNineBoxItem(item);
  }
  render(){
    return <div>
              <div className="nine-palace">
                {this.nineColor.map((rowColor, index) => {
                  return <div className="row" style={{height: 90}} key={index}>
                  {rowColor.map((colorItem, colorIndex) => {
                    return <div className="col-lg-4 palace-item" style={{backgroundColor: colorItem.color}} key={colorIndex}>
                            <div className="palace-item-mask" onClick={this.clickNineBoxItem.bind(this, this.intro[colorItem.name])}>
                              {this.props.showMask ? <div className="pamask-wrapper">
                                <p>{this.intro[colorItem.name]["title"]}</p>
                                <p>{this.intro[colorItem.name]["text1"]}</p>
                                <p>{this.intro[colorItem.name]["text2"]}</p>
                                {this.intro[colorItem.name]["text3"] ? <p>{this.intro[colorItem.name]["text3"]}</p> : ""}
                              </div> : ""}
                            </div>
                            <div className="palace-donut-group">
                              <svg>
                                <g>  
                                  {this.props.data[colorItem.name].map((item, index) => 
                                        <circle cx={item.x} cy={item.y} r={this.radius} fill={this.circleColor} key={index}/>
                                      )}
                                </g>
                              </svg>
                            </div>
                          </div>
                    })}
                  </div> 
                  })}
              </div>
        </div>
  }
}
NineBoxChart.propTypes = {
  showMask: PropTypes.bool,
  data: PropTypes.object,
  gridColor: PropTypes.array,
  gridIntro: PropTypes.object,
  circleColor: PropTypes.string,
  circleRadius: PropTypes.number,
  clickNineBoxItem: PropTypes.func
}