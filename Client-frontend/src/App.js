import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { 
  fetchTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  completeTask, 
  fetchTaskById 
} from './services/APIServices';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  useEffect(() => {
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setIsLoading(true);
    try {
      const newTask = await createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      setEditingTask(null);
    } catch (err) {
      setError(err.message || 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    setIsLoading(true);
    try {
      const updatedTask = await updateTask(taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setEditingTask(null);
    } catch (err) {
      setError(err.message || 'Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewTaskDetails = async (taskId) => {
    setIsLoading(true);
    try {
      const task = await fetchTaskById(taskId);
      setTaskDetails(task);
      setViewingTask(taskId);
    } catch (err) {
      setError(err.message || 'Failed to fetch task details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setIsLoading(true);
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    setIsLoading(true);
    try {
      const updatedTask = await completeTask(taskId);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to complete task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToList = () => {
    setViewingTask(null);
    setTaskDetails(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Task Management System</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="absolute top-0 right-0 px-4 py-2"
          >
            ✕
          </button>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}

      {viewingTask && taskDetails && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4"><strong>Title :- </strong>{taskDetails.title}</h2>
          <p className="mb-2"><strong>Description :- </strong> {taskDetails.description}</p>
          <p><strong>Due Date :- </strong> {new Date(taskDetails.due_date).toLocaleString()}</p>
          <p><strong>Created at :- </strong> {new Date(taskDetails.created_at).toLocaleString()}</p>
          <p><strong>Updated at :- </strong> {new Date(taskDetails.updated_at).toLocaleString()}</p>
          <button 
            onClick={handleBackToList} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Back to List
          </button>
        </div>
      )}

      {!viewingTask && (
        <>
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            initialData={editingTask}
            isEditing={!!editingTask}
            onCancel={() => setEditingTask(null)}
          />

          {tasks.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 mt-8">
              No tasks yet. Create your first task!
            </div>
          )}

          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
            onEdit={setEditingTask}
            onViewDetails={handleViewTaskDetails}
          />
        </>
      )}
    </div>
  );
}

export default App;