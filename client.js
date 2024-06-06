var net = require('net');
const readline = require('readline');
const chalk = require('chalk');

let sync = false;

//get ip address of the server

var client = net.connect({ port: 8080 }, function () {
    // const client = net.connect({ host: 'PUBLIC_IP_ADDRESS', port: 3000 }, () => {
    console.log(chalk.green.bold('connected to server!'));
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

client.on('data', function (data) {
    console.log(sync);
    if (sync !== true) {
        console.log('1st console:', sync);
        console.log(chalk.yellow.bold(`Received message: ${data.toString()}`));
    } else {
        sync = false;
    }
    // process.stdout.write(data.toString() + '\n');
});

client.on('end', function () {
    console.log(chalk.red.bold('disconnected from server'));
});

rl.on('line', (input) => {
    client.write(input);
    sync = true;
});
