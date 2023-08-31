/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for(let i=0; i< this.words.length; i+= 1){
      let wrd = this.words[i];
      let nxtwrd = this.words[i+1] || null;

      if (chains.has(wrd)) chains.get(wrd).push(nxtwrd);
      else chains.set(wrd, [nxtwrd]);

    }
    this.chains = chains;
  }
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeTxt(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key != null){
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};