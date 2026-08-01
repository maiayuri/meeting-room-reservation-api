import { useState } from 'react';
import { createReservation } from '../api/reservations';

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

export default function ReservationForm({ rooms, onCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      await createReservation({
        roomId: form.roomId,
        startDateTime: new Date(form.startDateTime).toISOString(),
        endDateTime: new Date(form.endDateTime).toISOString(),
        host: form.host,
      });
      setFeedback({ type: 'success', message: 'Reserva criada com sucesso.' });
      setForm(INITIAL_FORM);
      onCreated();
    } catch (error) {
      const message = ERROR_MESSAGES[error.status] || 'Erro ao criar a reserva. Tente novamente.';
      setFeedback({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2>Nova reserva</h2>

      <label htmlFor="roomId">Sala</label>
      <select id="roomId" name="roomId" value={form.roomId} onChange={handleChange} required>
        <option value="" disabled>
          Selecione uma sala
        </option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name} ({room.size}, {room.capacity} lugares)
          </option>
        ))}
      </select>

      <label htmlFor="host">Responsável</label>
      <input
        id="host"
        name="host"
        type="text"
        value={form.host}
        onChange={handleChange}
        required
      />

      <label htmlFor="startDateTime">Início</label>
      <input
        id="startDateTime"
        name="startDateTime"
        type="datetime-local"
        value={form.startDateTime}
        onChange={handleChange}
        required
      />

      <label htmlFor="endDateTime">Fim</label>
      <input
        id="endDateTime"
        name="endDateTime"
        type="datetime-local"
        value={form.endDateTime}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Criando...' : 'Criar reserva'}
      </button>

      {feedback && <p className={`feedback feedback--${feedback.type}`}>{feedback.message}</p>}
    </form>
  );
}
