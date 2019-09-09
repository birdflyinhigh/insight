import React from 'react';
import {Select} from 'antd';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../../../../common/common";


const {Option} = Select;


const SelectOption = (props) => {


    return (
        <Select
            style={{width: 125, marginRight: 12}}
            value={props.value}
            onChange={props.changed}
        >
            {<Option value={-1}>{props.title}</Option>}
            {props.options.map((item, index) =>
                <Option key={index} value={item.id}>{item.name}</Option>)}
        </Select>
    )

};


class AreaPicker extends React.PureComponent {


    props;

    state = {
        area: [],
        province: [],
        city: []
    };

    getArea = () => {
        axios.get(SERVER_ADDRESS + '/manager/convert/region', {
            withCredentials: true,
            params: {}
        }).then((response) => {
            this.setState({
                area: response.data
            })
        }).catch((error) => {
            console.log('something went wrong', error);
        })
    };

    getProvince = (value) => {
        axios.get(SERVER_ADDRESS + '/manager/convert/province', {
            withCredentials: true,
            params: {area: value}
        }).then((response) => {
            this.setState({
                province: response.data
            })
        }).catch((error) => {
            console.log('something went wrong', error);
        })
    };

    getCity = (value) => {
        axios.get(SERVER_ADDRESS + '/manager/convert/city', {
            withCredentials: true,
            params: {
                province: value,
                area: this.props.data.areaId
            }
        }).then((response) => {
            this.setState({
                city: response.data,
            })
        }).catch((error) => {
            console.log('something went wrong', error);
        })
    };


    componentDidMount = () => {
        this.getArea()
    };

    selectArea = (value) => {
        this.props.fns.updateArea(value);
        this.getProvince(value);
    };

    selectProvince = (value) => {
        this.props.fns.updateProvince(value);
        this.getCity(value);
    };


    render() {
        return (<div className="dashh-item">
            <b className="dashh-title">地域:</b>

            <SelectOption
                title="全部大区"
                options={this.state.area}
                value={this.props.data.areaId}
                changed={this.selectArea}
            />
            <SelectOption
                title="全部省份"
                options={this.state.province}
                value={this.props.data.provinceId}
                changed={this.selectProvince}
            />
            <SelectOption
                title="全部城市"
                options={this.state.city}
                value={this.props.data.cityId}
                changed={this.props.fns.updateCity}
            />
        </div>)
    }

}

export default AreaPicker;