import * as net from 'net';
import {client} from './client';


export const server = net.createServer((connection) => {
  console.log('Hay conexion');
  client.on('data', (data) => {
    // console.log(data.toString());
  });
}).listen(60300, () => {
  console.log('esperando conexion del cliente');
});
