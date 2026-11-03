const express = require('express');
const router = express.Router();
const store = require('../data/store');

function makeDate(date, time) {
  return new Date(date + 'T' + time);
}

function makeEndDate(startDate, duration) {
  return new Date(startDate.getTime() + duration * 60 * 1000);
}

function getTechnicianById(id) {
  for (let i = 0; i < store.technicians.length; i++) {
    if (store.technicians[i].id === id) {
      return store.technicians[i];
    }
  }
  return null;
}

router.get('/technicians', (req, res) => {
  try {
    let result = [];
    for (let i = 0; i < store.technicians.length; i++) {
      let t = store.technicians[i];
      result.push({
        id: t.id,
        name: t.name,
        skills: t.skills,
        zone: t.zone,
        availableFrom: t.availableFrom,
        availableTo: t.availableTo,
        maxJobsPerDay: t.maxJobsPerDay,
        assignedJobIds: t.assignedJobIds,
        unavailableSlots: t.unavailableSlots
      });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/technicians/:id', (req, res) => {
  try {
    let techId = req.params.id;
    let target = getTechnicianById(techId);

    if (!target) {
      return res.status(404).json({ success: false, message: "Technician not found with ID: " + techId });
    }

    return res.status(200).json({ success: true, data: target });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;