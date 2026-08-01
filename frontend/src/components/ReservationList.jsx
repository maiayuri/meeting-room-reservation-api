const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

function formatDate(isoString) {
  return dateFormatter.format(new Date(isoString));
}

export default function ReservationList({ reservations, rooms, loading, error }) {
  function roomName(roomId) {
    const room = rooms.find((item) => item.id === roomId);
    return room ? room.name : roomId;
  }

  return (
    <section className="reservation-list">
      <h2>Reservas</h2>

      {loading && <p>Carregando reservas...</p>}
      {error && <p className="feedback feedback--error">{error}</p>}

      {!loading && !error && reservations.length === 0 && <p>Nenhuma reserva cadastrada.</p>}

      {!loading && !error && reservations.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Sala</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{roomName(reservation.roomId)}</td>
                <td>{formatDate(reservation.startDateTime)}</td>
                <td>{formatDate(reservation.endDateTime)}</td>
                <td>{reservation.host}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
