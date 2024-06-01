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
var server = net.createServer(function (connection) {
    console.log('client connected');

    connection.on('end', function () {
        console.log('client disconnected');
    });

    connection.write('Hello World!\r\n');
    connection.pipe(connection);
});

server.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`Received message: ${message}`);
    // broadcast(message, socket);
});

server.listen(8080, function () {
    console.log('server is listening');
});
