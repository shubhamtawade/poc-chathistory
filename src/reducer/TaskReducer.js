import { TaskAction } from "./TaskAction";

export const initialState = localStorage.getItem("tasks-history") || [];

export const taskReducer = (state, action) => {
  switch (action?.type) {
    case TaskAction.ADD_TASK:
      if (!localStorage.getItem("tasks-history")) {
        localStorage.setItem(
          "tasks-history",
          JSON.stringify([action?.payload])
        );
      } else {
        localStorage.setItem(
          "tasks-history",
          JSON.stringify(
            JSON.parse(localStorage.getItem("tasks-history")).concat(
              action?.payload
            )
          )
        );
      }
      return [...state, action?.payload];
    case TaskAction.READ_TASK:
      if (!localStorage.getItem("tasks-history")) {
        return state;
      } else {
        return JSON.parse(localStorage.getItem("tasks-history"));
      }
    default:
      return state;
  }
};
