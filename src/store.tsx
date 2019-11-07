// 書き終わり
import { createStore, applyMiddleware, Store } from 'redux';
import { middleware } from './webSocket';
import { reducers } from './reducers';

const store: Store = createStore(
    reducers,
    applyMiddleware(middleware),
);

export default store;
