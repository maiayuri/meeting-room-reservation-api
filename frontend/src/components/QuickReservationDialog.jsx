import { useEffect, useState } from 'react';
import { createReservation } from '../api/reservations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toastManager } from '@/components/ui/toast';

const ERROR_MESSAGES = {
  400: 'Verifique os campos: alguma informação obrigatória está ausente ou a data é inválida.',
  404: 'Sala não encontrada.',
  409: 'Já existe uma reserva para essa sala nesse horário.',
};

function toLocalInputValue(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function QuickReservationDialog({ open, onOpenChange, room, slot, onCreated }) {
  const [host, setHost] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && slot) {
      const start = new Date(slot.day);
      start.setHours(slot.hour, 0, 0, 0);
      const end = new Date(start);
      end.setHours(start.getHours() + 1);
      setStartDateTime(toLocalInputValue(start));
      setEndDateTime(toLocalInputValue(end));
      setHost('');
    }
  }, [open, slot]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!room) return;
    setSubmitting(true);
    try {
      await createReservation({
        roomId: room.id,
        startDateTime: new Date(startDateTime).toISOString(),
        endDateTime: new Date(endDateTime).toISOString(),
        host,
      });
      toastManager.add({ title: 'Reserva criada com sucesso.', type: 'success' });
      onCreated();
    } catch (error) {
      const message = ERROR_MESSAGES[error.status] || 'Erro ao criar a reserva. Tente novamente.';
      toastManager.add({ title: message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova reserva</DialogTitle>
            <DialogDescription>{room?.name}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 px-6 pb-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="quick-host">Responsável</Label>
              <Input
                id="quick-host"
                value={host}
                onChange={(event) => setHost(event.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="quick-start">Início</Label>
                <Input
                  id="quick-start"
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(event) => setStartDateTime(event.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="quick-end">Fim</Label>
                <Input
                  id="quick-end"
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(event) => setEndDateTime(event.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" loading={submitting}>
              Criar reserva
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
