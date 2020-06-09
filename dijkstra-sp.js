// *********************************************************************
// A Dijkstra shortest path algorithm.
// *********************************************************************

const { DirectedEdge, EdgeWeightedDigraph } = require("./edge-weighted-digraph");
const { IndexedMinPQ } = require("./indexed-min-priority-queue");

class DijkstraSP {
    /**
     * Create an shortest path tree using a Dijkstra's algorithm.
     *
     * @param {EdgeWeightedDigraph} graph
     * @param {number} source
     */
    constructor(graph, source) {
        this.graph = graph;
        this.source = source;
        this.pq = new IndexedMinPQ();
        this.distTo = Array.apply(null, new Array(graph.v())).map(() => Infinity);
        this.distTo[source] = 0;
        this.edgeTo = Array.apply(null, new Array(graph.v())).map(() => null);

        this.pq.enqueue(source, 0);
        while (!this.pq.isEmpty()) {
            const { element: v } = this.pq.dequeue();
            for (const e of graph.adj(v)) {
                this.relax(e);
            }
        }
    }

    /**
     * Relax an edge.
     *
     * @param {DirectedEdge} edge
     */
    relax(edge) {
        const v = edge.from();
        const w = edge.to();
        if (this.distTo[v] + edge.weight() < this.distTo[w]) {
            this.distTo[w] = this.distTo[v] + edge.weight();
            this.edgeTo[w] = v;
            if (this.pq.contains(w)) {
                this.pq.update(w, this.distTo[w]);
            } else {
                this.pq.enqueue(w, this.distTo[w]);
            }
        }
    }

    /**
     * Create a string representation.
     */
    toString() {
        return `Distances to: [${this.distTo.join(", ")}]`;
    }
}

module.exports = { DijkstraSP };
