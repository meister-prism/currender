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

function Day(props: IProps) {
    const { Date, schedules } = props;
    return (
        <DayComponent
            date={Date}
            schedules={schedules}
        />
    );
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CalendarState } = state;
    return {
        Date: '2020-01-01',
        schedules: CalendarState.schedules['2020-01-01'],
    };
};


export default connect(
    mapStateToProps,
)(Day);
