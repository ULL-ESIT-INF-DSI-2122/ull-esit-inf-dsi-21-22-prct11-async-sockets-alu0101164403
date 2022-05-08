import * as net from 'net';
import {EventEmitterServer} from './classServerEmitter';
// import * as chalk from 'chalk';
import {ManagementUsers} from '../note/classManagementUsers';
import {User} from '../note/classUser';
import {ManagementNotes} from '../note/classManagementNotes';
import * as tipos from '../tiposJSON';
import {Note} from '../note/classNote';

net.createServer((connection) => {
  const server = new EventEmitterServer(connection);
  console.log('Se ha conectado el cliente.');

  server.on('data', (info) => {
    // comprobar si esxiste usuario
    const users: ManagementUsers = ManagementUsers.getManagerUser();

    const newUser: User = (users.include(info.user)) ? users.getUser(info.user) : new User(info.user);
    const management: ManagementNotes = new ManagementNotes(newUser);

    // evaluar opcion pasada por consola
    switch (info.type) {
      case 'add':
        if (true) {
          const note: Note = new Note(info.title, info.body, info.colour);
          const success: boolean = management.addNote(note);
          const response: tipos.ResponseType = {
            type: 'add',
            success: success,
          };
          connection.write(JSON.stringify(response));
        }
        break;
      case 'remove':
        if (true) {
          const note: Note = newUser.getNote(info.title);
          const success: boolean = management.removeNote(note);
          const response: tipos.ResponseType = {
            type: 'remove',
            success: success,
          };
          connection.write(JSON.stringify(response));
        }
        break;
      case 'modify':
        if (true) {
          const success: boolean = management.modifyNote(info.title, info.newTitle, info.body, info.colour);
          const response: tipos.ResponseType = {
            type: 'modify',
            success: success,
          };
          connection.write(JSON.stringify(response));
        }
        break;
      case 'list':
        if (true) {
          const success: boolean = management.showTittlesNotes();
          const response: tipos.ResponseType = {
            type: 'list',
            success: success,
          };
          connection.write(JSON.stringify(response));
        }
        break;
      case 'read':
        if (true) {
          const note: Note = newUser.getNote(info.title);
          const success: boolean = management.showNote(note);
          const response: tipos.ResponseType = {
            type: 'read',
            success: success,
          };
          connection.write(JSON.stringify(response));
        }
        break;
      default:
        console.log('No introdujo una opcion valida.');
        break;
    }

    connection.on('close', () => {
      console.log('Se desconecto el cliente.');
    });

    connection.on('error', (err) => {
      console.log(err.message);
    });
    connection.end();
  });
}).listen(60300, () => {
  console.log('El servidor esta conectado al puerto 60300.');
});
