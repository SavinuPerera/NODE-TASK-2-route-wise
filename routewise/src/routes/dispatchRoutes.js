// Member 5 - Pabasara Senevirathne

const express = require('express');
const router = express.Router();

// Import the logic function from the service file
const { autoAssignJob } = require('../services/dispatchService');

// POST /api/dispatch/auto-assign/:jobId
router.post('/auto-assign/:jobId', (req, res) => {

  // Call the service function with the jobId parameter
  const result = autoAssignJob(req.params.jobId);

  // If operation failed, return the appropriate status code and error message
  if (!result.success) {
    return res.status(result.statusCode).json({
      error: result.message,
    });
  }

  // If successful, return 200 OK with the assignment details
  return res.status(200).json({
    message: 'Job successfully assigned!',
    jobId: result.jobId,
    assignedTechnician: result.assignedTechnician,
    assignedTechnicianId: result.assignedTechnicianId,
    score: result.score,
  });
});

module.exports = router;