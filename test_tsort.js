const { EdgeWeightedDigraph } = require("./edge-weighted-digraph");
const { TopologicalSort } = require("./topological-sort");

(async () => {
    try {
        const g = new EdgeWeightedDigraph();
        await g.initWithFile("dag.txt");
        console.log("------- GRAPH -------------");
        console.log(g.toString());
        console.log("-------- TOPOLOGICAL SORT ----");
        const ts = new TopologicalSort(g);
        console.log(ts.toString());
    } catch (error) {
        console.error(error);
    }
})();

