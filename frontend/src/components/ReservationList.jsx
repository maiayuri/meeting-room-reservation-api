import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { getRoomImageUrl } from '@/lib/roomImages';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

function formatDate(isoString) {
  return dateFormatter.format(new Date(isoString));
}

export default function ReservationList({ reservations, rooms, loading, error }) {
  function findRoom(roomId) {
    return rooms.find((room) => room.id === roomId);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {!loading && error && <p className="text-destructive text-sm">{error}</p>}

        {!loading && !error && reservations.length === 0 && (
          <p className="text-muted-foreground text-sm">Nenhuma reserva cadastrada.</p>
        )}

        {!loading && !error && reservations.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sala</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Responsável</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => {
                const room = findRoom(reservation.roomId);
                return (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={getRoomImageUrl(reservation.roomId, { width: 40, height: 40 })}
                          alt=""
                          className="size-7 rounded-md object-cover"
                        />
                        <span>{room ? room.name : reservation.roomId}</span>
                        {room && (
                          <Badge
                            variant={room.size === 'grande' ? 'default' : 'secondary'}
                            size="sm"
                          >
                            {room.size}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(reservation.startDateTime)}</TableCell>
                    <TableCell>{formatDate(reservation.endDateTime)}</TableCell>
                    <TableCell>{reservation.host}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
