// *********************************************************************
// Kruskal's minimum spanning tree
// *********************************************************************

const { Edge, EdgeWeightedGraph } = require("./edge-weighted-graph");
const { PriorityQueue } = require("./priority-queue");
const { UnionFindCompressed } = require("./union-find");

class MstKruskal {

    /**
     * Create an MST using Kruskal's Algorithm
     *
     * @param {EdgeWeightedGraph} graph
     */
    constructor(graph) {
        const pq = new PriorityQueue();
        const uf = new UnionFindCompressed(graph.v());

        for (const edge of graph.edges()) {
            pq.enqueue(edge, edge.weight);
        }

        this.mstEdges = [];
        this.mstWeight = 0;

        while(this.mstEdges.length < graph.v() - 1) {
            const edge = pq.dequeue().element;
            const v = edge.either();
            const w = edge.other(v);
            if (uf.connected(v, w)) {
                continue;
            }
            this.mstEdges.push(edge);
            uf.union(v, w);
            this.mstWeight += edge.weight;
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

module.exports = { MstKruskal };