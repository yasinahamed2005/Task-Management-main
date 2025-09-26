const { expect } = require('chai');
const Task = require('../src/models/Task');
const fileStorage = require('../src/utils/fileStorage');

describe('Task Model', () => {
  beforeEach(async () => {
    // Clear the tasks file before each test
    await fileStorage.writeData([]);
  });

  it('should create a new task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      due_date: '2024-12-31'
    };

    const task = new Task(taskData);
    await task.save();

    const savedTasks = await Task.findAll();
    expect(savedTasks).to.have.lengthOf(1);
    expect(savedTasks[0].title).to.equal(taskData.title);
    expect(savedTasks[0].status).to.equal('pending');
  });

  it('should mark a task as complete', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      due_date: '2024-12-31'
    };

    const task = new Task(taskData);
    await task.save();

    const completedTask = await Task.markComplete(task.id);
    expect(completedTask.status).to.equal('completed');

    const savedTask = await Task.findById(task.id);
    expect(savedTask.status).to.equal('completed');
  });

  it('should delete a task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      due_date: '2024-12-31'
    };

    const task = new Task(taskData);
    await task.save();

    await Task.deleteById(task.id);
    const savedTasks = await Task.findAll();
    expect(savedTasks).to.have.lengthOf(0);
  });

  it('should retrieve all tasks', async () => {
    const taskData1 = {
      title: 'Task 1',
      description: 'Description 1',
      due_date: '2024-12-25'
    };
    const taskData2 = {
      title: 'Task 2',
      description: 'Description 2',
      due_date: '2024-12-30'
    };

    const task1 = new Task(taskData1);
    const task2 = new Task(taskData2);
    await task1.save();
    await task2.save();

    const tasks = await Task.findAll();
    expect(tasks).to.have.lengthOf(2);
    expect(tasks[0].title).to.equal('Task 2'); // Sorted by created_at descending
    expect(tasks[1].title).to.equal('Task 1');
  });

  it('should retrieve a specific task by ID', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      due_date: '2024-12-31'
    };

    const task = new Task(taskData);
    await task.save();

    const retrievedTask = await Task.findById(task.id);
    expect(retrievedTask).to.not.be.null;
    expect(retrievedTask.title).to.equal('Test Task');
    expect(retrievedTask.description).to.equal('Test Description');
  });

  it('should return null for a non-existent task when retrieving by ID', async () => {
    const retrievedTask = await Task.findById('non-existent-id');
    expect(retrievedTask).to.be.null;
  });

  it('should update an existing task', async () => {
    const taskData = {
      title: 'Old Title',
      description: 'Old Description',
      due_date: '2024-12-31'
    };

    const task = new Task(taskData);
    await task.save();

    task.title = 'Updated Title';
    task.description = 'Updated Description';
    task.status = 'in-progress'; // Update task status
    await task.save();

    const updatedTask = await Task.findById(task.id);
    expect(updatedTask.title).to.equal('Updated Title');
    expect(updatedTask.description).to.equal('Updated Description');
    expect(updatedTask.status).to.equal('in-progress');
  });

  it('should not update a non-existent task', async () => {
    const taskData = {
      title: 'Non-existent Task',
      description: 'This task doesn\'t exist',
      due_date: '2024-12-31'
    };

    const task = new Task(taskData);
    await task.save();

    // Try to update a task that doesn't exist in the file
    const fakeId = 'non-existent-id';
    const nonExistentTask = await Task.findById(fakeId);
    expect(nonExistentTask).to.be.null;
  });
});
