const roomModel = require('../models/roomModel');
const reservationModel = require('../models/reservationModel');

function getReservations(req, res) {
  try {
    const reservations = reservationModel.findAll();
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

function createReservation(req, res) {
  try {
    const { roomId, startDateTime, endDateTime, host } = req.body;

    if (!roomId || !startDateTime || !endDateTime || !host) {
      return res.status(400).json({
        message:
          'Campos obrigatórios ausentes. Informe roomId, startDateTime, endDateTime e host.',
      });
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Data inválida.' });
    }

    if (end <= start) {
      return res
        .status(400)
        .json({ message: 'A data/hora de término deve ser posterior à data/hora de início.' });
    }

    const room = roomModel.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada.' });
    }

    const conflict = reservationModel.hasConflict(String(roomId), start, end);
    if (conflict) {
      return res
        .status(409)
        .json({ message: 'Conflito de horário para a sala informada.' });
    }

    const reservation = reservationModel.create({
      roomId: String(roomId),
      startDateTime: start,
      endDateTime: end,
      host,
    });

    return res.status(201).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = {
  getReservations,
  createReservation,
};
