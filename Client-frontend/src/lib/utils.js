// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to conditionally merge Tailwind CSS classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function to format date in a readable format
export function formatDate(dateString) {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';  // or you could return a default value like 'N/A'
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Function to validate task form data
export function formatTimestamp(taskData) {
  const errors = {};

  if (!taskData.title || taskData.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (!taskData.description || taskData.description.trim() === '') {
    errors.description = 'Description is required';
  }

  // Check if due_date is valid
  const dueDate = new Date(taskData.due_date);
  if (!taskData.due_date || isNaN(dueDate.getTime())) {
    errors.due_date = 'Due date is required and must be a valid date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
