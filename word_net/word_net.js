const fs = require("fs");
const readline = require("readline");
const { IllegalArgumentException } = require("../custom-exceptions");

class WordNet {
    /**
     * Create a digraph.
     *
     * @param {string} synsets A synsets input file name
     * @param {string} hypernyms  A hypernyms input file name
     */
    constructor(synsets, hypernyms) {
        if (!synsets) {
            throw new IllegalArgumentException(
                "A synsets input file name wasn't provided",
            );
        }
        if (!hypernyms) {
            throw new IllegalArgumentException(
                "A hypernyms input file name wasn't provided",
            );
        }
        this.synsetsFileName = synsets;
        this.hypernymsFileName = hypernyms;
        this.nounsIndex = new Map();
        this.graph = new Map();
        this.hypernymsCount = 0;
    }

    async init() {
        console.log("**************************");
        console.log("load synsets...");
        await this.loadSynsets(this.synsetsFileName)
        await this.loadHypernyms(this.hypernymsFileName)
        console.log(`${this.graph.size} synsets loaded. ${this.nounsIndex.size} nouns added.`);
        console.log(`${this.hypernymsCount} hypernyms processed.`);
        console.log(`COMPLETE.`);
        console.log("**************************");
        console.log("");
    }

    async loadSynsets(filename) {
        const fileStream = fs.createReadStream(filename);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            let [id, words] = line.split(",")
            words = words.split(" ");
            this.graph.set(id, new Set())
            for (const word of words) {
                this.nounsIndex.set(word, id);
            }
        }
    }

    async loadHypernyms(filename) {
        const fileStream = fs.createReadStream(filename);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            let [id, ...hypernyms] = line.split(",")
            this.hypernymsCount += hypernyms.length;
            for (const h of hypernyms) {
                this.graph.get(id).add(h);
            }
        }
    }

    /**
     * Returns all WordNet nouns
     *
     * @returns {Iterable<string>}
     */
    *nouns() {
        yield* this.nounsIndex.keys();
    }

    /**
     * Is the word a WordNet noun?
     *
     * @param {string} word
     * @returns {boolean}
     */
    isNoun(word) {
        return this.nounsIndex.has(word);
    }

    /**
     * Distance between `nounA` and `nounB`
     *
     * @param {*} nounA
     * @param {*} nounB
     * @returns {number}
     */
    distance(nounA, nounB) {}

    /**
     * A synset (second field of synsets.txt) that is the common
     * ancestor of `nounA` and `nounB` in a shortest ancestral path.
     *
     * @param {string} nounA
     * @param {string} nounB
     * @returns {string}
     */
    sap(nounA, nounB) {}
}

module.exports = { WordNet };
