export interface Phonetic {
  text: string;
  audio?: string;
}

export interface Definition {
  definition: string;
  example?: string;
  synonyms: Array<String>;
  antonyms: Array<String>;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Array<Definition>;
  synonyms?: Array<String>;
}

export interface Word {
  word: string;
  phonetic: string;
  phonetics?: Array<Phonetic>;
  meanings: Array<Meaning>;
  sourceUrl: string;
  sourceUrls?: Array<string>;
}
