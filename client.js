var net = require('net');
const readline = require('readline');
const chalk = require('chalk');

//get ip address of the server
//each computer can set up its username
///messages come with the username "charles: i can see you bro"
//give special string for host connection
let clientId = 'crate111';

var client = net.connect({ port: 8080 }, function () {
    // const client = net.connect({ host: 'PUBLIC_IP_ADDRESS', port: 3000 }, () => {
    console.log(chalk.green.bold('connected to server!'));
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

client.on('data', function (data) {
    // Parse the received message
    // const message = JSON.parse(data.toString());
    const message = data.toString();
    const senderId = message.split(':');
    // Check if the message was sent by this client
    if (senderId[0] !== clientId) {
        console.log(`Received: ${message.text}`);
    }
    // console.log(chalk.yellow.bold(`Received message: ${data.toString()}`));
    // process.stdout.write(data.toString() + '\n');
});

client.on('end', function () {
    console.log(chalk.red.bold('disconnected from server'));
});

rl.on('line', (input) => {
    const message = `${clientId}:${input}`;

    // Send the message to the server
    client.write(message);
    // client.write(input);
});
