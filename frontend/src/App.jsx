import { useCallback, useEffect, useState } from 'react';
import { getRooms } from './api/rooms';
import { getReservations } from './api/reservations';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import WeekAgenda from './components/WeekAgenda';
import { ToastProvider } from '@/components/ui/toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
    <ToastProvider>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-8 font-heading text-3xl font-semibold text-foreground">
          Reserva de Salas de Reunião
        </h1>

        <Tabs defaultValue="agenda">
          <TabsList>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="reservas">Reservas</TabsTrigger>
          </TabsList>

          <TabsContent value="agenda" className="mt-4">
            <WeekAgenda rooms={rooms} reservations={reservations} onCreated={loadReservations} />
          </TabsContent>

          <TabsContent value="reservas" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-start">
              <ReservationForm rooms={rooms} reservations={reservations} onCreated={loadReservations} />
              <ReservationList
                reservations={reservations}
                rooms={rooms}
                loading={loadingReservations}
                error={reservationsError}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </ToastProvider>
  );
}

export default App;
