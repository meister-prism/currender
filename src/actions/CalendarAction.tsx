import { Action } from 'redux';
import { CalendarEvent } from '../reducers/CalendarReducer';

export enum CalendarType {
    CREATE_EVENT = 'CREATE',
}

// これshoから受け取る方だからArray<CalendarEvent> の方が良さそうだな
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
