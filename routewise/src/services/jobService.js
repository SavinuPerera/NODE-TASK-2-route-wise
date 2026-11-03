const store = require("../data/store");

function all() {
  return store.jobs;
}


function one(id) {
  for (let i = 0; i < store.jobs.length; i++) {
    if (store.jobs[i].id == id) {
      return store.jobs[i];
    }
  }
  return null;
}

function add(b) {
  let newJob = {
    id: store.newJobId ? store.newJobId() : "JOB-100" + (store.jobs.length + 1),
    customerName: b.customerName,
    phone: b.phone,
    address: b.address,
    zone: b.zone,
    applianceType: b.applianceType,
    requiredSkill: b.requiredSkill,
    priority: b.priority || "NORMAL",
    preferredDate: b.preferredDate,
    startTime: b.startTime,
    durationMinutes: b.durationMinutes,
    requiredParts: b.requiredParts || [],
    status: "PENDING",
    createdAt: "2026-11-03",
    assignedTechnicianId: null
  };

  store.jobs.push(newJob);
  return newJob;
}


function update(job, newStatus) {
  job.status = newStatus;
  return job;
}

module.exports = {
  all,
  one,
  add,
  update
};
