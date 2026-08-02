import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getRoomImageUrl } from '@/lib/roomImages';
import { getRoomAvailability } from '@/lib/roomAvailability';

function AvailabilityBadge({ availability, className }) {
  return (
    <Badge variant={availability.available ? 'success' : 'secondary'} size="sm" className={className}>
      {availability.label}
    </Badge>
  );
}

function RoomCard({ room, reservations, selected, onSelect }) {
  const availability = getRoomAvailability(room.id, reservations);

  return (
    <button type="button" onClick={() => onSelect(room.id)} className="text-left">
      <Card
        className={cn(
          'gap-0 overflow-hidden p-0 transition-shadow hover:shadow-md',
          selected && 'ring-2 ring-primary'
        )}
      >
        <div className="relative">
          <img
            src={getRoomImageUrl(room.id)}
            alt={room.name}
            className="h-20 w-full object-cover"
            loading="lazy"
          />
          <AvailabilityBadge availability={availability} className="absolute top-1.5 right-1.5" />
        </div>
        <CardHeader className="gap-1 p-3">
          <CardTitle className="text-sm">{room.name}</CardTitle>
          <CardDescription className="flex items-center gap-1.5 text-xs">
            <Badge variant={room.size === 'grande' ? 'default' : 'secondary'} size="sm">
              {room.size}
            </Badge>
            {room.capacity} lugares
          </CardDescription>
        </CardHeader>
      </Card>
    </button>
  );
}

function RoomSection({ title, rooms, reservations, selectedRoomId, onSelect }) {
  if (!rooms.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            reservations={reservations}
            selected={selectedRoomId === room.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default function RoomPicker({ rooms, reservations, selectedRoomId, onSelect }) {
  useEffect(() => {
    if (!selectedRoomId && rooms.length) {
      onSelect(rooms[0].id);
    }
  }, [selectedRoomId, rooms, onSelect]);

  const smallRooms = rooms.filter((room) => room.size !== 'grande');
  const largeRooms = rooms.filter((room) => room.size === 'grande');
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);
  const selectedAvailability = selectedRoom
    ? getRoomAvailability(selectedRoom.id, reservations)
    : null;

  return (
    <div className="flex flex-col gap-4">
      <RoomSection
        title="Salas pequenas"
        rooms={smallRooms}
        reservations={reservations}
        selectedRoomId={selectedRoomId}
        onSelect={onSelect}
      />
      <RoomSection
        title="Salas grandes"
        rooms={largeRooms}
        reservations={reservations}
        selectedRoomId={selectedRoomId}
        onSelect={onSelect}
      />

      {selectedRoom && (
        <Card className="flex-row gap-0 overflow-hidden p-0">
          <img
            src={getRoomImageUrl(selectedRoom.id, { width: 200, height: 200 })}
            alt={selectedRoom.name}
            className="h-28 w-28 shrink-0 object-cover"
          />
          <CardHeader className="flex-1 gap-1.5 p-3">
            <CardTitle className="text-base">{selectedRoom.name}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-1.5 text-xs">
              <Badge variant={selectedRoom.size === 'grande' ? 'default' : 'secondary'} size="sm">
                {selectedRoom.size}
              </Badge>
              <span>{selectedRoom.capacity} lugares</span>
              <span>· {selectedRoom.location}</span>
            </CardDescription>
            <AvailabilityBadge availability={selectedAvailability} className="mt-1 w-fit" />
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
