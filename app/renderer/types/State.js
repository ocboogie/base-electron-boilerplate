// @flow
import type { State as CounterState } from '../reducers/counter';

export type State = {
    +counter: CounterState
};
