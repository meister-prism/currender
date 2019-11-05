const WS_URL = 'ws://localhost:8000/chat/';
let ws: WebSocket;

export const connectToWebsocket = () => {
    ws = new WebSocket(WS_URL);

    return (dispatch: any) => {
        ws.onmessage = (message) => {
            dispatch({
                type: 'ACTIONS_UPDATE',
                payload: JSON.parse(message.data),
            });
        };
    };
};

export const initWebsocket = () => (dispatch: any) => dispatch(connectToWebsocket());
export const closeWebsocket = () => () => ws.close();
