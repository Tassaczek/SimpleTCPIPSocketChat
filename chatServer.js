const net = require('net');

const clients = [];

const broadcast = (message, sender) => {
  clients.forEach((client) => {
    if (client === sender) return;
    client.write(message);
  });
};

const server = net.createServer((socket) => {
  console.log('New client connected');
  clients.push(socket);
  socket.write('Welcome to the chat!\n');

  socket.on('data', (data) => {
    broadcast(data, socket);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
    clients.splice(clients.indexOf(socket), 1);
    broadcast('A client has left the chat.\n', socket);
  });

  socket.on('error', (err) => {
    console.error(`Client error: ${err.message}`);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});