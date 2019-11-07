import { createStore, combineReducers, applyMiddleware } from 'redux';
import { hogeReducer, HogeState } from './reducers/hogeState';
import { middleware } from './middleware';

export type AppState = {
    hoge: HogeState,
};

const store = createStore(
    combineReducers<AppState>({
        hoge: hogeReducer,
    }),
    applyMiddleware(middleware),
);

export default store;
