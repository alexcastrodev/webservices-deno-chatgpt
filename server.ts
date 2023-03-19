import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

const wss = new WebSocketServer(8080);

wss.on("connection", function (ws: WebSocketClient) {
  ws.on("message", function (message: string) {
    console.log('Server: ' + message);
    ws.send(message);
  });
});