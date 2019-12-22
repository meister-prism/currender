import { Action } from 'redux';
import { IWeather } from '../reducers/CurrentReducer';

export enum CurrentType {
    UPDATE_DATETIME = 'UPDATE_DATETIME',
    UPDATE_WHATISTODAY = 'UPDATE_WHATISTODAY',
    UPDATE_WEATHER = 'UPDATE_WEATHER',
}

interface ICurrentDateTimeAction extends Action {
    type: CurrentType.UPDATE_DATETIME,
}

interface ICurrentWITAction extends Action {
    type: CurrentType.UPDATE_WHATISTODAY,
    payload: string,
}

interface ICurrentWeatherAction extends Action {
    type: CurrentType.UPDATE_WEATHER,
    payload: IWeather,
}

export type CurrentAction = ICurrentDateTimeAction | ICurrentWITAction;

interface ICurrentActionCreator {
    updateNowDate(): ICurrentDateTimeAction,
    updateWhatIsToday(value: string): ICurrentWITAction,
}


class CurrentActionCreator implements ICurrentActionCreator {
    public updateNowDate = (): ICurrentDateTimeAction => ({
        type: CurrentType.UPDATE_DATETIME,
    });

    public updateWhatIsToday = (value: string): ICurrentWITAction => ({
        type: CurrentType.UPDATE_WHATISTODAY,
        payload: value,
    });

    public updateWeather = (value: IWeather): ICurrentWeatherAction => ({
        type: CurrentType.UPDATE_WEATHER,
        payload: value,
    })
}

export const currentActionCreator: ICurrentActionCreator = new CurrentActionCreator();
