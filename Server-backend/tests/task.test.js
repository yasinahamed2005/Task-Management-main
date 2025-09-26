const { v4: uuidv4 } = require('uuid');
const fileStorage = require('../utils/fileStorage');

class Task {
  constructor({ title, description, due_date, status = 'pending', id = null, created_at = null }) {
    this.id = id || uuidv4();
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.status = status;
    this.created_at = created_at || new Date().toISOString();
  }

  async save() {
    const tasks = await fileStorage.readData();
    const index = tasks.findIndex((t) => t.id === this.id);

    if (index >= 0) {
      // Update existing task
      tasks[index] = this;
    } else {
      // Add new task
      tasks.push(this);
    }

    await fileStorage.writeData(tasks);
    return this;
  }

  static async findAll() {
    const tasks = await fileStorage.readData();
    // ✅ Ensure sorting by created_at DESC
    return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  static async findById(id) {
    const tasks = await fileStorage.readData();
    return tasks.find((t) => t.id === id) || null;
  }

  static async deleteById(id) {
    let tasks = await fileStorage.readData();
    tasks = tasks.filter((t) => t.id !== id);
    await fileStorage.writeData(tasks);
  }

  static async markComplete(id) {
    const tasks = await fileStorage.readData();
    const task = tasks.find((t) => t.id === id);

    if (task) {
      task.status = 'completed';
      await fileStorage.writeData(tasks);
      return task;
    }

    return null;
  }
}

module.exports = Task;
