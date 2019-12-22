import { Reducer } from 'redux';
import moment from 'moment';
import { CurrentAction, CurrentType } from '../actions/CurrentAction';

export interface ICurrentState {
    nowDateTime: moment.Moment,
    whatIsToday: string,
    weather: IWeather,
}

export interface IWeather {
    date: moment.Moment,
    code: number,
    text: string,
    temperature: {
        max: number,
        min: number,
    },
    rainfallProbability: number,
}

const initState: ICurrentState = {
    nowDateTime: moment('2019-05-01T12:00:00'),
    whatIsToday: '',
    weather: {
        date: moment('2019-05-01T12:00:00'),
        code: 1,
        text: '多分晴れだと思う',
        temperature: {
            max: 20,
            min: -1,
        },
        rainfallProbability: 0.5,
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
        default: {
            return state;
        }
    }
};
