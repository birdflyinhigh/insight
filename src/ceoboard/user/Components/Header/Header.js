import React from 'react';
import './Header.css';
import DatePicker from './DatePicker/DatePicker';
import AreaPicker from './AreaPicker/AreaPicker';
import Submit from './SubmitBtn/SubmitBtn';
import moment from 'moment';


class Header extends React.PureComponent {


    props;
    render() {
        const disabledEndTime = moment().subtract(1, 'days');
        const disabledStartTime = moment('2019-06-26 00:00:00');
        return (
            <div className='dash-header'>
                    <AreaPicker
                        data={this.props.data}
                        fns={this.props.fns}
                    />

                <Submit
                    clicked={this.props.submit}
                />
            </div>
        )
    }
}


export default Header;