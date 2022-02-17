export class Guess {
  public letters: string[];
  public isSubmitted: boolean;
  public isCorrect: boolean;

  constructor(wordLength: number) {
    this.letters = [...Array(wordLength)].map(() => '');
    this.isSubmitted = false;
    this.isCorrect = false;
  }
}
