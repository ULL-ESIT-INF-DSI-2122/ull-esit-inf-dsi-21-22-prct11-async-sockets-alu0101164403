import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {server} from '../../src/ejercicioClase/server';
import {client} from '../../src/ejercicioClase/clientr';

describe('Test de cliente-servidor', () => {
  it('Se comprueba que el cliente recibe argumentos por la consola', () => {
    const socket = new EventEmitter();
    // const client = 
  });
});
