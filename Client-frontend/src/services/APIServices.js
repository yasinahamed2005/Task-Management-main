const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const TOKEN = 'Bearer test-token'; // Use a real token in production

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// Fetch task details by ID
export const fetchTaskById = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// Update an existing task
export const updateTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks/${taskData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
};

// Mark task as complete
export const completeTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
