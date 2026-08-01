# API de Reserva de Salas de Reunião

API simples para criação e listagem de reservas de salas de reunião, construída em Node.js/Express seguindo arquitetura MVC.

## Funcionalidades

- Criar uma reserva de sala
- Listar todas as reservas

## Estrutura

```
server.js                      # inicializa o servidor
src/
  app.js                       # configuração do Express, Swagger e rotas
  models/
    roomModel.js                # leitura das salas (seed)
    reservationModel.js         # armazenamento em memória e checagem de conflito de horário
  controllers/
    reservationController.js    # regras de validação e status codes
  routes/
    reservationRoutes.js        # rotas + documentação Swagger (JSDoc)
  config/
    swagger.js                  # schemas do Swagger (Room, Reservation, ReservationInput, Error)
  data/
    rooms.seed.json             # salas padrão (Sala Alpha e Sala Beta)
```

## Como rodar

```bash
npm install
npm start
```

Para desenvolvimento com auto-reload:

```bash
npm run dev
```

O servidor sobe em `http://localhost:3000`.

## Documentação (Swagger)

Acesse `http://localhost:3000/api-docs` para a documentação interativa, com os schemas de entrada/saída e a possibilidade de testar os endpoints direto pelo navegador.

## Endpoints

### `GET /reservas`

Lista todas as reservas.

| Status | Descrição |
|---|---|
| 200 | Lista de reservas retornada com sucesso |
| 500 | Erro interno do servidor |

### `POST /reservas`

Cria uma nova reserva.

**Corpo da requisição:**

```json
{
  "roomId": "1",
  "startDateTime": "2026-08-05T14:00:00.000Z",
  "endDateTime": "2026-08-05T15:00:00.000Z",
  "host": "Nome do responsável"
}
```

**Resposta (201):**

```json
{
  "id": "uuid-gerado",
  "roomId": "1",
  "startDateTime": "2026-08-05T14:00:00.000Z",
  "endDateTime": "2026-08-05T15:00:00.000Z",
  "host": "Nome do responsável"
}
```

| Status | Descrição |
|---|---|
| 201 | Reserva criada com sucesso |
| 400 | Data inválida ou campo obrigatório ausente |
| 404 | Sala não encontrada |
| 409 | Conflito de horário |
| 500 | Erro interno do servidor |

## Salas padrão (seed)

| id | name | capacity | location |
|---|---|---|---|
| 1 | Sala Alpha | 8 | 1º andar |
| 2 | Sala Beta | 4 | 2º andar |
