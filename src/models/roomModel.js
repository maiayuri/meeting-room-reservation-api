const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'data', 'rooms.seed.json');
const rooms = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

function findAll() {
  return rooms;
}

function findById(id) {
  return rooms.find((room) => room.id === String(id));
}

module.exports = {
  findAll,
  findById,
};
