import { useState } from "react";
import "./App.css";
import { useTaskContext } from "./context/TaskContextProvider";
import { TaskAction } from "./reducer/TaskAction";

function App() {
  const [task, setTask] = useState("");
  const { state, dispatch, taskChannel } = useTaskContext();
  console.log(state);
  const onAddTask = (e) => {
    e.preventDefault();
    dispatch({
      type: TaskAction.ADD_TASK,
      payload: task,
    });
    setTask("");
    taskChannel.postMessage("update-tasks");
  };
  return (
    <div className="tasks-container">
      <input
        placeholder="Enter Tasks"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={onAddTask}>Submit</button>
      <div className="tasks-block">
        {state !== undefined && state !== null && state instanceof Array ? (
          <>
            {state?.length > 0 &&
              state?.map((task, id) => <p key={id}>{task}</p>)}
          </>
        ) : (
          <>
            {JSON.parse(state)?.map((task, id) => (
              <p key={id}>{task}</p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
