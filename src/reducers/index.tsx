import { Reducer, combineReducers } from 'redux';
import { IWebSocketState, WebSocketReducer } from './WebSocketReducer';
import { ICurrentState, CurrentReducer } from './CurrentReducer';
import { ICalendarState, CalendarReducer } from './CalendarReducer';

export interface RootState {
    WebSocketState: IWebSocketState,
    CurrentState: ICurrentState,
    CalendarState: ICalendarState,
}

const reducers: Reducer<RootState> = combineReducers({
    WebSocketState: WebSocketReducer,
    CurrentState: CurrentReducer,
    CalendarState: CalendarReducer,
});

export default reducers;
