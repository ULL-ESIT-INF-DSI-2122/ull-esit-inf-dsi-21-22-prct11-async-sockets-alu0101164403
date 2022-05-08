import {Note} from './classNote';
import chalk from 'chalk';

export class User {
  private listNotes: Set<Note> = new Set([]);

  constructor(private userName: string, listNotes?: Set<Note>) {
    if (listNotes) {
      this.listNotes = listNotes;
    }
    // comprobar si ya existe
  }

  // GETTERS
  public getUserName(): string {
    return this.userName;
  }
  public getListNotes(): Set<Note> {
    return this.listNotes;
  }
  public getTitlesNotes(): string[] {
    const arrayNotes: Note[] = Array.from(this.listNotes);
    if (arrayNotes.length > 0) {
      return arrayNotes.map((note) => note.getTitle());
    } else {
      return [];
    }
  }
  public getNote(titleNote: string): Note {
    const arrayNotes: Note[] = Array.from(this.listNotes);
    const note: Note | undefined = arrayNotes.find((note) => note.getTitle() === titleNote);
    if (note !== undefined) {
      return note;
    } else {
      throw Error(chalk.red(`La nota ${titleNote} no fue encontrada.`));
    }
  }
  // SETTERS
  public setUserName(newName: string): void {
    // comprobar nombre repetido**
    this.userName = newName;
  }
  public setListNotes(newList: Set<Note>): void {
    this.listNotes = newList;
  }
  // SHOW
  public showTitles(): void {
    console.log(`Notas del usuario ${this.getUserName()}:`);
    this.getListNotes().forEach((note) => console.log(note.getTitle()));
  }
}
