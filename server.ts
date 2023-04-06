import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const messagesHistory: any = []
const { OPENAPI_TOKEN } = config({ safe: true });
const wss = new WebSocketServer(8080);

wss.on("connection", function (ws: WebSocketClient) {
  ws.on("message", async function (message: string) {
    ws.send(JSON.stringify({ type: "action", data: 'writing' }));
    messagesHistory.push({"role": "user", content: message})
    const response = await getOpenApiResponse()
    setTimeout(() => {
      ws.send(JSON.stringify({ type: "message", data: response }));
    }, 2000)
  });
});

const getOpenApiResponse = async () => {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + OPENAPI_TOKEN,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messagesHistory,
        max_tokens: 256,
      })
    });
    
    const data = await res.json();
    const response = data.choices[0].message.content
    messagesHistory.push({"role": "system", content: response})

    return data.choices[0].message.content || 'I don\'t know what to say.';
  } catch (error) {
    return 'I don\'t know what to say.';
  }
}
