function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <div style={{
      border: '1px solid gray',
      padding: '10px',
      marginBottom: '5px',
      backgroundColor: task.completed ? '#d4edda' : '#f8d7da'
    }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>

      <button onClick={() => toggleComplete(task._id, task.completed)}>
        {task.completed ? "Undo" : "Complete"}
      </button>

      <button onClick={() => deleteTask(task._id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
