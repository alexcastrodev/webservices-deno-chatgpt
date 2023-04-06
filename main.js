const websocket = new WebSocket("ws://localhost:8080")

function createWebSocket() {
    websocket.onmessage = (message) => {
        const wsMessage = JSON.parse(message.data)
        if (wsMessage.type === 'message') {
            receiveMessageUi(wsMessage.data)
        }
    }
}
const messageTemplate = (message, isMine = false) => {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', isMine ? 'mine' : 'their');
    
    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.textContent = message;
    bubble.appendChild(messageEl);
    
    const timestampEl = document.createElement('div');
    timestampEl.classList.add('timestamp');
    timestampEl.textContent = new Date().toLocaleTimeString();
    bubble.appendChild(timestampEl);
    
    return bubble;
}

const handleSend = () => {
    const message = document.getElementById('message').value;
    document.getElementById('message').value = '';
    sendMessageUi(message)
    websocket.send(message)
}
const sendMessageUi = (message) => {
    const window = document.getElementById('chat-window');
    window.appendChild(messageTemplate(message, true));
}

const receiveMessageUi = (message) => {
    const window = document.getElementById('chat-window');
    window.appendChild(messageTemplate(message, false));
}

createWebSocket()

document.getElementById('message').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleSend()
    }
})

document.getElementById('send-cta').addEventListener('click', () => {
    handleSend()
})

// document.getElementById('message').addEventListener('keyup', (event) => {
//     if (event.key !== 'Enter') {
//         websocket.send(JSON.stringify({ type: 'action', data: 'typing' }))
//     }
// })

// on load document
