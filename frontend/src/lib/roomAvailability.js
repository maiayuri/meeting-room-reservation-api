const timeFormatter = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' });

export function getRoomAvailability(roomId, reservations) {
  const now = new Date();
  const active = reservations.find(
    (reservation) =>
      reservation.roomId === roomId &&
      new Date(reservation.startDateTime) <= now &&
      new Date(reservation.endDateTime) > now
  );

  if (!active) {
    return { available: true, label: 'Livre agora' };
  }

  return {
    available: false,
    label: `Ocupada até ${timeFormatter.format(new Date(active.endDateTime))}`,
  };
}
