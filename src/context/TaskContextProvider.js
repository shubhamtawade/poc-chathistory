import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, taskReducer } from "../reducer/TaskReducer";
import { TaskAction } from "../reducer/TaskAction";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const taskChannel = new BroadcastChannel("task_channel");
  taskChannel.addEventListener("message", (event) => {
    if (event?.data === "update-tasks") {
      dispatch({
        type: TaskAction.READ_TASK,
      });
    }
  });
  useEffect(() => {
    if (!localStorage.getItem("tasks-sessions")) {
      localStorage.setItem("tasks-sessions", 1);
    } else {
      localStorage.setItem(
        "tasks-sessions",
        parseInt(localStorage.getItem("tasks-sessions")) + parseInt(1)
      );
    }
    if (parseInt(localStorage.getItem("task-sessions")) > 0) {
      taskChannel.postMessage("update-tasks");
    }
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      if (localStorage.getItem("tasks-sessions")) {
        localStorage.setItem(
          "tasks-sessions",
          parseInt(localStorage.getItem("tasks-sessions")) - parseInt(1)
        );
      }
    });
    window.addEventListener("storage", () => {
      console.log("asdd" + sessionStorage.getItem("reload"));
    });
  }, []);
  return (
    <TaskContext.Provider value={{ state, dispatch, taskChannel }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
