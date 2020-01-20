import { Action } from 'redux';

export enum CurrentType {
    UPDATE_DATETIME = 'UPDATE_DATETIME',
}

interface ICurrentDateTimeAction extends Action {
    type: CurrentType.UPDATE_DATETIME,
}

export type CurrentAction = ICurrentDateTimeAction;

interface ICurrentActionCreator {
    updateNowDate(): ICurrentDateTimeAction,
}


class CurrentActionCreator implements ICurrentActionCreator {
    public updateNowDate = (): ICurrentDateTimeAction => ({
        type: CurrentType.UPDATE_DATETIME,
    });
}

export const currentActionCreator: ICurrentActionCreator = new CurrentActionCreator();
