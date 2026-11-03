const express = require('express');
const router = express.Router();

const priorities = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];
const statuses = ['PENDING', 'ASSIGNED', 'ON_THE_WAY', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

const transitions = {
  PENDING: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['ON_THE_WAY', 'CANCELLED'],
  ON_THE_WAY: ['IN_PROGRESS'],
  IN_PROGRESS: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
};

const minDuration = 30;
const maxDuration = 240;

module.exports = router;
