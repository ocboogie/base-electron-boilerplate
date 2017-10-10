import React from 'react';
import { render } from 'react-dom';

import Root from './containers/Root';
import storeObj from './store';

import '../styles.global.css';

const { configureStore, history } = storeObj;

const store = configureStore();

render(<Root store={store} history={history} />, document.getElementById('root'));
