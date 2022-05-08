# PRÁCTICA 11. CLIENTE Y SERVIDOR PARA UNA APLICACIÓN DE PROCESAMIENTO DE NOTAS DE TEXTO

Asignatura: Desarrollo de sistemas informáticos

Curso: 3º, 2021/22

Ainoa Iglesias Dasilva, alu0101164403@ull.edu.es


## PASOS SEGUIDOS

El programa se divide en 3 partes: Cliente, servidor y funcionalidad de las notas/usuarios.

### Types

- RequestTypes: es un tipo de datos el cual contendrá la información que se recoja con yargs en la linea de comandos guardandolo en un JSON y contiene un type para indicar la operación que se quiere realizar.

```ts
export type RequestType = {
  type: 'add' | 'modify' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: Colour;
}
```

- ResponseTypes: es un tipo de datos con el que se guardará en un JSON la operación que se esta realizando, si ha sido existoso o no y opcionalmente un conjunto de notas.

```ts
export type ResponseType = {
  type: 'add' | 'modify' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
}
```

### Servidor

- clase EventEmitterServer: esta clase hereda de EventEmitter y es la encargada de emitir un 'message' y un objeto creado a partir de un JSON con los datos guardados en un tipo ResponseType.

```ts
export class EventEmitterServer extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    connection.on('data', (data) => {
      wholeData += data;
      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('message', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}
```

- servidor: aqui se crea el socket para el servidor, recibe la información del cliente con tipo de operacion, nombre del usuario y datos necesarios de la nota. Se comprueba que exista el usuario por si hay que crearlo, luego en el switch se comprueba que operación se quiere realizar y se llama el método necesario comprobando si fue exitoso o no y se envia la respuesta al cliente con 'write' con el texto en un JSON.

```ts
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
```

### Cliente

- clase EventEmitterClient: esta clase pasa el json a un objetod para poder leer los datos.

```ts
export class EventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    connection.on('data', (data) => {
      wholeData += data.toString();
    });
    connection.on('end', () => {
      this.emit('message', JSON.parse(wholeData));
    });
  }
}
```

- client: el cliente se encarga de leer los datos pasados por la consola con yargs. Usando el tipo ReqestType se pasan los datos con 'write' al servidor.

```ts
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

...

client.on('error', (err) => {
  console.log(err.message);
});
```

### Notas

La diferencia respecto a la ptáctica 9 es que los métodos addNote, removeMote, modifyNote, listTitle y readNote devuelven un booleano para indicar al tipo Response en su atributo success si se ha realizado la operación con exito (true) o no (false).

### Ejemplos de uso
