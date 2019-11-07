import { Reducer, combineReducers } from 'redux';
import { IWebSocketState, WebSocketReducer } from './WebSocketReducer';

export interface RootState {
    WebSocketState: IWebSocketState,
}

const reducers: Reducer<RootState> = combineReducers({
    WebSocketState: WebSocketReducer,
});

export default reducers;
