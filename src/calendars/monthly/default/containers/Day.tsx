import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import { Day as DayComponent } from '../components/Day';
import { CalendarEvent, calendarColor } from '../../../../reducers/CalendarReducer';

interface IStateToProps {
    Date: string,
    schedules: Array<CalendarEvent>,
    cColor: Array<calendarColor>,
}

type IProps = IStateToProps;

function Day(props: IProps) {
    const { Date, schedules, cColor } = props;
    const T = schedules.map((S, index) => ({
        ...S,
        index,
    }));
    return (
        <DayComponent
            date={Date}
            schedules={T}
            cColor={cColor}
        />
    );
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CalendarState } = state;
    const cColors = [
        {
            name: 'Taiyo Minagawa',
            color: '#b0dffb',
        },
        {
            name: 'Ryo Tabata',
            color: '#f09300',
        },
    ];
    return {
        Date: '2020-01-01',
        schedules: CalendarState.schedules['2020-01-01'],
        cColor: cColors,
    };
};


export default connect(
    mapStateToProps,
)(Day);
