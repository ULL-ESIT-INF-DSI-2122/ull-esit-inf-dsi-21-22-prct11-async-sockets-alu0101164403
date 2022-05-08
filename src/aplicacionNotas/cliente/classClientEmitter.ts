import {EventEmitter} from 'events';

// emite evento 'message'
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
