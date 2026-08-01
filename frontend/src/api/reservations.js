import request from './client';

export function getReservations(roomId) {
  const query = roomId ? `?roomId=${encodeURIComponent(roomId)}` : '';
  return request(`/reservas${query}`);
}

export function createReservation(payload) {
  return request('/reservas', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
