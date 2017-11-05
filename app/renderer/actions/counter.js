import type { Dispatch, GetState } from '../types/Store';

export type IncrementType = {
  type: 'INCREMENT_COUNTER',
  payload: 1
};
export function increment(): IncrementType {
  return {
    type: 'INCREMENT_COUNTER',
    payload: 1
  };
}

export type DecrementType = {
  type: 'DECREMENT_COUNTER',
  payload: 1
};
export function decrement(): DecrementType {
  return {
    type: 'DECREMENT_COUNTER',
    payload: 1
  };
}

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export type CounterActionType = incrementType | decrementType;
