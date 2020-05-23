// *********************************************************************
// Lazy Prim's minimum spanning tree
// *********************************************************************

const { Edge, EdgeWeightedGraph } = require("./edge-weighted-graph");
const { PriorityQueue } = require("./priority-queue");

class MstPrim {
    /**
     * Create an MST using Kruskal's Algorithm
     *
     * @param {EdgeWeightedGraph} graph
     */
    constructor(graph) {
        this.mstEdges = [];
        this.mstWeight = 0;
        const mstVertices = new Set();
        const pq = new PriorityQueue();

        mstVertices.add(0);
        for (const edge of graph.adj(0)) {
            pq.enqueue(edge, edge.weight);
        }

        while(this.mstEdges.length < graph.v() - 1) {
            const edge = pq.dequeue().element;
            const v = edge.either();
            const w = edge.other(v);
            if (mstVertices.has(v) && mstVertices.has(w)) {
                continue;
            }
            this.mstEdges.push(edge);
            this.mstWeight += edge.weight;
            const newNode = mstVertices.has(v) ? w : v;
            mstVertices.add(newNode);
            for (const edge of graph.adj(newNode)) {
                if (!mstVertices.has(edge.other(newNode))) {
                    pq.enqueue(edge, edge.weight);
                }
            }
        }
    }

    /**
     * Return all MST edges.
     *
     * @returns {Iterable<Edge>}
     */
    *edges() {
        yield* this.mstEdges;
    }

    toString() {
        let str = `MST weight: ${this.mstWeight}\n`;
        for (const edge of this.edges()) {
            str += edge.toString() + "\n";
        }
        return str;
    }
}

module.exports = { MstPrim };