// 書き終わり
import { Action } from 'redux';

// これはwebsocketを使っています
export enum WebSocketType {
    OPEN = 'WEBSOCKET:OPEN',
    CLOSE = 'WEBSOCKET:CLOSE',
}

interface IWebSocketOpenAction extends Action {
    type: WebSocketType.OPEN;
}

interface IWebSocketCloseAction extends Action {
    type: WebSocketType.CLOSE;
    payload: { event: CloseEvent };
}

export type WebSocketAction = IWebSocketOpenAction
    | IWebSocketCloseAction;


export interface IWebSocketActionCreator {
    open(): IWebSocketOpenAction;
    close(event: CloseEvent): IWebSocketCloseAction;
}

class WebSocketActionCreator implements IWebSocketActionCreator {
    public open = (): IWebSocketOpenAction => ({ type: WebSocketType.OPEN });

    public close = (event: CloseEvent): IWebSocketCloseAction => ({
        type: WebSocketType.CLOSE,
        payload: { event },
    });
}

export const webSocketActionCreator: IWebSocketActionCreator = new WebSocketActionCreator();
