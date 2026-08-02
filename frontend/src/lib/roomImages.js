export function getRoomImageUrl(roomId, { width = 480, height = 320 } = {}) {
  return `https://picsum.photos/seed/room-${roomId}/${width}/${height}`;
}
