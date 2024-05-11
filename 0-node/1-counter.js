import { configureStore } from '@reduxjs/toolkit';

const DEFAULT_STATE = { value: 1 };

const reducer = (state = DEFAULT_STATE, action) => {
    console.log("Action:", action);
    switch (action.type) {
        case 'INCREMENT':
            const i = action.payload.value ?? 1;
            return { value: state.value + i };
        case 'DECREMENT':
            const d = action.payload.value ?? 1;
            return { value: state.value - d };
        default:
            return state;
    }
}

const store = configureStore({ reducer });
store.subscribe(() => console.log("New State:", store.getState())); // Log store to console on change

console.log("Initial State:", store.getState());
store.dispatch({ type: 'INCREMENT', payload: { value: 3 } });
store.dispatch({ type: 'INCREMENT', payload: {} });
store.dispatch({ type: 'INCREMENT', payload: {} });
store.dispatch({ type: 'DECREMENT', payload: { value: 2 } });
store.dispatch({ type: 'DECREMENT', payload: {} });
