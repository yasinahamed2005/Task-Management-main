const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error('Error fetching task by ID:', err);
    res.status(500).json({ error: 'Error fetching task' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, due_date } = req.body;
  try {
    const newTask = new Task({ title, description, due_date });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Error creating task' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  try {
    console.log('Attempting to update task with id:', id);
    const task = await Task.findById(id);
    if (!task) {
      console.log('Task not found:', id);
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.due_date = due_date || task.due_date;
    task.status = status || task.status;
    console.log('Updated task:', task);

    await task.save();
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.deleteById(id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Error deleting task' });
  }
};

exports.completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.markComplete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error('Error marking task as complete:', err);
    res.status(500).json({ error: 'Error marking task as complete' });
  }
};
