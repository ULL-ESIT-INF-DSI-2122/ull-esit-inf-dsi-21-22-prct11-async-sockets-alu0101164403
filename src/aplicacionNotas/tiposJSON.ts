import {Note} from './note/classNote';
import {Colour} from './note/classColor';

export type RequestType = {
  type: 'add' | 'modify' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: Colour;
}

export type ResponseType = {
  type: 'add' | 'modify' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
}

export interface NoteType {
  title: string,
  body: string,
  colour: Colour
}
