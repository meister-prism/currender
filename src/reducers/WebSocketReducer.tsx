import { Reducer } from 'redux';
import { WebSocketAction } from '../actions/WebSocketAction';
import { WebSocketType } from '../Middleware';

export interface IWebSocketState {
    connected: boolean,
}

export const WebSocketReducer: Reducer<IWebSocketState, WebSocketAction> = (
    state: IWebSocketState = { connected: false },
    action: WebSocketAction,
): IWebSocketState => {
    switch (action.type) {
        case WebSocketType.OPEN: {
            console.log('WebSocket Open');
            return { connected: true };
        }
        case WebSocketType.CLOSE: {
            console.log('WebSocket Close');
            return { connected: false };
        }
        // あとで消す
        case WebSocketType.CONNECT: {
            console.log('WebSocket connected');
            return state;
        }
        // 残り2つのActionはMiddleware側で拾っているのでこっちで何かすることはない。
        // 接続後・送信後それぞれ何か実装したい場合に記述する。
        default:
            return state;
    }
};
