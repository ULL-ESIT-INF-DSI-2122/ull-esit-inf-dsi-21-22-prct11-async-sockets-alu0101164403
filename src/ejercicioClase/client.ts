import * as net from 'net';
import {EmitterClient} from './emitterClient';


// export const client = new EmitterClient(net.connect({port: 60300}));
const client = net.connect({port: 60300});

const datos: string[] = ['cat', 'index.md'];

client.on('data', (data) => {
  console.log(data.toString());
  client.write(datos);
});

client.on('end', () => {
  console.log('cliente desconectado');
});

