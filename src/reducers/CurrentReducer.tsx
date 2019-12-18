import { Reducer } from 'redux';
import moment from 'moment';
import { CurrentAction, CurrentType } from '../actions/CurrentAction';

export interface ICurrentState {
    nowDate: string,
    nowTime: string,
}

const initState: ICurrentState = {
    nowDate: '2019-05-01',
    nowTime: '12:00:00',
};

export const CurrentReducer: Reducer<ICurrentState, CurrentAction> = (
    state: ICurrentState = initState,
    action: CurrentAction,
): ICurrentState => {
    switch (action.type) {
        case CurrentType.UPDATE_DATETIME: {
            const nowMoment: moment.Moment = moment();
            return {
                nowDate: nowMoment.format('YYYY-MM-DD'),
                nowTime: nowMoment.format('hh:mm:ss'),
            };
        }
        default: {
            return state;
        }
    }
};
