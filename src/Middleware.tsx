import { Action, Dispatch } from 'redux';
import moment from 'moment';
import { webSocketActionCreator } from './actions/WebSocketAction';
import { currentActionCreator } from './actions/CurrentAction';
import { IFortune, ITraffic, IWeather } from './reducers/CurrentReducer';

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
            websocket.onmessage = (event) => websocketReceiver(event, dispatch);

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

// WebSocketの受信を振り分ける関数
const websocketReceiver = (event: MessageEvent, dispatch: Dispatch) => {
    const receveData = JSON.parse(event.data);
    const { payload } = receveData;
    console.log(receveData.EventName);
    switch (receveData.EventName) {
        case 'what_is_today': {
            dispatch(currentActionCreator.updateWhatIsToday(payload));
            break;
        }
        case 'fortune': {
            const tmp: Array<IFortune> = payload.fortunesArray.map((value: any) => ({
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
        case 'today_weather': {
            const date = moment(payload.date, 'YYYY-MM-DD');
            const rate: string = payload.chanceOfRains.reduce((prev: string, now: string) => {
                const prev2 = parseInt(prev, 10);
                const now2 = parseInt(now, 10);
                if (Number.isNaN(now2)) {
                    return prev;
                }
                return (prev2 > now2) ? prev : now;
            }, '0%');
            const weather: IWeather = {
                date,
                code: 1000,
                title: payload.title,
                description: payload.description,
                temperature: {
                    max: 1000,
                    min: 1000,
                },
                chanceOfRain: payload.chanceOfRains,
                rainfallProbability: rate,
            };
            dispatch(currentActionCreator.updateWeather(weather));
            break;
        }
        case 'almanac': {
            const { date, ...other } = payload;
            dispatch(currentActionCreator.updateAlmanac(other));
            break;
        }
        default: {
            break;
        }
    }
};
