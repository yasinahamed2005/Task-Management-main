import React, { useState } from 'react';
import TaskItem from './TaskItem';
const TaskList = ({ tasks, onDelete, onComplete, onEdit, onViewDetails }) => {
  const inProgressTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div>
      {/* In Progress Tasks */}
      <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
      {inProgressTasks.length > 0 ? (
        inProgressTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} onEdit={onEdit} onViewDetails={onViewDetails} />
        ))
      ) : (
        <p>No tasks in progress.</p>
      )}

      {/* Completed Tasks */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Completed</h2>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} onEdit={onEdit} onViewDetails={onViewDetails} />
        ))
      ) : (
        <p>No completed tasks.</p>
      )}
    </div>
  );
};

export default TaskList;
