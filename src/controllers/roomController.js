const roomModel = require('../models/roomModel');

function getRooms(req, res, next) {
  try {
    const rooms = roomModel.findAll();
    return res.status(200).json(rooms);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getRooms,
};
