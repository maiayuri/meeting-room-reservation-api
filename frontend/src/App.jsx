import { useCallback, useEffect, useState } from 'react';
import { getRooms } from './api/rooms';
import { getReservations } from './api/reservations';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [reservationsError, setReservationsError] = useState(null);

  const loadReservations = useCallback(async () => {
    setLoadingReservations(true);
    setReservationsError(null);
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      setReservationsError('Não foi possível carregar as reservas.');
    } finally {
      setLoadingReservations(false);
    }
  }, []);

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch(() => setRooms([]));
    loadReservations();
  }, [loadReservations]);

  return (
    <main className="app">
      <h1>Reserva de Salas de Reunião</h1>

      <div className="layout">
        <ReservationForm rooms={rooms} onCreated={loadReservations} />
        <ReservationList
          reservations={reservations}
          rooms={rooms}
          loading={loadingReservations}
          error={reservationsError}
        />
      </div>
    </main>
  );
}

export default App;
