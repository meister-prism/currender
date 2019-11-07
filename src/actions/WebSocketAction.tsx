import { Action } from 'redux';
import { WebSocketType, IWebSocketConnectAction, IWebSocketSendAction } from '../Middleware';

interface IWebSocketOpenAction extends Action {
    type: WebSocketType.OPEN;
}
interface IWebSocketCloseAction extends Action {
    type: WebSocketType.CLOSE;
    payload: { event: CloseEvent };
}

export type WebSocketAction =
    IWebSocketOpenAction | IWebSocketCloseAction
    | IWebSocketConnectAction | IWebSocketSendAction;

interface IWebSocketActionCreator {
    open(): IWebSocketOpenAction,
    close(event: CloseEvent): IWebSocketCloseAction,
    connect(url: string): IWebSocketConnectAction,
    send(message: string): IWebSocketSendAction,
}

class WebSocketActionCreator implements IWebSocketActionCreator {
    public open = (): IWebSocketOpenAction => ({
        type: WebSocketType.OPEN,
    });

    public close = (event: CloseEvent): IWebSocketCloseAction => ({
        type: WebSocketType.CLOSE,
        payload: { event },
    });

    public connect = (url: string): IWebSocketConnectAction => ({
        type: WebSocketType.CONNECT,
        payload: { url },
    });

    public send = (message: string): IWebSocketSendAction => ({
        type: WebSocketType.SEND,
        payload: { message },
    });
}

export const webSocketActionCreator: IWebSocketActionCreator = new WebSocketActionCreator();
