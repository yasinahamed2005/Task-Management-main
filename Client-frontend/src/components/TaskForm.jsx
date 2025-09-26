// src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '../components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { formatTimestamp } from '../lib/utils';

const TaskForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [taskData, setTaskData] = useState({
    id: '',  
    title: '',
    description: '',
    due_date: ''
  });
  const [errors, setErrors] = useState({});

  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setTaskData({
        id: initialData.id || '',  
        title: initialData.title || '',
        description: initialData.description || '',
        due_date: initialData.due_date 
          ? new Date(initialData.due_date).toISOString().split('T')[0] 
          : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate task data
    const { isValid, errors } = formatTimestamp(taskData);

    if (!isValid) {
      setErrors(errors);
      return;
    }

    // Submit the task data
    onSubmit(taskData);

    // Reset form if not editing
    if (!isEditing) {
      setTaskData({ id: '', title: '', description: '', due_date: '' });
      setErrors({});
    }
  };

  // Handle cancel action and clear the form
  const handleCancel = () => {
    onCancel();
    setTaskData({ id: '', title: '', description: '', due_date: '' }); // Clear form on cancel
    setErrors({});
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <Input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
            {errors.title && (
              <Alert variant="destructive" className="mt-2">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.title}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <Textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
            {errors.description && (
              <Alert variant="destructive" className="mt-2">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.description}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="due_date" className="block mb-2">Due Date</label>
            <Input
              type="date"
              id="due_date"
              name="due_date"
              value={taskData.due_date}
              onChange={handleChange}
            />
            {errors.due_date && (
              <Alert variant="destructive" className="mt-2">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.due_date}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel} // Use the new handleCancel function
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            className="ml-auto"
          >
            {isEditing ? 'Update Task' : 'Create Task'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TaskForm;
