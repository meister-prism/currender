import { Reducer } from 'react';
import { WebSocketAction, WebSocketType } from '../actions/websocketAction';

export interface WebSocketState {
    connection: boolean,
}

const initState: WebSocketState = {
    connection: false,
};

export const WebSocketReducer: Reducer<WebSocketState, WebSocketAction> = (
    state: WebSocketState = initState,
    action: WebSocketAction,
): WebSocketState => {
    switch (action.type) {
        case WebSocketType.OPEN: {
            console.log('Connected');
            return { ...state, connection: true };
        }
        case WebSocketType.CLOSE: {
            console.log('Disconnected');
            return { ...state, connection: false };
        }
        default:
            return state;
    }
};
