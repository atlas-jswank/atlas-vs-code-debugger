import { configureStore } from "@reduxjs/toolkit";

type AppState = {
  value: number;
};

type IncrementAction = { type: "INCREMENT"; payload: { value?: number } };
type DecrementAction = { type: "DECREMENT"; payload: { decreaseBy: number } };
type AppAction = IncrementAction | DecrementAction;

const DEFAULT_STATE = { value: 1 };

const reducer = (state: AppState = DEFAULT_STATE, action: AppAction) => {
  console.log("Action:", action);
  switch (action.type) {
    case "INCREMENT":
      const i = action.payload.value ?? 1;
      return { value: state.value + i };
    case "DECREMENT":
      const d = action.payload.decreaseBy;
      return { value: state.value - d };
    default:
      return state;
  }
};

const store = configureStore({ reducer });

store.subscribe(() => console.log("New State:", store.getState()));

console.log("Initial State:", store.getState());
store.dispatch<AppAction>({ type: "INCREMENT", payload: { value: 3 } });
store.dispatch<AppAction>({ type: "INCREMENT", payload: {} });
store.dispatch<AppAction>({ type: "INCREMENT", payload: {} });
store.dispatch<AppAction>({ type: "DECREMENT", payload: { decreaseBy: 2 } });
store.dispatch<AppAction>({ type: "DECREMENT", payload: { decreaseBy: 1 } });
