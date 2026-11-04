const express = require('express');
const router = express.Router();
const { getAllParts } = require('../services/partService');

//api parts list ek 
router.get('/', (req, res) => {
  try {
    const parts = getAllParts();
    res.status(200).json({ 
      success: true, 
      data: parts 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
});

module.exports = router;