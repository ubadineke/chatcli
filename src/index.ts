#! /usr/bin/env node
import { program } from 'commander';

// console.log(program);

//Create connection/room
program.command('init').description('Create chat room').action(init);
