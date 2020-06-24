import { ITerm } from '../../term/models/term';
import { randomInteger } from './random-integer';
import { randomWord } from './random-word';

export class TermsCreator {
  private static terms: ITerm[] = null;

  static getTerms(): ITerm[] {
    if (TermsCreator.terms === null) {
      TermsCreator.terms = TermsCreator.createTerms(10);
    }
    return TermsCreator.terms;
  }

  private static createTerms(numTerms: number): ITerm[] {
    const terms = [];
    let id = 0;
    while (numTerms--) {
      terms.push(TermsCreator.createTerm(++id, 10, 10, 100));
    }
    return terms;
  }

  private static createTerm(id: number, numFields: number, valueMinLen: number, valueMaxLen: number): ITerm {
    const term = {id} as ITerm;
    for (let i = 1; i <= numFields; i++) {
      const valueLen = randomInteger(valueMinLen, valueMaxLen);
      term['field' + i] = randomWord(valueLen);
    }
    return term;
  }

  private constructor() {
  }

}
