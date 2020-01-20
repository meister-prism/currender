import { Reducer, combineReducers } from 'redux';
import { IWebSocketState, WebSocketReducer } from './WebSocketReducer';
import { ICurrentState, CurrentReducer } from './CurrentReducer';

export interface RootState {
    WebSocketState: IWebSocketState,
    CurrentState: ICurrentState,
}

const reducers: Reducer<RootState> = combineReducers({
    WebSocketState: WebSocketReducer,
    CurrentState: CurrentReducer,
});

export default reducers;
