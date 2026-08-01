import request from './client';

export function getRooms() {
  return request('/salas');
}
