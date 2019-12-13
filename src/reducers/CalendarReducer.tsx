import { Reducer } from 'redux';
import { CalendarAction, CalendarType } from '../actions/CalendarAction';

export interface ICalendarState {
    [key: string]: [{
        title: string,
        description: string,
        startSchedule: string, // momentが欲しい
        endSchedule: string,
        calendarName: string,
    }],
}

const initState: ICalendarState = {
    '2019-12-12': [{
        title: 'testTitle',
        description: 'by sun-yryr',
        startSchedule: '2019-12-12',
        endSchedule: '2019-12-12',
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
