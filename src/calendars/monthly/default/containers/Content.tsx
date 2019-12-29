import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { RootState } from '../../../../reducers';
import { CalendarEvent } from '../../../../reducers/CalendarReducer';
import { Content as ContentComponent } from '../components/Content';

interface calendarTmp {
    [key: string]: Array<CalendarEvent>,
}

interface IStateToProps {
    nowMonth: number,
    nowYear: number,
    Calendar: calendarTmp,
}

/* functions */
/* 多分別ファイルでも使うのでそのうち別ファイルに格納する */
const generateDayList = (now: moment.Moment): Array<string> => {
    // 1日が何曜日か調べて，前月の情報は何日分表示するか決める
    now.date(1);
    // 前月のstring-keyを持つ
    const prevMonthDays = now.days();
    const prevMonth = [...Array(prevMonthDays).keys()].reverse().map((value) => {
        const backIndex = value + 1;
        const tmpMonth = now.clone().subtract(backIndex, 'days');
        return tmpMonth.format('YYYY-MM-DD');
    });
    // console.log(prevMonth);

    // 当月のstring-keyを持つ
    const currentMonthDays = now.clone().add(1, 'months').subtract(1, 'days').date();
    const currentMonth = [...Array(currentMonthDays)].map(() => {
        const rtStr = now.format('YYYY-MM-DD');
        now.add(1, 'days');
        return rtStr;
    });
    // console.log(currentMonth);

    // 来月のstring-keyを持つ
    const nextMonthDays = (7 - now.day()) % 7;
    const nextMonth = [...Array(nextMonthDays)].map(() => {
        const rtStr = now.format('YYYY-MM-DD');
        now.add(1, 'days');
        return rtStr;
    });
    // console.log(nextMonth);

    // string-keyを結合する
    const DayList = [
        ...prevMonth,
        ...currentMonth,
        ...nextMonth,
    ];
    return DayList;
};


class Content extends React.Component<IStateToProps, {}> {
    constructor(props: IStateToProps) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        const { nowMonth } = this.props;
        console.log(`click ${nowMonth}`);
    }

    render() {
        const { nowMonth, nowYear, Calendar } = this.props;
        const strMonth = `0${nowMonth}`.slice(-2);
        const tmpMoment = moment(`${nowYear}-${strMonth}-01`);
        const DayList = generateDayList(tmpMoment);
        const calendarData = DayList.map((value) => {
            const schedules = Calendar[value] === undefined ? Calendar[value] : [];
            return {
                date: value,
                schedules,
            };
        });
        return (
            <ContentComponent calendar={calendarData} />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CalendarState, CurrentState } = state;
    const nowMonth = CurrentState.nowDateTime.month() + 1;
    const nowYear = CurrentState.nowDateTime.year();
    return {
        nowMonth,
        nowYear,
        Calendar: CalendarState.schedules,
    };
};

export default connect(
    mapStateToProps,
)(Content);
