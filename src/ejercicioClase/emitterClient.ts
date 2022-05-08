import {EventEmitter} from 'events';

export class EmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
  }
}
