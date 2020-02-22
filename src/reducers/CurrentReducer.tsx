import { Reducer } from 'redux';
import moment from 'moment';
import { CurrentAction, CurrentType } from '../actions/CurrentAction';

export interface ICurrentState {
    nowDateTime: moment.Moment,
    whatIsToday: IWIT,
    weather: IWeather,
    traffic: Array<ITraffic>,
    fortune: Array<IFortune>,
    almanac: IAlmanac,
}

export interface IWIT {
    title: string,
    description: string,
}

export interface IWeather {
    date: moment.Moment, // いるか？
    code: number,
    title: string,
    description: string,
    temperature: {
        max: number,
        min: number,
    },
    chanceOfRain: Array<string>,
    rainfallProbability: string,
}

export interface ITraffic {
    line: string,
    serviceStatus: string,
    description: string,
}

export interface IFortune {
    constellation: string,
    message: string,
}

export interface IAlmanac {
    moonAge: number,
    riseSet: {
        sunriseTime?: moment.Moment,
        sunsetTime?: moment.Moment,
        moonriseTime?: moment.Moment,
        moonsetTime?: moment.Moment,
    }
}

const initState: ICurrentState = {
    nowDateTime: moment('2019-05-10T12:00:00'),
    whatIsToday: {
        title: 'test',
        description: 'test',
    },
    weather: {
        date: moment('2019-05-01T12:00:00'),
        code: 1,
        title: '多分晴れだと思う',
        description: 'なんか細かいやつ',
        temperature: {
            max: 20,
            min: -1,
        },
        chanceOfRain: ['0%, 10%, 0%, 50%'],
        rainfallProbability: '20%',
    },
    traffic: [{
        line: '中央線',
        serviceStatus: '常に遅延',
        description: '学校行く時いつも遅れてませんか？',
    }],
    fortune: [{
        constellation: '座',
        message: 'hogehoge',
    }],
    almanac: {
        moonAge: 0,
        riseSet: {},
    },
};

export const CurrentReducer: Reducer<ICurrentState, CurrentAction> = (
    state: ICurrentState = initState,
    action: CurrentAction,
): ICurrentState => {
    switch (action.type) {
        case CurrentType.UPDATE_DATETIME: {
            const nowMoment: moment.Moment = moment();
            return {
                ...state,
                nowDateTime: nowMoment,
            };
        }
        case CurrentType.UPDATE_WHATISTODAY: {
            return {
                ...state,
                whatIsToday: action.payload,
            };
        }
        /* ここから下未実装 */
        case CurrentType.UPDATE_WEATHER: {
            const payload = action.payload as IWeather;
            return {
                ...state,
                weather: payload,
            };
        }
        case CurrentType.UPDATE_TRAFFIC: {
            const payload = action.payload as Array<ITraffic>;
            return {
                ...state,
                traffic: payload,
            };
        }
        case CurrentType.UPDATE_ASTROLOGY: {
            const payload = action.payload as Array<IFortune>;
            return {
                ...state,
                fortune: payload,
            };
        }
        case CurrentType.UPDATE_ALMANAC: {
            const payload = action.payload as IAlmanac;
            return {
                ...state,
                almanac: payload,
            };
        }
        default: {
            return state;
        }
    }
};
