export type State = number;

const initialState = 0;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return state + action.payload;
        case 'DECREMENT_COUNTER':
            return state - action.payload;
        default:
            return state;
    }
};
