import { Action } from "redux";

// これはwebsocketを使っています
enum WebsocketType {
    OPEN = 'WEBSOCKET:OPEN',
    CLOSE = 'WEBSOCKET:CLOSE',
    MESSAGE = 'WEBSOCKET:MESSAGE',
}

interface IWebsocketOpenAction extends Action {
    type: WebsocketType.OPEN;
}

interface IWebsocketCloseAction extends Action {
    type: WebsocketType.CLOSE;
    payload: { event: CloseEvent };
}

interface IWebsocketMessageAction extends Action {
    type: WebsocketType.MESSAGE;
    payload: { event: MessageEvent };
}

export type WebsocketAction = IWebsocketOpenAction
    | IWebsocketCloseAction
    | IWebsocketMessageAction;

export interface IWebsocketActionCreator {
    open(): IWebsocketOpenAction;
    close(event: CloseEvent): IWebsocketCloseAction;
    onMessage(event: MessageEvent): IWebsocketMessageAction;
}

class WebsocketActionCreator implements IWebsocketActionCreator {
    public open = (): IWebsocketOpenAction => ({ type: WebsocketType.OPEN });

    public close = (event: CloseEvent): IWebsocketCloseAction => ({
        type: WebsocketType.CLOSE,
        payload: { event },
    });

    public onMessage = (event: MessageEvent): IWebsocketMessageAction => ({
        type: WebsocketType.MESSAGE,
        payload: { event },
    });
}

export const websocketActionCreator: IWebsocketActionCreator = new WebsocketActionCreator();
