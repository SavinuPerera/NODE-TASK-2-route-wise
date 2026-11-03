const express = require("express");
const router = express.Router();
const service = require("../services/jobService");

router.get("/", function (req, res) {
  res.send(service.all());
});

router.get("/:id", function (req, res) {
  let job = service.one(req.params.id);
  if (!job) {
    return res.status(404).send("Job not found");
  }
  res.send(job);
});

router.post("/", function (req, res) {
  let b = req.body;

  if (!b.phone || !b.customerName || !b.address || !b.zone || !b.applianceType || !b.requiredSkill || !b.preferredDate || 
      !b.startTime || !b.durationMinutes) {
    return res.status(400).send("missing data");
  }

  if (b.durationMinutes < 30 || b.durationMinutes > 240) {
    return res.status(400).send("Invalid duration");
  }

  let newJob = service.add(b);
  res.status(201).send(newJob);
});

router.patch("/:id/status", function (req, res) {
  let job = service.one(req.params.id);
  if (!job) {
    return res.status(404).send("Job not found");
  }

  if (!req.body.status) {
    return res.status(400).send("Invalid status");
  }

  service.update(job, req.body.status);
  res.send(job);
});

module.exports = router;
