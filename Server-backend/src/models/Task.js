const { v4: uuidv4 } = require('uuid');
const fileStorage = require('../utils/fileStorage');

class Task {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.title = data.title;
    this.description = data.description;
    this.due_date = new Date(data.due_date).toISOString();
    this.status = data.status || 'pending';
    this.created_at = data.created_at || new Date().toISOString();
    this.updated_at = data.updated_at || new Date().toISOString();
  }

  static async findAll() {
    const tasks = await fileStorage.readData();
    return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  static async findById(id) {
    const tasks = await fileStorage.readData();
    const taskData = tasks.find(task => task.id === id);

    if (!taskData) return null; // If task is not found, return null

    // Return an instance of the Task class with the task data
    return new Task(taskData);
  }

  async save() {
    const tasks = await fileStorage.readData();
    const existingTaskIndex = tasks.findIndex(task => task.id === this.id);

    if (existingTaskIndex >= 0) {
      this.updated_at = new Date().toISOString(); // Update the updated_at timestamp
      tasks[existingTaskIndex] = this; // Replace the existing task with the updated task
    } else {
      tasks.push(this); // If the task doesn't exist, add the new task
    }

    await fileStorage.writeData(tasks); // Save the updated tasks list to the file
    return this;
  }

  static async deleteById(id) {
    const tasks = await fileStorage.readData();
    const filteredTasks = tasks.filter(task => task.id !== id); // Remove the task with the given ID
    await fileStorage.writeData(filteredTasks); // Write the updated tasks list to the file
  }

  static async markComplete(id) {
    const tasks = await fileStorage.readData();
    const task = tasks.find(task => task.id === id);

    if (task) {
      task.status = 'completed'; // Mark the task as completed
      task.updated_at = new Date().toISOString(); // Update the timestamp
      await fileStorage.writeData(tasks); // Write the updated tasks list to the file
      return task; // Return the updated task
    }

    return null; // If the task wasn't found, return null
  }
}

module.exports = Task;
