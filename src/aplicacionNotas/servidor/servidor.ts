import * as net from 'net';
import {EventEmitterServer} from './classServerEmitter';
import * as chalk from 'chalk';

net.createServer((connection) => {
  const server = new EventEmitterServer(connection);
  console.log(chalk.green('Se ha conectado el cliente.'));

}).listen(60300, () => {
  console.log(chalk.green('El servidor esta conectado al puerto 60300.'));
});
