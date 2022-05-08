import chalk from 'chalk';

export class Colour {
  private colour: string;
  constructor(color: string) {
    if (color === 'red' || color === 'green' || color === 'blue' || color === 'yellow') {
      this.colour = color;
    } else {
      throw Error(chalk.red('El color no es correcto.'));
    }
  }
  public getColour(): string {
    return this.colour;
  }
}
