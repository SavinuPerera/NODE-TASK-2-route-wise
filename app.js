const express = require('express');

const technicians = require('./routes/technicianRoutes');
const jobs = require('./routes/jobRoutes');
const parts = require('./routes/partRoutes');
const dispatch = require('./routes/dispatchRoutes');

const app = express();


app.use(express.json());


app.get('/api/health', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'Server is running',
    data: { status: 'OK' },
  });
});

 
app.use('/api/technicians', technicians);
app.use('/api/jobs', jobs);
app.use('/api/parts', parts);
app.use('/api/dispatch', dispatch);

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
});


app.use((error, _request, response, _next) => {
  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({
      success: false,
      message: 'Invalid JSON in request body',
    });
  }

  console.error(error);
  response.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
});

module.exports = app;
