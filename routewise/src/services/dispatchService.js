// Member 5 - Pabasara Senevirathne

// Shared data file imported from your database store
const { technicians, jobs } = require('../data/store');

// Job ekata suitable technician kenek hoyala assign karanawa
function autoAssignJob(jobId) {

  // Step 1: Find the job in the array using a basic loop
  let job = null;

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id === jobId) {
      job = jobs[i];
      break;
    }
  }

  // If job is not found, return an error object
  if (!job) {
    return {
      success: false,
      statusCode: 404,
      message: 'Job not found.',
    };
  }

  // Step 2: Find technicians matching Zone and Skill
  let eligibleTechs = [];

  for (let i = 0; i < technicians.length; i++) {
    let tech = technicians[i];

    let isZoneMatch = tech.zone === job.zone;
    let hasRequiredSkill = tech.skills.includes(job.requiredSkill);

    if (isZoneMatch && hasRequiredSkill) {
      eligibleTechs.push(tech);
    }
  }

  // If no suitable technician is found
  if (eligibleTechs.length === 0) {
    return {
      success: false,
      statusCode: 400,
      message: 'No eligible technician found for this job.',
    };
  }

  // Step 3: Calculate score for eligible technicians
  let bestTechnician = null;
  let highestScore = -1;

  for (let i = 0; i < eligibleTechs.length; i++) {
    let tech = eligibleTechs[i];
    let score = 0;

    // Zone matches job zone (+40 points)[span_3](start_span)[span_3](end_span)
    if (tech.zone === job.zone) {
      score += 40;
    }

    // Has exact required skill (+30 points)[span_4](start_span)[span_4](end_span)
    if (tech.skills.includes(job.requiredSkill)) {
      score += 30;
    }

    // Select the one with the highest score
    if (score > highestScore) {
      highestScore = score;
      bestTechnician = tech;
    }
  }

  // Step 4: Assign the job to the technician
  job.assignedTechnicianId = bestTechnician.id;
  job.status = 'ASSIGNED';

  // Return success results
  return {
    success: true,
    jobId: job.id,
    assignedTechnician: bestTechnician.name,
    assignedTechnicianId: bestTechnician.id,
    score: highestScore,
  };
}

module.exports = {
  autoAssignJob,
};