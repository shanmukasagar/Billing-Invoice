import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import  {rootReducer} from './reducers/root-reducer';

const store = createStore(rootReducer, 
    compose(applyMiddleware(thunk), 
                                window.__REDUX_DEVTOOLS_EXTENSION__
                                    ? window.__REDUX_DEVTOOLS_EXTENSION__()
                                    : (f) => f
                        )
);

export default store;