let { jobs, newJobId } = require("../data/store");

function all(req, res) {
  res.send(jobs);
}

function one(req, res) {
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id == req.params.id) {
      return res.send(jobs[i]);
    }
  }
  res.status(404).send("not found");
}

function add(req, res) {
  let name = req.body.customerName;
  let phone = req.body.phone;
  let address = req.body.address;
  let zone = req.body.zone;
  let time = req.body.startTime;

  let date = req.body.preferredDate;
  let mins = req.body.durationMinutes;
  let item = req.body.applianceType;
  let skill = req.body.requiredSkill;
  let prio = req.body.priority;
  let parts = req.body.requiredParts || [];

  if (
    !name ||
    !phone ||
    !address ||
    !zone ||
    !item ||
    !skill ||
    !prio ||
    !date ||
    !time ||
    !mins
  ) {
    return res.status(400).send("missing data");
  }

  if (mins < 30 || mins > 240) {
    return res.status(400).send("wrong duration");
  }

  if (prio != "LOW" && prio != "NORMAL" && prio != "HIGH" && prio != "URGENT") {
    return res.status(400).send("wrong priority");
  }

  let checkThis = phone + item + date + time;
  for (let i = 0; i < jobs.length; i++) {
    let j = jobs[i];
    let alreadySaved =
      j.phone + j.applianceType + j.preferredDate + j.startTime;

    if (checkThis == alreadySaved) {
      return res.status(409).send("duplicate job");
    }
  }

  let newJob = {
    id: newJobId ? newJobId() : "JOB-100" + (jobs.length + 1),
    customerName: name,
    phone: phone,
    address: address,
    zone: zone,
    applianceType: item,
    requiredSkill: skill,
    priority: prio,
    preferredDate: date,
    startTime: time,
    durationMinutes: mins,
    requiredParts: parts,
    status: "PENDING",
    createdAt: "2026-11-03",
    assignedTechnicianId: null,
  };

  jobs.push(newJob);
  res.status(201).send(newJob);
}

function update(req, res) {
  let job = null;

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id == req.params.id) {
      job = jobs[i];
    }
  }

  if (!job) {
    return res.status(404).send("not found");
  }

  let oldS = job.status;
  let newS = req.body.status;

  if (oldS == "PENDING" && (newS == "ASSIGNED" || newS == "CANCELLED")) {
    job.status = newS;
    return res.send(job);
  }
  if (oldS == "ASSIGNED" && (newS == "ON-THE-WAY" || newS == "CANCELLED")) {
    job.status = newS;
    return res.send(job);
  }
  if (oldS == "ON-THE-WAY" && newS == "IN-PROGRESS") {
    job.status = newS;
    return res.send(job);
  }
  if (oldS == "IN-PROGRESS" && newS == "COMPLETED") {
    job.status = newS;
    return res.send(job);
  }

  res.status(400).send("cannot change status");
}

module.exports = { all, one, add, update };
