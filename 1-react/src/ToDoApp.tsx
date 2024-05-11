import React, { useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import {
  Provider,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";
import type { Dispatch } from "redux";

type Todo = {
  id: number;
  text: string;
};

type AppState = {
  todos: Todo[];
};

type AddAction = { type: "ADD"; payload: Todo };
type CompleteAction = { type: "COMPLETE"; payload: { id: number } };
type AppAction = AddAction | CompleteAction;

// Make redux hooks type aware
const useDispatch = _useDispatch<Dispatch<AppAction>>;
const useSelector = _useSelector.withTypes<AppState>();

const DEFAULT_STATE = { todos: [] };

function reducer(state: AppState = DEFAULT_STATE, action: AppAction) {
  let newState = JSON.parse(JSON.stringify(state)) as AppState;
  switch (action.type) {
    case "ADD":
      newState.todos.push(action.payload);
      break;
    case "COMPLETE":
      newState.todos = newState.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      break;
  }
  return newState;
}

const store = configureStore<AppState, AppAction>({ reducer });

const CompleteIcon = ({ id }: { id: number }) => {
  const dispatch = useDispatch();
  return (
    <svg
      width={24}
      onClick={() => dispatch({ type: "COMPLETE", payload: { id } })}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};

function ToDo() {
  const todos = useSelector((state) => state.todos);

  return (
    <div>
      <h1>Todo</h1>
      {todos.map((todo) => (
        <div className="todo-list" key={todo.id}>
          {todo.text}
          <CompleteIcon id={todo.id} />
        </div>
      ))}
      <AddToDo />
    </div>
  );
}

function AddToDo() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  return (
    <>
      <input
        type="text"
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({
            type: "ADD",
            payload: { id: new Date().getTime(), text },
          });
          setText("");
        }}
      >
        Add
      </button>
    </>
  );
}

export function ToDoApp() {
  return (
    <Provider store={store}>
      <ToDo />
    </Provider>
  );
}
