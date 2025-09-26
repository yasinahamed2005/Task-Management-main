import React from 'react';
import { Button } from '../components/ui/button'; // Adjust path if needed
import { FaEdit, FaCheck, FaTrash } from 'react-icons/fa'; // Ensure the icons are imported correctly
import { formatDate, formatTimestamp } from '../lib/utils'; // Adjust path if needed

const TaskItem = ({ task, onDelete, onComplete, onEdit, onViewDetails }) => {
  const { id, due_date, title, description, status, created_at, updated_at } = task;

  const formattedDate = formatDate(due_date);
  const formattedCreatedAt = formatTimestamp(created_at);
  const formattedUpdatedAt = formatTimestamp(updated_at);

  return (
    <div className={`task-item border rounded-lg p-4 flex justify-between items-center ${status === 'completed' ? 'bg-gray-200' : ''}`}>
      <div className="flex-grow">
        <h3 className={`text-lg font-semibold ${status === 'completed' ? 'line-through text-gray-500' : ''}`}>{title}</h3>
        <p className="text-sm text-gray-500">
          Due: {formattedDate === 'Invalid date' ? 'No due date' : formattedDate}
        </p>
      </div>
      <div className="flex space-x-2">
        {status !== 'completed' && (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(task)}
              className="p-2"
            >
              <FaEdit /> {/* Edit icon */}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onComplete(id)}
              className="p-2"
            >
              <FaCheck /> {/* Complete icon */}
            </Button>
          </>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(id)}  // Pass the task ID to fetch details
          className="p-2"
        >
          View Details
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => onDelete(id)}
          className="p-2"
        >
          <FaTrash /> {/* Delete icon */}
        </Button>
      </div>
    </div>
  );
};


export default TaskItem;
