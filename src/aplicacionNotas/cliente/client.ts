import * as yargs from 'yargs';
import {Colour} from '../note/classColor';
import * as net from 'net';
// import {EventEmitterClient} from './classClientEmitter';
import {RequestType} from '../tiposJSON';
// import {readline} from 'readline-sync';


const client = net.connect({port: 60300});
// const socket = new EventEmitterClient(client);

yargs.command({
  command: 'add',
  describe: 'Add a new note.',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title:',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body:',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note colour:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const colour: Colour = new Colour(argv.color);
      const request: RequestType = {
        type: 'add',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: colour,
      };
      // pasa los datos al servidor
      client.write(JSON.stringify(request) + '\n');
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List notes from user',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const request: RequestType = {
        type: 'list',
        user: argv.user,
      };
      client.write(JSON.stringify(request) + '\n');
    }
  },
});

yargs.command({
  command: 'read',
  describe: 'Read note',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      const request: RequestType = {
        type: 'read',
        user: argv.user,
        title: argv.title,
      };
      client.write(JSON.stringify(request) + '\n');
    }
  },
});

yargs.command({
  command: 'remove',
  describe: 'Delete note.',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const request: RequestType = {
        type: 'add',
        user: argv.user,
        title: argv.title,
      };
      client.write(JSON.stringify(request) + '\n');
    }
  },
});

yargs.parse();
/*
client.on('connect', () => {
  sendLine();
});

export function sendLine() {
  const line = readline.question('\nPuede introducir mas comandos\nCon enter termina el programa.\n');
  if (line == '\n') {
    client.end();
  }
}
*/
client.on('error', (err) => {
  console.log(err.message);
});
