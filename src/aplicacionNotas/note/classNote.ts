import {Colour} from './classColor';
import {NoteType} from '../tiposJSON';

export class Note {
  constructor(private title: string, private body: string, private colour: Colour) {
  }

  // GETTERS
  public getTitle(): string {
    return this.title;
  }
  public getBody(): string {
    return this.body;
  }
  public getColour(): Colour {
    return this.colour;
  }
  // SETTERS
  public setTitle(newTitle: string): void {
    this.title = newTitle;
  }
  public setBody(newBody: string): void {
    this.body = newBody;
  }
  public setColour(newColour: Colour): void {
    this.colour = newColour;
  }
  // SHOW INFO NOTE
  public showInfo(): string {
    const info: string = `-Titulo: ${this.title}\n-Cuerpo: ${this.body}\n-Color: ${this.colour.getColour()}`;
    console.log(info);
    return info;
  }
  // DESERIALIZE
  public static deserialize(infoNote: NoteType) {
    return new Note(infoNote.title, infoNote.body, infoNote.colour);
  }
}
