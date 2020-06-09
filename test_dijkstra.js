const { EdgeWeightedDigraph } = require("./edge-weighted-digraph");
const { DijkstraSP } = require("./dijkstra-sp");

(async () => {
    try {
        const g = new EdgeWeightedDigraph();
        await g.initWithFile("dij_ewt.txt");
        console.log("------- GRAPH -------------");
        console.log(g.toString());
        console.log("-------- DIJKSTRA SP ----");
        const dsp = new DijkstraSP(g, 0);
        const sample = [0, 5, 14, 17, 9, 13, 25, 8];
        const res = dsp.distTo;
        for (let i = 0; i < sample.length; i++) {
            if (sample[i] != res[i]) {
                throw new Error(
                    `The value of distTo[${i}] is "${res[i]}" instead of "${sample[i]}"`,
                );
            }
        }
        console.log("Correct!");
        console.log(dsp.toString());
    } catch (error) {
        console.error(error);
    }
})();
