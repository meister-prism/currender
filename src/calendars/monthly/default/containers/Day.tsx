import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import { Day as DayComponent } from '../components/Day';
import { CalendarEvent } from '../../../../reducers/CalendarReducer';

interface IStateToProps {
    Date: string,
    schedules: Array<CalendarEvent>,
}

type IProps = IStateToProps;

class Title extends React.Component<IProps, {}> {
    render() {
        return (
            <DayComponent
                date={this.props.Date}
                schedules={this.props.schedules}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    return {
        Date: '2019-01-01',
        schedules: [
            {
                title: 'testTitle',
                description: 'by sun-yryr',
                startSchedule: moment('2019-01-01'),
                endSchedule: moment('2019-01-01'),
                calendarName: 'Taiyo Minagawa',
            },
        ],
    };
};


export default connect(
    mapStateToProps,
)(Title);
