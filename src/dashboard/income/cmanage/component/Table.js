import React, {Component} from 'react';

export default class MatrixTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      translateX: 0,
      translateY: 0
    }
    this.mytableRef = "";
    this.setMytableRef = element => {
      this.mytableRef = element;
    };
    this.windowSize = document.body.clientWidth;
    this.paddingWidth = 30 * 2 + this.windowSize * 0.026 * 2;
    this.scrollBar = navigator.userAgent.indexOf("Firefox") > -1 ? 18 : 6;
  }
  componentDidMount(){
    this.scrollListener = this.mytableRef.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount(){
    this.mytableRef.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
      const scrollLeft = e.target.scrollLeft;
      if(scrollLeft!== this.state.translateX){
        window.requestAnimationFrame(() => {
          this.setState({
            translateX: e.target.scrollLeft
          });
        });
      }
      if(scrollTop !== this.state.translateY){
        window.requestAnimationFrame(() => {
          this.setState({
            translateY: scrollTop
          });
        });
      }
  }
  render(){
    let columnWidth = 100;
    if(this.props.data.table[0] && this.props.data.table[0].length > 0){
    const tableWidth = this.windowSize - this.paddingWidth;
    const avgWidth = tableWidth / this.props.data.table[0].length;
    columnWidth =  avgWidth > columnWidth ? Math.round(avgWidth) : columnWidth;
    }
    return <div className="mt-wrapper">
      <div className="mt-header-box"style={{paddingRight: this.scrollBar}}>
        <div className="mt-header-wrapper">
          <table className="mt-top-header" style={{left: -this.state.translateX}}>
            <tbody className="tbl-header" style={{marginRight: this.scrollBar}}>
              {this.props.data.header.map((item, index) => 
                    <tr key={index}style={{top: 61*(index + 2)}}>
                      {item.map((data, index1) =>{
                        if(data.show)
                        return <th
                        width={data.col * columnWidth + "px"}
                        key={index1}
                        rowSpan={data.row} 
                        colSpan={data.col}>{data.name}</th>
                      }
                      )}
                  </tr>
                    )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-left-box" style={{
        width: this.props.data.endCol * columnWidth + 1,
        }}>
        <div className="mt-left-wrapper">
        <table className="mt-left-header" style={{top: -this.state.translateY}}>
              <thead className="tbl-header" style={{marginRight: this.scrollBar}}>
                {this.props.data.header.map((item, index) => 
                    <tr 
                    key={index + "head"} >
                      {item.map((data, index1) =>{
                        if(data.show)
                        return <th
                        width={data.col * columnWidth + "px"}
                        key={index1}
                        rowSpan={data.row} 
                        colSpan={data.col}>{data.name}</th>
                      }
                      )}
                  </tr>  
                )}
              </thead>
            <tbody>
              {
                this.props.data.table.map((item, index) => 
                <tr key={index + "body"}>
                  {item.map((data, index1) => {
                    if(data.show && index1 < this.props.data.endCol)
                    return <td
                    key={index1}
                    rowSpan={data.row} 
                    width={data.col * columnWidth + "px"}
                    colSpan={data.col}>{data.show ? data.name : ""}
                    </td>
                    }
                    )}
                </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="tbl-content" ref={this.setMytableRef}>
        <table>
          <thead className="tbl-header" style={{marginRight: this.scrollBar}}>
              {this.props.data.header.map((item, index) => 
                <tr key={index + "tbheader"}>
                  {item.map((data, index1) =>{
                    if(data.show)
                    return <th
                    width={data.col * columnWidth + "px"}
                    key={index1}
                    rowSpan={data.row} 
                    colSpan={data.col}>{data.name}</th>
                  }
                  )}
              </tr>
                )}
          </thead>
          <tbody>
            {
              this.props.data.table.map((item, index) => 
              <tr key={index + "tbtable"}>
                {item.map((data, index1) => {
                  if(data.show)
                  return <td
                  key={index1}
                  rowSpan={data.row} 
                  colSpan={data.col}>{typeof data.name === "number" ? (data.name).toFixed(2) : data.name}
                  </td>
                  }
                  )}
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  }
}