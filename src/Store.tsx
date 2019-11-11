import {
    createStore,
    Store,
    applyMiddleware,
} from 'redux';
import { Middleware } from './Middleware';
import reducers from './reducers';

// importしたreducerを渡してstoreを作成
const store: Store = createStore(
    reducers,
    applyMiddleware(Middleware),
);

export default store;
