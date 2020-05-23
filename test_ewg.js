const { EdgeWeightedGraph } = require("./edge-weighted-graph");
const { MstKruskal } = require("./mst-kruskal");
const { MstPrim } = require("./mst-prim");

(async () => {
    try {
        const g = new EdgeWeightedGraph();
        await g.initWithFile("ewg.txt");
        console.log("------- ALL EDGES ---------");
        console.log([...g.edges()]);
        console.log("------- GRAPH -------------");
        console.log(g.toString());
        console.log("-------- KRUSKAL'S MST ----");
        const mstKruskal = new MstKruskal(g);
        console.log(mstKruskal.toString());
        console.log("-------- PRIM'S MST ----");
        const mstPrim = new MstPrim(g);
        console.log(mstPrim.toString());
    } catch (error) {
        console.error(error);
    }
})();

