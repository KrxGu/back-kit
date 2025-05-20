#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .scriptName('my-cli')
  .usage('$0 <command> [args]')
  .command(
    'hello [name]',
    'print hello message',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        default: 'world',
        describe: 'the name to say hello to'
      });
    },
    (argv) => {
      console.log(`Hello, ${argv.name}!`);
    }
  )
  .help()
  .argv;
