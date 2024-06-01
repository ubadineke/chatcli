var net = require('net');
const readline = require('readline');
var client = net.connect({ port: 8080 }, function () {
    console.log('connected to server!');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

client.on('data', function (data) {
    console.log(data.toString());
    // client.end();
});

client.on('end', function () {
    console.log('disconnected from server');
});

rl.on('line', (input) => {
    client.write(input);
});
