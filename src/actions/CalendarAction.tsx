import { Action } from 'redux';

export enum CalendarType {
    CREATE_EVENT = 'CREATE',
}

export interface CalendarEvent {
    // shoから送られてくるデータ形式かな
    title: string,
    description: string,
    startSchedule: string,
}

interface ICalendarCreateAction extends Action {
    type: CalendarType.CREATE_EVENT;
    payload: { event: CalendarEvent }
}

export type CalendarAction = ICalendarCreateAction;

interface ICalendarActionCreator {
    create(event: CalendarEvent): ICalendarCreateAction,
}

class CalendarActionCreator implements ICalendarActionCreator {
    public create = (event: CalendarEvent): ICalendarCreateAction => ({
        type: CalendarType.CREATE_EVENT,
        payload: { event },
    });
}

export const calendarActionCreator = new CalendarActionCreator();
