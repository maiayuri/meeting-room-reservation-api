import { useState } from 'react';
import { createReservation } from '../api/reservations';
import RoomPicker from './RoomPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toastManager } from '@/components/ui/toast';

const INITIAL_FORM = {
  roomId: '',
  startDateTime: '',
  endDateTime: '',
  host: '',
};

const ERROR_MESSAGES = {
  400: 'Verifique os campos: alguma informação obrigatória está ausente ou a data é inválida.',
  404: 'Sala não encontrada.',
  409: 'Já existe uma reserva para essa sala nesse horário.',
};

export default function ReservationForm({ rooms, reservations, onCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectRoom(roomId) {
    setForm((prev) => ({ ...prev, roomId }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createReservation({
        roomId: form.roomId,
        startDateTime: new Date(form.startDateTime).toISOString(),
        endDateTime: new Date(form.endDateTime).toISOString(),
        host: form.host,
      });
      toastManager.add({ title: 'Reserva criada com sucesso.', type: 'success' });
      setForm(INITIAL_FORM);
      onCreated();
    } catch (error) {
      const message = ERROR_MESSAGES[error.status] || 'Erro ao criar a reserva. Tente novamente.';
      toastManager.add({ title: message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label>Sala</Label>
            <RoomPicker
              rooms={rooms}
              reservations={reservations}
              selectedRoomId={form.roomId}
              onSelect={handleSelectRoom}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="host">Responsável</Label>
            <Input id="host" name="host" value={form.host} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="startDateTime">Início</Label>
              <Input
                id="startDateTime"
                name="startDateTime"
                type="datetime-local"
                value={form.startDateTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="endDateTime">Fim</Label>
              <Input
                id="endDateTime"
                name="endDateTime"
                type="datetime-local"
                value={form.endDateTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" loading={submitting} disabled={!form.roomId}>
            Criar reserva
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
