import React from 'react';
import { Modal, Button } from 'antd';
import './Popout.css';




class Popout extends React.Component{
    
    
    
    props;
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
        this.props.data.switchControl();
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
        this.props.data.switchControl();
    };


    render() {
        return (
            <div className='user-tool-tip'   >

                <div>
                    <p>{this.props.data.title}：{this.props.data.key1}</p>
                    <div className='mid-content'>
                        <p>{this.props.data.name}：{this.props.data.key2}（{this.props.data.key3}%）, 其中：</p>
                        <p>店铺评分小于60分：{this.props.data.key4} 家 </p>
                        <p>流量权益因子恶化：{this.props.data.key5} 家</p>
                    </div>
                    <a href="http://boss.zbj.com/fe/dist/#/bossold/https%3A%2F%2Fbench.zbj.com%2Fdist%2Findex.html%3Fpage%3DGACBOJ%23%2Fboard"
                       target='_blank'
                       className='link1'

                    >
                        查看运营详情
                    </a>
                    <div href="http://boss.zbj.com/fe/dist/#/bossold/https%3A%2F%2Fbench.zbj.com%2Fdist%2Findex.html%3Fpage%3DGACBOJ%23%2Fboard"
                       target='_blank'
                       className='link2'
                       onClick={()=>{

                           this.props.clicked(this.props.data.index, this.props.data.key6);
                           this.showModal();
                       }}
                    >
                        一键生成商机
                    </div>
                    <br/>
                    <p>非{this.props.data.name}：{this.props.data.key6} </p>






                </div>
                <Modal
                    title={<h3>温馨提示</h3>}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    style={{zIndex: 10000}}
                    footer={[
                        <Button key="submit" type="primary"  onClick={this.handleOk}>
                            确认
                        </Button>,]}
                >
                    <p>{this.props.data.message}</p>
                </Modal>
            </div>
        )
    }
}


export default Popout;