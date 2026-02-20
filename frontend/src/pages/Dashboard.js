import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // 🔹 Load tasks from backend
  useEffect(() => {
    fetch('https://secure-task-manager-aam9.onrender.com/tasks')

      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // 🔹 Add task to database
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

    const response = await fetch('https://secure-task-manager-aam9.onrender.com/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        completed: false
      })
    });

    const data = await response.json();
    setTasks([...tasks, data]);

    setNewTitle('');
    setNewDescription('');
  };

  // 🔹 Toggle complete
  const toggleComplete = async (id, completed) => {
    const response = await fetch(`https://secure-task-manager-aam9.onrender.com/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });

    const updatedTask = await response.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    await fetch(`https://secure-task-manager-aam9.onrender.com/tasks/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Dashboard</h1>

      <form onSubmit={handleAddTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default Dashboard;
