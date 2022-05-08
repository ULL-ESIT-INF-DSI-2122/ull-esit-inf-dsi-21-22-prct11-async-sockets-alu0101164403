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

  server.on('request', (info) => {
    // incializa tipo response
    const response: tipos.ResponseType = {
      type: 'add',
      success: true,
    };
    // comprobar si esxiste usuario
    const users: ManagementUsers = ManagementUsers.getManagerUser();

    const newUser: User = (users.include(info.user)) ? users.getUser(info.user) : new User(info.user);
    const management: ManagementNotes = new ManagementNotes(newUser);

    // evaluar opcion pasada por consola
    switch (info.type) {
      case 'add':
        if (true) {
          const note: Note = new Note(info.title, info.body, info.colour);
          response.success = management.addNote(note);
        }
        break;
      case 'remove':
        if (true) {
          const note: Note = newUser.getNote(info.title);
          response.success = management.removeNote(note);
        }
        break;
      case 'modify':
        if (true) {
          response.success = management.modifyNote(info.title, info.newTitle, info.body, info.colour);
        }
        break;
      case 'list':
        if (true) {
          response.success = management.showTittlesNotes();
        }
        break;
      case 'read':
        if (true) {
          const note: Note = newUser.getNote(info.title);
          response.success = management.showNote(note);
        }
        break;
      default:
        console.log('No introdujo una opcion valida.');
        break;
    }
  });

  connection.on('close', () => {
    console.log('Se desconecto el cliente.');
  });

  connection.on('error', (err) => {
    console.log(err.message);
  });
}).listen(60300, () => {
  console.log('El servidor esta conectado al puerto 60300.');
});
