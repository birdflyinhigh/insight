import React from 'react';
import {ArcherContainer, ArcherElement} from 'react-archer';
import {Tooltip} from 'antd';
import './FlowDiagram.css'


const topStyle = {display: 'flex', justifyContent: 'space-between', marginTop: "10px"};
const rowStyle = {margin: '5px 0', display: 'flex', justifyContent: 'space-between',};
const boxStyle = {
    padding: '10px',
    border: '1px solid #5A7DF1',
    width: 90,
    height: 40,
    borderRadius: 6,
    textAlign: 'center'
};

const labelStyle = {marginTop: '-20px', color: '#999999', fontWeight: 400, fontSize: 12};

const RowDiv = ({item, index})=>(
    <div style={rowStyle}>

        <ArcherElement
            id={'row'+index+'1'}
            relations={[{
                targetId: 'row'+index+'2',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: {strokeColor: '#5A7DF1', strokeWidth: 1},
                label: <div style={labelStyle}>{item.key2}%</div>,
            }]}
        >
            <div style={boxStyle}>{item.key1}</div>
        </ArcherElement>
        <ArcherElement
            id={'row'+index+'2'}
            relations={[{
                targetId: 'row'+index+'3',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: {strokeColor: '#5A7DF1', strokeWidth: 1,strokeDasharray: 2},
                label: <div style={labelStyle}>{item.key4}%</div>,
                className: 'arrow'
            }]}
        >
            <div style={boxStyle}>{item.key3}</div>
        </ArcherElement>

        <ArcherElement
            id={'row'+index+'3'}
            relations={[{
                targetId: 'row'+index+'4',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: {strokeColor: '#5A7DF1', strokeWidth: 1},
                label: <div style={labelStyle}>{item.key6}%</div>,
            }]}
        >
            <div style={boxStyle}>{item.key5}</div>
        </ArcherElement>


        <ArcherElement
            id={'row'+index+'4'}
        >
            <div style={boxStyle}>{item.key7}</div>
        </ArcherElement>
    </div>
);


class App extends React.Component{

    props;



    render() {



    const topItems = this.props.data.topItems;
    const infos = this.props.data.infos;
    const data = this.props.source;


    return (
        <div className="convert-flow-container" style={{marginTop: 0}}>
            <div style={{width: '8%', float: 'left', marginLeft: '1.5%', marginTop: -10}}>
                <ArcherContainer strokeColor='red'>

                    <div style={topStyle}>
                        <ArcherElement
                            id='123'>
                            <div className="box-title"></div>
                        </ArcherElement>
                    </div>
                    {data.map((item) => {
                        return (
                        <div style={rowStyle}>

                            <ArcherElement
                                id="123123"
                            >
                                <div className="box-title" style={{width: 125}}>{item.name}
                                    <Tooltip title={infos[item.name]} placement="right">
                                        <div className='help'></div>
                                    </Tooltip>
                                </div>
                            </ArcherElement>
                        </div>
                    )})}


                </ArcherContainer>
            </div>
            <div style={{width: '87.5%', float: 'right'}}>
                <ArcherContainer strokeColor='red'>

                    <div style={topStyle}>

                        {topItems.map((item) => (
                            <ArcherElement
                            >
                                <div className="box-title">{item}</div>
                            </ArcherElement>
                        ))}
                    </div>
                    {data.map((item, index)=>{
                        return(
                            (
                                <RowDiv item={item} index={index}/>
                            )
                        )
                    })}


                </ArcherContainer>
            </div>


        </div>
    );
    }
}



export default App;