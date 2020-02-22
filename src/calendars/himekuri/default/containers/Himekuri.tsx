import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import {
    IWeather, ITraffic, IFortune, IWIT,
} from '../../../../reducers/CurrentReducer';
import { CalendarEvent, calendarColor } from '../../../../reducers/CalendarReducer';
import { Himekuri as HimekuriComponent } from '../components/Himekuri';

interface calendarTmp {
    [key: string]: Array<CalendarEvent>,
}

interface IStateToProps {
    date: string,
    Weather: IWeather,
    Traffic: Array<ITraffic>,
    Fortunes: Array<IFortune>,
    WhatIsToday: IWIT,
    Calendar: calendarTmp,
    cColor: Array<calendarColor>,
}

type IProps = IStateToProps;

class Himekuri extends React.Component<IProps, {}> {
    componentDidMount() {
        const a = 1;
    }

    render() {
        const {
            date,
            Weather,
            Traffic,
            Fortunes,
            cColor,
            Calendar,
            WhatIsToday,
        } = this.props;
        const Moment: moment.Moment = moment(date);
        const schedules = Calendar[date] !== undefined ? Calendar[date] : [];
        schedules.sort((a, b) => (a.startSchedule >= b.startSchedule ? 1 : -1));
        return (
            <HimekuriComponent
                Date={date}
                Weather={Weather}
                Traffic={Traffic[0]}
                Fortune={Fortunes[0]}
                WhatIsToday={WhatIsToday}
                cColor={cColor}
                schedules={schedules}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const {
        CurrentState:
        {
            nowDateTime,
            weather,
            traffic,
            fortune,
            whatIsToday,
        },
        CalendarState,
    } = state;
    const cColor = [
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
        date: nowDateTime.format('YYYY-MM-DD'),
        Weather: weather,
        Traffic: traffic,
        Fortunes: fortune,
        WhatIsToday: whatIsToday,
        Calendar: CalendarState.schedules,
        cColor,
    };
};


export default connect(
    mapStateToProps,
)(Himekuri);
