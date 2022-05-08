import chalk from 'chalk';
import {User} from './classUser';
import * as fs from 'fs';
import {Note} from './classNote';
import {Colour} from './classColor';

export class ManagementUsers {
  private listUsers: Set<User> = new Set();
  private static managerUser: ManagementUsers;

  constructor() {
    const usersNames: string[] = getDirectories('./NotasJson');
    usersNames.forEach((userName) => {
      const user: User = new User(userName);
      const jsonList = getJsons(`./NotasJson/${userName}`);
      const listNotes: Note[] = jsonList.map((json) => new Note(json.title, json.body, new Colour(json.colour)));
      user.setListNotes(new Set(listNotes));
      this.listUsers.add(user);
    });
  }

  public static getManagerUser(): ManagementUsers {
    if (!ManagementUsers.managerUser) {
      ManagementUsers.managerUser = new ManagementUsers;
    }
    return ManagementUsers.managerUser;
  }
  public getUsers(): Set<User> {
    return this.listUsers;
  }
  private getUserNames(): string[] {
    const list: User[] = Array.from(this.listUsers);
    const listNames: string[] = list.map((user) => user.getUserName());
    return listNames;
    /*
    if (listNames.length == 0) {
      throw Error(chalk.red(`No hay usuarios en la base de datos.`));
    } else {
      return listNames;
    }*/
  }
  public getUser(name: string): User {
    const users: User[] = Array.from(this.listUsers);
    const user: User | undefined = users.find((user) => user.getUserName() === name);
    if (user !== undefined) {
      return user;
    } else {
      throw Error(chalk.red(`Cannot find user ${name}`));
    }
  }
  public addUser(newUser: User): void {
    const dir: string = `./NotasJson/${newUser.getUserName()}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
      this.listUsers.add(newUser);
      console.log(chalk.green(`Se ha creado y añadido el usuario ${newUser.getUserName()}`));
      console.log(chalk.green(`Se ha creado el directorio para el usuario ${newUser.getUserName()}`));
    } else {
      console.log(chalk.green(`Ya existe el directorio para el usuario ${newUser.getUserName()}`));
    }
  }
  public deleteUser(user: User): void {
    const dir: string = `./NotasJson/${user.getUserName()}`;
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, {recursive: true, force: true});
      console.log(chalk.green(`Se ha eliminado el directorio para el usuario ${user.getUserName()}`));
    }
    this.listUsers.delete(user);
    console.log(chalk.green(`Se ha eliminado el usuario ${user.getUserName()}`));
  }
  public include(nameUser: string): boolean {
    return this.getUserNames().includes(nameUser);
  }
}


function getDirectories(source: string): string[] {
  return fs.readdirSync(source, {withFileTypes: true}).filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
}

function getJsons(source: string) {
  const filesNames: string[] = fs.readdirSync(source, {withFileTypes: true}).map((file) => file.name);
  return filesNames.map((fileName) => JSON.parse(fs.readFileSync(`${source}/${fileName}`, 'utf8')));
}
