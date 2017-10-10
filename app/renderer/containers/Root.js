// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from '../Routes';
import type { Store } from '../types/Store';

type Props = {
    store: Store,
    history: {}
};

export default class Root extends React.Component<Props> {
    render() {
        return (
            // $FlowFixMe
            <Provider store={this.props.store}>
                <ConnectedRouter history={this.props.history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        );
    }
}
