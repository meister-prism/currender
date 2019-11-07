import { Action } from 'redux';

enum WebsocketType {
    CONNECT = 'WEBSOCKET:CONNECT',
    SEND = 'WEBSOCKET:SEND',
    DISCONNECT = 'WEBSOCKET:DISCONNECT',
}

interface IWebsocketConnectAction extends Action {
    type: WebsocketType.CONNECT;
    payload: {
       url: string;
    };
}
interface IWebsocketSendAction extends Action {
    type: WebsocketType.SEND;
    payload: Object;
}
interface IWebsocketDisconnectAction extends Action {
    type: WebsocketType.DISCONNECT;
}

type WebsocketAction =
    IWebsocketConnectAction
    | IWebsocketSendAction
    | IWebsocketDisconnectAction;

let websocket: WebSocket;
export const middleware = ({ dispatch }: { dispatch: any }) => (next: any) => (action: WebsocketAction) => {
    switch (action.type) {
        case 'WEBSOCKET:CONNECT': {
            // Configure the object
            websocket = new WebSocket(action.payload.url);

            // Attach the callbacks
            websocket.onopen = () => dispatch({ type: 'WEBSOCKET:OPEN' });
            websocket.onclose = (event) => dispatch({ type: 'WEBSOCKET:CLOSE', payload: event });
            websocket.onmessage = (event) => dispatch({ type: 'WEBSOCKET:MESSAGE', payload: event });

            break;
        }
        case 'WEBSOCKET:SEND': {
            websocket.send(JSON.stringify(action.payload));
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
