const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.getAllTasks); //To get all task
router.get('/:id', taskController.getTaskById); //to get specific task using task ID
router.post('/', taskController.createTask); //To create a task
router.put('/:id', taskController.updateTask); //To update an task
router.delete('/:id', taskController.deleteTask); //To Delete an Task
router.patch('/:id/complete', taskController.completeTask); //To mark a task as complete

module.exports = router;
