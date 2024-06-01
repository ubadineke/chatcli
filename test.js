// const net = require('node:net');
// const server = net.createServer((c) => {
//     // 'connection' listener.
//     console.log('client connected');
//     c.on('end', () => {
//         console.log('client disconnected');
//     });
//     c.write('hello\r\n');
//     c.pipe(c);
// });
// server.on('error', (err) => {
//     throw err;
// });
// server.listen(8124, () => {
//     console.log('server bound');
// });

var net = require('net');
const readline = require('readline');

let clients = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>',
});

function broadcast(message, sender) {
    clients.forEach((client) => {
        if (client !== sender) {
            client.write(message);
        }
    });
}

var server = net.createServer(function (connection) {
    clients.push(connection);
    console.log('client connected');
    // console.log(socket.length);
    connection.on('data', (data) => {
        const message = data.toString().trim();
        console.log(`Received message: ${message}`);
        broadcast(message, server);
    });

    connection.on('end', function () {
        console.log('client disconnected');
    });

    connection.write('Welcome from Terminal 1!\r');
    connection.pipe(connection);
});

server.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`Received message: ${message}`);
    broadcast(message, server);
});

rl.on('line', (input) => {
    clients.forEach((client) => {
        if (!client.destroyed) {
            client.write(input);
        }
    });
    rl.prompt();
});

server.listen(8080, function () {
    console.log('Chat Room created');
});
