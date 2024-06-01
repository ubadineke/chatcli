var net = require('net');
const readline = require('readline');

let sync = false;

var client = net.connect({ port: 8080 }, function () {
    console.log('connected to server!');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>',
});

client.on('data', function (data) {
    if (sync !== true) {
        console.log(`Received message: ${data.toString()}`);
    } else {
        sync = false;
    }
    // process.stdout.write(data.toString() + '\n');
});

client.on('end', function () {
    console.log('disconnected from server');
});

rl.on('line', (input) => {
    client.write(input);
    sync = true;
});
