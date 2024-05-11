import React from "react";
import { createRoot } from "react-dom/client";
import { CounterApp } from "./CounterApp.tsx";
import { ToDoApp } from "./ToDoApp.tsx";

const div = document.getElementById("root") as HTMLElement;
const root = createRoot(div);
root.render(<ToDoApp />);
