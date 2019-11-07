import { combineReducers, Reducer } from 'redux';
import { WebSocketReducer, WebSocketState } from './webSocketState';

interface IRootState {
    webSocketState: WebSocketState;
}

const reducers: Reducer<IRootState> = combineReducers({
    webSocketState: WebSocketReducer,
});

export default reducers;
