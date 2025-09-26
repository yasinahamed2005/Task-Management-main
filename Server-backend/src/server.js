const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

const app = express();
const port = 3001;

// Robust CORS configuration
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/tasks', auth, taskRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
