# Deno WebSocket Server

This is a simple WebSocket server built with Deno and the websocket module. The server listens for incoming WebSocket connections on port 8080 and echos back any message received from clients.

# Requirements

Deno version 1.17.0 or later

# Getting Started
Clone this repository to your local machine

Start server locally:

```bash
deno run --allow-net server.ts
```

or via Docker:

```bash
docker-compose up -d
```

# Testing

```bash
deno test --allow-net tests/index.ts
```

Expected

```bash
Check file:///study/deno-websockets/tests/index.ts
running 1 test from ./tests/index.ts
WebSocketServer - send and receive message ... ok (38ms)

ok | 1 passed | 0 failed (63ms)
```

# License
This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as you see fit.