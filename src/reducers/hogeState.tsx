import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { hogeActions } from '../actions/hogeActions';

export interface HogeState {
    name: string;
}

const initialState: HogeState = {
    name: '',
};

export const hogeReducer = reducerWithInitialState(initialState)
    .case(hogeActions.update, (state: HogeState, name) => ({ ...state, name }));
