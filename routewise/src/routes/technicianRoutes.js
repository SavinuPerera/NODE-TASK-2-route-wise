const express = require('express');
const router = express.Router();
const { technicians } = require('../data/store');

function formatTimeTo24Hours(timeInput) {
  if (!timeInput) return "";
  let dateObj = new Date(timeInput);
  if (isNaN(dateObj.getTime())) {
    return timeInput; 
  }
  let hours = String(dateObj.getHours()).padStart(2, '0');
  let minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

router.get('/technicians', (req, res) => {
  try {
    let result = [];
    for (let i = 0; i < technicians.length; i++) {
      let t = technicians[i];
      result.push({
        id: t.id,
        name: t.name,
        skills: t.skills,
        zone: t.zone,
        availableFrom: formatTimeTo24Hours(t.availableFrom),
        availableTo: formatTimeTo24Hours(t.availableTo),
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
    let target = null;
    
    for (let t of technicians) {
      if (t.id === techId) {
        target = t;
        break;
      }
    }

    if (!target) {
      return res.status(404).json({ success: false, message: "Technician not found with ID: " + techId });
    }

    let formattedTech = {
      ...target,
      availableFrom: formatTimeTo24Hours(target.availableFrom),
      availableTo: formatTimeTo24Hours(target.availableTo)
    };

    return res.status(200).json({ success: true, data: formattedTech });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;