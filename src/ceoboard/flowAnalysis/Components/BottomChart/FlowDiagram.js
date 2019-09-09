import React from 'react';
import {ArcherContainer, ArcherElement} from 'react-archer';
import {Tooltip} from 'antd';
import './FlowDiagram.css'


const topStyle = {display: 'flex', justifyContent: 'space-between', marginTop: "10px", marginBottom: '20px'};
const rowStyle = {margin: '5px 0', display: 'flex', justifyContent: 'space-between',}
const boxStyle = {
    padding: '10px',
    border: '1px solid #5A7DF1',
    width: 90,
    height: 40,
    borderRadius: 6,
    textAlign: 'center',
    background: 'white',
    opacity: 1
};


const App = (props) => {

    const topItems = props.data.topItems;
    const infos = props.data.infos;
    const data = props.source;
    const labelStyle = {marginTop: '-20px', color: '#999999', fontWeight: 400, fontSize: 12};
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


                    {data.map((item) => (
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
                    ))}


                </ArcherContainer>
            </div>
            <div style={{width: '87.5%', float: 'right'}}>
                <ArcherContainer strokeColor='red'>

                    <div style={topStyle}>

                        {data.length!==0?topItems.map((item) => (
                            <ArcherElement
                            >
                                <div className="box-title">{item}</div>
                            </ArcherElement>
                        )):''}
                    </div>
                    {data.map((item, index)=>(
                        <div style={rowStyle}>


                            <ArcherElement
                                id={item.name + index}
                                relations={[{
                                    targetId: item.name + (index+1),
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
                                    style: {strokeColor: '#5A7DF1', strokeWidth: 1},
                                    label: <div style={labelStyle}>{item.key2}%</div>,
                                }]}
                            >
                                <div style={boxStyle}>{item.key1}</div>
                            </ArcherElement>
                            <ArcherElement
                                id={item.name+(index+1)}
                                relations={[{
                                    targetId: item.name+(index+2),
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
                                    style: {strokeColor: '#5A7DF1', strokeWidth: 1},
                                    // label: <div style={labelStyle}>{item.key4}%</div>,
                                    className: 'arrow1'
                                }]}
                            >
                                <div style={boxStyle}>{item.key3}</div>
                            </ArcherElement>

                            <ArcherElement
                                id={item.name+(index+2)}
                                relations={[{
                                    targetId: item.name+(index+3),
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
                                    style: {strokeColor: '#5A7DF1', strokeWidth: 1},
                                    label: <div style={labelStyle}>{item.key6}%</div>,
                                }]}
                            >
                                <div style={{...boxStyle, padding: 0}}>
                                  {item.key4}<br/>
                                  <span style={labelStyle}>均值: {item.key5}</span>
                                </div>
                            </ArcherElement>
                            <ArcherElement
                                id={item.name+(index+3)}
                                relations={[{
                                    targetId: item.name+(index+4),
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
                                    style: {strokeColor: '#5A7DF1', strokeWidth: 1},
                                    label: <div style={labelStyle}>{item.key9}%</div>,
                                }]}
                            >
                                <div style={{...boxStyle, padding: 0}}>
                                    {item.key7}<br/>
                                    <span style={labelStyle}>均值: {item.key8}</span>
                                </div>
                            </ArcherElement>

                            <ArcherElement
                                id={item.name+(index+4)}
                                relations={[{
                                    targetId: item.name+(index+5),
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
                                    style: {strokeColor: '#5A7DF1', strokeWidth: 1},
                                    label: <div style={labelStyle}>{item.key12}%</div>,
                                }]}
                            >
                                <div style={{...boxStyle, padding: 0}}>
                                    {item.key10}<br/>
                                    <span style={labelStyle}>均值: {item.key11}</span>
                                </div>
                            </ArcherElement>


                            <ArcherElement
                                id={item.name+(index+5)}
                            >
                                <div style={{...boxStyle, padding: 0}}>
                                    {item.key13}<br/>
                                    <span style={labelStyle}>均值: {item.key14}</span>
                                </div>
                            </ArcherElement>
                        </div>
                    ))}

                </ArcherContainer>
            </div>


        </div>
    );
}

export default App;