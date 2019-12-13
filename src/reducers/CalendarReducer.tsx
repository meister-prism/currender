import { Reducer } from 'redux';
import moment from 'moment';
import { CalendarAction, CalendarType } from '../actions/CalendarAction';

export interface CalendarEvent {
    title: string,
    description: string,
    startSchedule: moment.Moment, // momentが欲しい
    endSchedule: moment.Moment,
    calendarName: string,
}

export interface ICalendarState {
    [key: string]: Array<CalendarEvent>,
}

const initState: ICalendarState = {
    '2019-12-12': [{
        title: 'testTitle',
        description: 'by sun-yryr',
        startSchedule: moment('2019-12-12'),
        endSchedule: moment('2019-12-12'),
        calendarName: 'Taiyo Minagawa',
    }],
    '2019-12-14': [{
        title: 'testTitle2',
        description: 'by sun-yryr',
        startSchedule: moment('2019-12-14'),
        endSchedule: moment('2019-12-14'),
        calendarName: 'Taiyo Minagawa',
    }, {
        title: 'testTitle3',
        description: 'by sun-yryr',
        startSchedule: moment('2019-12-14'),
        endSchedule: moment('2019-12-14'),
        calendarName: 'Taiyo Minagawa',
    }],
};

export const CalendarReducer: Reducer<ICalendarState, CalendarAction> = (
    state: ICalendarState = initState,
    action: CalendarAction,
): ICalendarState => {
    switch (action.type) {
        case CalendarType.CREATE_EVENT: {
            // イベントを追加する
            return { ...state };
        }
        default: {
            return state;
        }
    }
};
