const technicians = [
  { id: 'T001', name: 'Kasun', skills: ['AC', 'Electrical'], zone: 'NEGOMBO', availableFrom: '08:00', availableTo: '17:00', maxJobsPerDay: 4, assignedJobIds: [], unavailableSlots: [] },
  { id: 'T002', name: 'Nadeesha', skills: ['Refrigerator', 'Electrical'], zone: 'NEGOMBO', availableFrom: '09:00', availableTo: '18:00', maxJobsPerDay: 3, assignedJobIds: [], unavailableSlots: [] },
  { id: 'T003', name: 'Ruwan', skills: ['AC', 'WashingMachine'], zone: 'WATTALA', availableFrom: '08:00', availableTo: '17:00', maxJobsPerDay: 4, assignedJobIds: [], unavailableSlots: [] },
  { id: 'T004', name: 'Imesh', skills: ['AC', 'Refrigerator', 'WashingMachine'], zone: 'NEGOMBO', availableFrom: '08:00', availableTo: '16:00', maxJobsPerDay: 5, assignedJobIds: [], unavailableSlots: [] },
];

const jobs = [];

const parts = [
  { id: 'SP001', name: 'AC Filter', compatibleAppliances: ['AC'], stock: 10, reservedQuantity: 2, unitPrice: 1500 },
  { id: 'SP002', name: 'Refrigerator Relay', compatibleAppliances: ['Refrigerator'], stock: 4, reservedQuantity: 1, unitPrice: 2200 },
  { id: 'SP003', name: 'Washing Machine Belt', compatibleAppliances: ['WashingMachine'], stock: 2, reservedQuantity: 0, unitPrice: 1800 },
];

let lastJobNumber = 1000;

function newJobId() {
  lastJobNumber += 1;
  return 'JOB-' + lastJobNumber;
}

module.exports = { technicians, jobs, parts, newJobId };
