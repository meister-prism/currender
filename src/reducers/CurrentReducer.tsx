import { Reducer } from 'redux';
import moment from 'moment';
import { CurrentAction, CurrentType } from '../actions/CurrentAction';

export interface ICurrentState {
    nowDateTime: moment.Moment,
    whatIsToday: string,
}

const initState: ICurrentState = {
    nowDateTime: moment('2019-05-01T12:00:00'),
    whatIsToday: '',
};

export const CurrentReducer: Reducer<ICurrentState, CurrentAction> = (
    state: ICurrentState = initState,
    action: CurrentAction,
): ICurrentState => {
    switch (action.type) {
        case CurrentType.UPDATE_DATETIME: {
            const nowMoment: moment.Moment = moment();
            const { whatIsToday } = state;
            return {
                nowDateTime: nowMoment,
                whatIsToday,
            };
        }
        case CurrentType.UPDATE_WHATISTODAY: {
            const { nowDateTime } = state;
            return {
                nowDateTime,
                whatIsToday: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
