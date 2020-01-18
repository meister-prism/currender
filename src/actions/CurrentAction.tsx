import { Action } from 'redux';
import { IWeather, ITraffic, IAstrology, IWIT } from '../reducers/CurrentReducer';

export enum CurrentType {
    UPDATE_DATETIME = 'UPDATE_DATETIME',
    UPDATE_WHATISTODAY = 'UPDATE_WHATISTODAY',
    UPDATE_WEATHER = 'UPDATE_WEATHER',
    UPDATE_TRAFFIC = 'UPDATE_TRAFFIC',
    UPDATE_ASTROLOGY = 'UPDATE_ASTROLOGY',
}

interface ICurrentDateTimeAction extends Action {
    type: CurrentType.UPDATE_DATETIME,
}

interface ICurrentWITAction extends Action {
    type: CurrentType.UPDATE_WHATISTODAY,
    payload: IWIT,
}

interface ICurrentWeatherAction extends Action {
    type: CurrentType.UPDATE_WEATHER,
    payload: IWeather,
}

interface ICurrentTrafficAction extends Action {
    type: CurrentType.UPDATE_TRAFFIC,
    payload: Array<ITraffic>,
}

interface ICurrentAstrologyAction extends Action {
    type: CurrentType.UPDATE_ASTROLOGY,
    payload: Array<IAstrology>,
}

export type CurrentAction = ICurrentDateTimeAction
                            | ICurrentWITAction
                            | ICurrentWeatherAction
                            | ICurrentTrafficAction
                            | ICurrentAstrologyAction;

interface ICurrentActionCreator {
    updateNowDate(): ICurrentDateTimeAction,
    updateWhatIsToday(value: IWIT): ICurrentWITAction,
    updateWeather(value: IWeather): ICurrentWeatherAction,
    updateTraffic(value: Array<ITraffic>): ICurrentTrafficAction,
    updateAstrology(value: Array<IAstrology>): ICurrentAstrologyAction,
}


class CurrentActionCreator implements ICurrentActionCreator {
    public updateNowDate = (): ICurrentDateTimeAction => ({
        type: CurrentType.UPDATE_DATETIME,
    });

    public updateWhatIsToday = (value: IWIT): ICurrentWITAction => ({
        type: CurrentType.UPDATE_WHATISTODAY,
        payload: value,
    });

    public updateWeather = (value: IWeather): ICurrentWeatherAction => ({
        type: CurrentType.UPDATE_WEATHER,
        payload: value,
    });

    public updateTraffic = (value: Array<ITraffic>): ICurrentTrafficAction => ({
        type: CurrentType.UPDATE_TRAFFIC,
        payload: value,
    });

    public updateAstrology = (value: Array<IAstrology>):ICurrentAstrologyAction => ({
        type: CurrentType.UPDATE_ASTROLOGY,
        payload: value,
    });
}

export const currentActionCreator: ICurrentActionCreator = new CurrentActionCreator();
