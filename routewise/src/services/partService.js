const { spareParts } = require('../data/store');

//okkom parts run nkaranava 
function getAllParts() {
  return spareParts.map(part => ({
    ...part,
    availableStock: part.stock - part.reservedQuantity
  }));
}

//Job ekak hariyata assign unata passe parts reserve karanv
function reserveParts(requiredParts) {
  for (let reqPart of requiredParts) {
    let part = spareParts.find(p => p.id === reqPart.partId);
    if (part) {
      part.reservedQuantity += reqPart.quantity;
      if (part.reservedQuantity > part.stock) {
        part.reservedQuantity = part.stock;
      }
    }
  }
}

// Job ekak CANCELLED unama reserve karapu parts ayeth release karanv
function releaseParts(requiredParts) {
  for (let reqPart of requiredParts) {
    let part = spareParts.find(p => p.id === reqPart.partId);
    if (part) {
      part.reservedQuantity -= reqPart.quantity;
      if (part.reservedQuantity < 0) {
        part.reservedQuantity = 0;
      }
    }
  }
}

module.exports = { getAllParts, reserveParts, releaseParts };