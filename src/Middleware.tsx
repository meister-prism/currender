import { Action } from 'redux';
import { webSocketActionCreator } from './actions/WebSocketAction';

export enum WebSocketType {
    CONNECT = 'WEBSOCKET:CONNECT',
    SEND = 'WEBSOCKET:SEND',
    DISCONNECT = 'WEBSOCKET:DISCONNECT',
    OPEN = 'WEBSOCKET:OPEN',
    CLOSE = 'WEBSOCKET:CLOSE',
    MESSAGE = 'WEBSOCKET:MESSAGE',
}

export interface IWebSocketConnectAction extends Action {
    type: WebSocketType.CONNECT;
    payload: {
       url: string;
    };
}
export interface IWebSocketSendAction extends Action {
    type: WebSocketType.SEND;
    payload: { message: string };
}
interface IWebSocketDisconnectAction extends Action {
    type: WebSocketType.DISCONNECT;
}

type WebSocketAction =
    IWebSocketConnectAction
    | IWebSocketSendAction
    | IWebSocketDisconnectAction;

let websocket: WebSocket;
export const Middleware = ({ dispatch }: { dispatch: any }) => (next: any) => (action: WebSocketAction) => {
    switch (action.type) {
        case 'WEBSOCKET:CONNECT': {
            websocket = new WebSocket(action.payload.url);

            // debug message
            console.log('websocket create');

            websocket.onopen = () => dispatch(webSocketActionCreator.open());
            websocket.onclose = (event) => dispatch(webSocketActionCreator.close(event));
            // onMessageは各reducerを呼ぶ必要があるので，actionCreatorをdispatchしない
            websocket.onmessage = (event) => dispatch({ type: 'WEBSOCKET:MESSAGE', payload: event });

            break;
        }
        case 'WEBSOCKET:SEND': {
            websocket.send(action.payload.message);
            break;
        }
        case 'WEBSOCKET:DISCONNECT': {
            websocket.close();
            break;
        }
        default: // We don't really need the default but ...
            break;
    }
    return next(action);
};
