import React from "react";
import { configureStore } from "@reduxjs/toolkit";

import {
  Provider,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";
import type { Dispatch } from "redux";

type AppState = {
  count: number;
};

type IncrementAction = { type: "INCREMENT"; payload: { incrementBy: number } };
type DecrementAction = { type: "DECREMENT"; payload: { decrementBy: number } };
type AppAction = IncrementAction | DecrementAction;

// Make redux hooks type aware
const useDispatch = _useDispatch<Dispatch<AppAction>>;
const useSelector = _useSelector.withTypes<AppState>();

const DEFAULT_STATE = { count: 0 };

function reducer(state: AppState = DEFAULT_STATE, action: AppAction) {
  let newState = JSON.parse(JSON.stringify(state)) as AppState;
  switch (action.type) {
    case "INCREMENT":
      newState.count = state.count + action.payload.incrementBy;
      break;
    case "DECREMENT":
      newState.count = state.count - action.payload.decrementBy;
      break;
    default:
      break;
  }
  return newState;
}

const store = configureStore<AppState, AppAction>({ reducer });

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        onClick={() =>
          dispatch({ type: "INCREMENT", payload: { incrementBy: 1 } })
        }
      >
        Increment
      </button>
      <button
        onClick={() =>
          dispatch({ type: "DECREMENT", payload: { decrementBy: 1 } })
        }
      >
        Decrement
      </button>
    </div>
  );
}

export function CounterApp() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
