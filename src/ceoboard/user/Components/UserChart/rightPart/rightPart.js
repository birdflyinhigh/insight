import React from 'react';
import './rightPart.css';
import SelectBox from "./SelectBox";
import Popout from "./Popout";
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

class RightPart extends React.Component{
    props;

    state ={
        onControl: false
    };

    switchControl =()=>{
        this.setState({
            onControl: false
        })
    };



    render() {
        const items = [
            {title: '开店'},
            {title: '近三月登录&入驻类目'},
            {title: '近三月登录&开店成功'},
            {title: '近三月有收入'},
        ];
        const items2 = [
            {title: '有收入(GMV>=1)'},
            {title: '新手(1<GMV<5000)'},
            {title: '黑马(5000=<GMV<1w)'},
            {title: 'KA(1w =<GMV<8w)'},
            {title: 'TOP(GMV>=8w)'},
        ];

        const data1 = this.props.data.serviceLayer;
        const data2 = this.props.data.serviceIncomeLayer;
        const overlayStyle = {
            display: 'none'
        };
        return (
            <div className='chart-right-part'>
                <div className="item-header" >
                    <p>
                        服务商分层

                            <Tooltip
                                placement="right"
                                overlay={<p style={{fontSize: 14}}>
                                    服务商收入分层中的收入（GMV），指服务商在最近三个月的月均GMV（收入）；<br/>
                                    各层级中服务商漫游会员服务商包含之前的漫游会员服务商数据，服务商工场会员服务商 <br/>
                                    包含之前的商家版工场会员服务商，工场会员包含之前的标准版工场会员；</p>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                            <div className='help'></div>
                        </Tooltip>
                    </p>
                    <div                         className="right-select">
                        <SelectBox
                            data={this.props.data}
                        />
                    </div>
                </div>
                <div className='vertical-line1'></div>



                <div className='first-part'>
                    <div className='header1'>
                        <p>属性分层</p>
                    </div>
                    {items.map((item, index)=>{
                        const popData = {
                            title: item.title,
                            key1: data1['key'+(index*5+1)],
                            key2: data1['key'+(index*5+3)],
                            key3: data1['key'+(index*5+5)],
                            key4: data1['key2'+(index*2+1)],
                            key5: data1['key2'+(index*2+2)],
                            key6: data1['key'+(index*5+2)],
                            name: data1.name,
                            index: index+1,
                            message: this.props.data.message,
                            switchControl: this.switchControl
                        };
                        return(
                            <div>
                                <div className="chart-data-grid" style={{top: 100*index}}>
                                    <p>{item.title}</p>
                                    <p>{data1['key'+(index*5+1)]}</p>
                                </div>

                                <Tooltip
                                    placement="right"
                                    overlay={<Popout
                                        data={popData}
                                        clicked={(value, limit)=>{
                                        this.props.data.submit(value, limit);
                                        this.setState({
                                            onControl: true
                                        });
                                    }}/>}
                                    overlayStyle={this.state.onControl?overlayStyle:{}}
                                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}

                                >
                                    <div
                                        className="chart-data-grid1"
                                        style={{top: 100*index}}
                                    >
                                        <div className='data-bar' style={{width: data1['key'+(index*5+5)] +'%'}}>
                                        </div>
                                        <div className='content1'>
                                            <p>非{data1.name}：{data1['key'+(index*5+2)]}({data1['key'+(index*5+4)]}%)</p>
                                            <p>{data1.name}：{data1['key'+(index*5+3)]}({data1['key'+(index*5+5)]}%)</p>

                                        </div>
                                    </div>
                                </Tooltip>









                            </div>
                        )
                    })}</div>
                <div className='second-part'>
                    <div className='header1'>
                        <p>收入分层</p>
                    </div>
                    {items2.map((item, index)=>{
                        const popData = {
                            title: item.title,
                            key1: data2['key'+(index*5+1)],
                            key2: data2['key'+(index*5+3)],
                            key3: data2['key'+(index*5+5)],
                            key4: data2['key'+(index*2+26)],
                            key5: data2['key'+(index*2+27)],
                            key6: data2['key'+(index*5+2)],
                            name: data2.name,
                            params:this.props.data.params,
                            index: index+5,
                            message: this.props.data.message,
                            switchControl: this.switchControl
                        };
                        return(
                            <div>
                                <div className="chart-data-grid" style={{top: 100*index}}>
                                    <p>{item.title}</p>
                                    <p>{data2['key'+(index*5+1)]}</p>
                                </div>
                                <Tooltip
                                    placement="left"
                                    overlay={<Popout
                                        data={popData}
                                        clicked={(value, limit)=>{
                                            this.props.data.submit(value, limit);
                                            this.setState({
                                                onControl: true
                                            });
                                        }}/>}
                                    overlayStyle={this.state.onControl?overlayStyle:{}}
                                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                >
                                <div className="chart-data-grid1" style={{top: 100*index}}>
                                    <div className='data-bar' style={{width: data2['key'+(index*5+5)] +'%'}}>
                                    </div>
                                    <div className='content1'>
                                        <p>非{data2.name}：{data2['key'+(index*5+2)]}({data2['key'+(index*5+4)]}%)</p>
                                        <p>{data2.name}：{data2['key'+(index*5+3)]}({data2['key'+(index*5+5)]}%)</p>

                                    </div>
                                </div>
                                </Tooltip>



                            </div>
                        )
                    })}</div>






            </div>
        );
    }
}
export default RightPart;