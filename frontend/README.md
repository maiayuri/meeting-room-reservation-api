# Frontend — Reserva de Salas de Reunião

Interface em React + Vite para consumir a [API de reserva de salas](../README.md): criar reservas e listar as existentes.

## Como rodar

```bash
cp .env.example .env
npm install
npm run dev
```

Abre em `http://localhost:5173`. A API precisa estar rodando em `http://localhost:3000` (ver README na raiz do projeto).

A URL da API é configurável via variável de ambiente `VITE_API_URL` (arquivo `.env`, veja `.env.example`).

## Estrutura

```
src/
  api/
    client.js           # wrapper de fetch com tratamento de erro/status
    rooms.js             # chamada GET /salas
    reservations.js      # chamadas GET/POST /reservas
  components/
    ReservationForm.jsx  # formulário de criação de reserva
    ReservationList.jsx  # tabela com as reservas existentes
  App.jsx                # composição das telas
```
