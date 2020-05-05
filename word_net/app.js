const { WordNet } = require("./word_net");

(async function(){
    // const wn = new WordNet("synsets100-subgraph.txt", "hypernyms100-subgraph.txt");
    const wn = new WordNet("synsets.txt", "hypernyms.txt");
    await wn.init();
})()