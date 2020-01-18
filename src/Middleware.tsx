import { Action, Dispatch } from 'redux';
import { webSocketActionCreator } from './actions/WebSocketAction';
import { currentActionCreator } from './actions/CurrentAction';
import { IAstrology, ITraffic } from './reducers/CurrentReducer';

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
export const Middleware = ({ dispatch }: { dispatch: Dispatch }) => (next: any) => (action: WebSocketAction) => {
    switch (action.type) {
        case 'WEBSOCKET:CONNECT': {
            websocket = new WebSocket(action.payload.url);

            // debug message
            console.log('websocket create');

            websocket.onopen = () => dispatch(webSocketActionCreator.open());
            websocket.onclose = (event) => dispatch(webSocketActionCreator.close(event));
            // onMessageは各reducerを呼ぶ必要があるので，actionCreatorをdispatchしない
            // eslint-disable-next-line no-use-before-define
            websocket.onmessage = (event) => websocketRecever(event, dispatch);

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


const websocketRecever = (event: MessageEvent, dispatch: Dispatch) => {
    const receveData = JSON.parse(event.data);
    const { payload } = receveData;
    console.log(receveData.EventName);
    switch (receveData.EventName) {
        case 'what_is_today': {
            dispatch(currentActionCreator.updateWhatIsToday(payload));
            break;
        }
        case 'fortune': {
            const tmp: Array<IAstrology> = payload.fortunesArray.map((value: any) => ({
                constellation: value.sign,
                message: value.content,
            }));
            dispatch(currentActionCreator.updateAstrology(tmp));
            break;
        }
        case 'traffic': {
            const tmp: Array<ITraffic> = payload.train.map((value: any) => ({
                ...value,
            }));
            dispatch(currentActionCreator.updateTraffic(tmp));
            break;
        }
        default: {
            break;
        }
    }
};
