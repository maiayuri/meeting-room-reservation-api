# Reserva de Salas de Reunião

Projeto com API (Node.js/Express, arquitetura MVC) e frontend (React + Vite + Tailwind + [coss ui](https://coss.com/ui)) para criação e listagem de reservas de salas de reunião.

- **API**: descrita neste README.
- **Frontend**: pasta [`frontend/`](frontend/), com seu próprio [README](frontend/README.md).

## Funcionalidades

- Criar uma reserva de sala
- Listar todas as reservas (com filtro opcional por sala)
- Listar as salas disponíveis

## Estrutura

```
server.js                      # inicializa o servidor
src/
  app.js                       # configuração do Express, Swagger, rotas e middlewares
  models/
    roomModel.js                # leitura das salas (seed)
    reservationModel.js         # armazenamento em memória e checagem de conflito de horário
  controllers/
    reservationController.js    # regras de validação e status codes das reservas
    roomController.js           # listagem de salas
  routes/
    reservationRoutes.js        # rotas de reservas + documentação Swagger (JSDoc)
    roomRoutes.js                # rota de salas + documentação Swagger (JSDoc)
  middlewares/
    errorHandler.js              # tratamento de erro centralizado e handler de rota 404
  config/
    swagger.js                  # schemas do Swagger (Room, Reservation, ReservationInput, Error)
  data/
    rooms.seed.json             # salas padrão (5 salas: 2 pequenas e 3 grandes)
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

### `GET /salas`

Lista as salas disponíveis para reserva.

| Status | Descrição |
|---|---|
| 200 | Lista de salas retornada com sucesso |
| 500 | Erro interno do servidor |

### `GET /reservas`

Lista todas as reservas. Aceita o parâmetro opcional `?roomId=` para filtrar por sala.

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

| id | name | size | capacity | location |
|---|---|---|---|---|
| 1 | Sala Alpha | pequena | 4 | 1º andar |
| 2 | Sala Beta | pequena | 4 | 1º andar |
| 3 | Sala Gamma | grande | 10 | 2º andar |
| 4 | Sala Delta | grande | 12 | 2º andar |
| 5 | Sala Épsilon | grande | 10 | 3º andar |

## Tratamento de erros

Requisições para rotas inexistentes retornam `404` com `{ "message": "Rota não encontrada." }`. Erros inesperados são capturados por um middleware central e retornam `500`.

## CORS

A API libera requisições de qualquer origem (via `cors`) para permitir o consumo pelo frontend em `http://localhost:5173` durante o desenvolvimento.

## Rodando API + Frontend juntos

```bash
# terminal 1 — API
npm install
npm start          # http://localhost:3000

# terminal 2 — frontend
cd frontend
npm install
npm run dev         # http://localhost:5173
```
