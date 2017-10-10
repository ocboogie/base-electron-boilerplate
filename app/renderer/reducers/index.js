import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import counter from './counter';

const reducers = {
    counter,
    router
};

export default combineReducers(reducers);
