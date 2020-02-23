import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { RootState } from '../../../../reducers';
import { CalendarEvent, calendarColor } from '../../../../reducers/CalendarReducer';
import { Content as ContentComponent } from '../components/Content';

interface calendarTmp {
    [key: string]: Array<CalendarEvent>,
}

interface IStateToProps {
    nowMonth: number,
    nowYear: number,
    Calendar: calendarTmp,
    cColor: Array<calendarColor>,
}

interface IState {
    isModalOpen: boolean,
    currentModal: number,
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

class Content extends React.Component<IStateToProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isModalOpen: false,
            currentModal: 0,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(index: number) {
        const { isModalOpen, ...other } = this.state;
        if (isModalOpen) {
            this.setState({
                isModalOpen: !isModalOpen,
                ...other,
            });
        } else {
            this.setState({
                isModalOpen: !isModalOpen,
                currentModal: index,
            });
        }
    }

    render() {
        const {
            nowMonth, nowYear, Calendar, cColor,
        } = this.props;
        const { isModalOpen, currentModal } = this.state;
        const strMonth = `0${nowMonth}`.slice(-2);
        const tmpMoment = moment(`${nowYear}-${strMonth}-01`);
        const DayList = generateDayList(tmpMoment);
        const calendarData = DayList.map((value) => {
            const schedules = Calendar[value] !== undefined ? Calendar[value] : [];
            schedules.sort((a, b) => (a.startSchedule >= b.startSchedule ? 1 : -1));
            const T = schedules.map((S, index) => ({
                ...S,
                index,
            }));
            return {
                date: value,
                schedules: T,
            };
        });
        let id = 0;
        for (let i = 1; i < calendarData.length; i += 1) {
            if (calendarData[i].schedules !== []) {
                const len = calendarData[i].schedules.length;
                for (let j = 0; j < len; j += 1) {
                    id = calendarData[i].schedules[j].index;
                    for (let p = 0; p < calendarData[i - 1].schedules.length; p += 1) {
                        if (calendarData[i].schedules[j].title === calendarData[i - 1].schedules[p].title) {
                            calendarData[i].schedules[j].index = calendarData[i - 1].schedules[p].index;
                        }
                    }
                    if (calendarData[i].schedules[j].index === id) {
                        calendarData[i].schedules[j].index = calendarData[i].schedules[j - 1].index;
                    }
                }
            }
        }
        return (
            <ContentComponent
                calendar={calendarData}
                isOpen={isModalOpen}
                toggleModal={this.toggleModal}
                modalIndex={currentModal}
                cColor={cColor}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CalendarState, CurrentState } = state;
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
    const nowMonth = CurrentState.nowDateTime.month() + 1;
    const nowYear = CurrentState.nowDateTime.year();
    return {
        nowMonth,
        nowYear,
        Calendar: CalendarState.schedules,
        cColor,
    };
};

export default connect(
    mapStateToProps,
)(Content);
