#! /usr/bin/env node
import { program } from 'commander';
const conf = new (require('conf'))();
console.log(program);

//Create connection/room
program.command('init').description('Create chat room').action(init);
