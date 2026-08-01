const { randomUUID } = require('crypto');

const reservations = [];

function findAll() {
  return reservations;
}

function hasConflict(roomId, startDateTime, endDateTime) {
  return reservations.some((reservation) => {
    if (reservation.roomId !== roomId) return false;
    return (
      new Date(reservation.startDateTime) < endDateTime &&
      new Date(reservation.endDateTime) > startDateTime
    );
  });
}

function create({ roomId, startDateTime, endDateTime, host }) {
  const reservation = {
    id: randomUUID(),
    roomId,
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
    host,
  };
  reservations.push(reservation);
  return reservation;
}

module.exports = {
  findAll,
  hasConflict,
  create,
};
