import { useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  HOURS,
  addDays,
  formatDayLabel,
  formatDayNumber,
  formatWeekRange,
  getWeekDays,
  isSameDay,
  slotDateTime,
} from '@/lib/dates';
import QuickReservationDialog from './QuickReservationDialog';

const timeFormatter = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' });

export default function WeekAgenda({ rooms, reservations, onCreated }) {
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id ?? '');
  const [weekOffset, setWeekOffset] = useState(0);
  const [pendingSlot, setPendingSlot] = useState(null);

  const roomId = rooms.some((room) => room.id === selectedRoomId) ? selectedRoomId : rooms[0]?.id;

  const weekDays = useMemo(() => getWeekDays(addDays(new Date(), weekOffset * 7)), [weekOffset]);

  const roomReservations = useMemo(
    () => reservations.filter((reservation) => reservation.roomId === roomId),
    [reservations, roomId]
  );

  function findReservation(day, hour) {
    const slotStart = slotDateTime(day, hour);
    const slotEnd = slotDateTime(day, hour + 1);
    return roomReservations.find(
      (reservation) =>
        new Date(reservation.startDateTime) < slotEnd &&
        new Date(reservation.endDateTime) > slotStart
    );
  }

  if (!rooms.length) {
    return <p className="text-muted-foreground text-sm">Nenhuma sala cadastrada.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={roomId} onValueChange={setSelectedRoomId}>
        <TabsList className="flex-wrap">
          {rooms.map((room) => (
            <TabsTrigger key={room.id} value={room.id}>
              {room.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon-sm"
          type="button"
          onClick={() => setWeekOffset((week) => week - 1)}
          aria-label="Semana anterior"
        >
          <ChevronLeftIcon />
        </Button>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{formatWeekRange(weekDays)}</span>
          {weekOffset !== 0 && (
            <Button variant="link" size="sm" type="button" onClick={() => setWeekOffset(0)}>
              hoje
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon-sm"
          type="button"
          onClick={() => setWeekOffset((week) => week + 1)}
          aria-label="Próxima semana"
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <div className="grid min-w-[720px] grid-cols-[56px_repeat(7,1fr)]">
          <div className="border-r border-b" />
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                'border-r border-b p-2 text-center text-xs font-medium last:border-r-0',
                isSameDay(day, new Date()) && 'bg-accent'
              )}
            >
              <div className="capitalize text-muted-foreground">{formatDayLabel(day)}</div>
              <div>{formatDayNumber(day)}</div>
            </div>
          ))}

          {HOURS.map((hour) => (
            <div className="contents" key={hour}>
              <div className="flex items-start justify-end border-r border-b p-1 text-xs text-muted-foreground">
                {String(hour).padStart(2, '0')}:00
              </div>
              {weekDays.map((day) => {
                const reservation = findReservation(day, hour);
                const isPast = slotDateTime(day, hour) < new Date();

                return (
                  <div
                    key={`${day.toISOString()}-${hour}`}
                    className={cn(
                      'border-r border-b p-0.5 last:border-r-0',
                      isPast && !reservation && 'bg-muted/40'
                    )}
                  >
                    {reservation ? (
                      <Popover>
                        <PopoverTrigger className="flex h-12 w-full flex-col justify-center overflow-hidden rounded-md bg-primary/10 px-1.5 text-left text-[11px] leading-tight text-primary hover:bg-primary/16">
                          <span className="truncate font-medium">{reservation.host}</span>
                          <span className="truncate text-primary/70">
                            {timeFormatter.format(new Date(reservation.startDateTime))}–
                            {timeFormatter.format(new Date(reservation.endDateTime))}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent tooltipStyle>
                          <PopoverTitle className="text-sm">{reservation.host}</PopoverTitle>
                          <PopoverDescription>
                            {timeFormatter.format(new Date(reservation.startDateTime))} –{' '}
                            {timeFormatter.format(new Date(reservation.endDateTime))}
                          </PopoverDescription>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <button
                        type="button"
                        disabled={isPast}
                        onClick={() => setPendingSlot({ day, hour })}
                        className="h-12 w-full rounded-md transition-colors enabled:hover:bg-accent disabled:cursor-not-allowed"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <QuickReservationDialog
        open={Boolean(pendingSlot)}
        onOpenChange={(open) => !open && setPendingSlot(null)}
        room={rooms.find((room) => room.id === roomId)}
        slot={pendingSlot}
        onCreated={() => {
          setPendingSlot(null);
          onCreated();
        }}
      />
    </div>
  );
}
