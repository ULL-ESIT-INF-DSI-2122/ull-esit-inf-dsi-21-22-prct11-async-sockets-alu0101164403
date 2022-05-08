import {Colour} from './classColor';
import chalk from 'chalk';
import * as fs from 'fs';
import {User} from './classUser';
import {Note} from './classNote';

export class ManagementNotes {
  constructor(private user: User) {
  }
  // GESTION NOTAS
  public addNote(newNote: Note): boolean {
    if (this.user.getListNotes().size > 0 && this.user.getTitlesNotes().includes(newNote.getTitle())) {
      console.log(chalk.red(`There is already a note with the title -> '${newNote.getTitle()}' for the user ${this.user.getUserName()}.`));
      return false;
    } else {
      this.user.getListNotes().add(newNote);
      const dir: string = `./NotasJson/${this.user.getUserName()}/${newNote.getTitle()}.json`;
      const jsonToStore = {
        'title': newNote.getTitle(),
        'colour': newNote.getColour().getColour(),
        'body': newNote.getBody(),
      };
      fs.writeFileSync(dir, JSON.stringify(jsonToStore));
      console.log(chalk.green(`The note was added correctly.`));
      return true;
    }
  }
  public modifyNote(note: Note, newTitle: string, newBody: string, newColour: Colour): boolean {
    if (this.user.getTitlesNotes().includes(note.getTitle())) {
      note.setBody(newBody);
      note.setColour(newColour);
      note.setTitle(newTitle);
      const dir: string = `./NotasJson/${this.user.getUserName()}/${note.getTitle()}.json`;
      const jsonToStore = {
        'title': newTitle,
        'colour': newColour.getColour(),
        'body': newBody,
      };
      const fd = fs.openSync(dir, 'w');
      fs.writeFileSync(fd, JSON.stringify(jsonToStore));
      fs.closeSync(fd);
      console.log(chalk.green(`The note has been modified correctly, the new data is: 
      - Title: ${note.getTitle()},
      - Body: ${note.getBody()},
      - Colour: ${note.getColour()}`));
      return true;
    } else {
      console.log(chalk.red('The chosen note cannot be modified because it does not exist, you can create a new note.'));
      return false;
    }
  }
  public removeNote(note: Note): boolean {
    if (this.user.getTitlesNotes().includes(note.getTitle())) {
      this.user.getListNotes().delete(note);
      const dir: string = `./NotasJson/${this.user.getUserName()}/${note.getTitle()}.json`;
      fs.unlinkSync(dir);
      console.log(chalk.green(`The note was deleted correctly.`));
      return true;
    } else {
      console.log(chalk.red(`The note to delete was not found.`));
      return false;
    }
  }
  public showNote(note: Note): boolean {
    if (this.user.getTitlesNotes().includes(note.getTitle())) {
      note.showInfo();
      console.log(chalk.green(`The note was read correctly.`));
      return true;
    } else {
      console.log(chalk.red(`The note dont exist.`));
      return false;
    }
  }
  public showTittlesNotes(): boolean {
    if (this.user.getTitlesNotes().length > 0) {
      this.user.showTitles();
      console.log(chalk.green(`The titles was read correctly.`));
      return true;
    } else {
      console.log(chalk.red(`Dont exist notes for this user.`));
      return false;
    }
  }
  public inlcude(note: Note): boolean {
    return this.user.getListNotes().has(note);
  }
}
