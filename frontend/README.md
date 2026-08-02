# Frontend — Reserva de Salas de Reunião

Interface em React + Vite para consumir a [API de reserva de salas](../README.md): agenda semanal por sala e listagem/criação de reservas.

Estilizada com [Tailwind CSS](https://tailwindcss.com/) e componentes do [coss ui](https://coss.com/ui) (baseados em [Base UI](https://base-ui.com/)).

## Como rodar

```bash
cp .env.example .env
npm install
npm run dev
```

Abre em `http://localhost:5173`. A API precisa estar rodando em `http://localhost:3000` (ver README na raiz do projeto).

A URL da API é configurável via variável de ambiente `VITE_API_URL` (arquivo `.env`, veja `.env.example`).

## Telas

- **Agenda**: grade semanal por sala (abas para trocar de sala, navegação entre semanas). Horários ocupados mostram host + horário (clique para ver detalhes); horários livres e futuros são clicáveis e abrem um formulário rápido de reserva já preenchido com sala/data/hora; horários passados ficam esmaecidos.
- **Reservas**: formulário completo de criação + tabela com todas as reservas. As salas aparecem em cards agrupados por tamanho (pequenas/grandes), com badge de disponibilidade em tempo real ("Livre agora" / "Ocupada até HH:mm") calculada a partir das reservas existentes; clicar seleciona instantaneamente (sem modal) e atualiza um painel fixo com a foto e os detalhes da sala escolhida.

## Estrutura

```
src/
  api/
    client.js               # wrapper de fetch com tratamento de erro/status
    rooms.js                 # chamada GET /salas
    reservations.js          # chamadas GET/POST /reservas
  components/
    ui/                       # componentes do coss ui (button, card, dialog, badge, toast, table, tabs, popover, etc.)
    RoomPicker.jsx            # cards de sala agrupados por tamanho, com disponibilidade e painel fixo de detalhe
    ReservationForm.jsx       # formulário de criação de reserva
    ReservationList.jsx       # tabela com as reservas existentes
    WeekAgenda.jsx             # agenda semanal por sala (grade de horários ocupados/livres)
    QuickReservationDialog.jsx # dialog de criação rápida a partir de um horário clicado na agenda
  lib/
    utils.js                  # helper do coss ui (cn)
    roomImages.js              # foto de placeholder por sala (picsum.photos, seed fixo por id)
    roomAvailability.js         # calcula "Livre agora" / "Ocupada até HH:mm" a partir das reservas
    dates.js                    # helpers de semana/horário usados pela agenda
  App.jsx                      # abas Agenda/Reservas + ToastProvider
```

## Fotos das salas

Como as salas são fictícias, as fotos usadas são placeholders do [Picsum](https://picsum.photos/), com um "seed" fixo por `roomId` — a mesma sala sempre mostra a mesma foto. Para usar fotos reais, troque a lógica em `src/lib/roomImages.js`.

## Adicionando mais componentes do coss ui

```bash
npx shadcn@latest add @coss/<componente>
```

Isso baixa o componente para `src/components/ui/`.
