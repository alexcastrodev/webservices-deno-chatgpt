import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { deferred } from "https://deno.land/std/async/mod.ts";

// This test assumes that the server is running at port 8080
Deno.test("WebSocketServer - send and receive message", async () => {
  // Create a new WebSocket client and connect to the server
  const ws = new WebSocket("ws://localhost:8080");
  const promise = deferred<string>();

  // Listen for messages from the server
  ws.onmessage = (event) => {
    promise.resolve(event.data);
  };

  // Send a message to the server
  ws.onopen = () => {
    ws.send(`Client says hello`)
    ws.close()
  }

  // Wait for the server to send a message back
  const message = await promise;
  assertEquals(message, JSON.stringify({"type":"action","data":"writing"}));
});