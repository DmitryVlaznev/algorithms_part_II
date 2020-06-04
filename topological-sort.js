// *********************************************************************
// Topological sort
// *********************************************************************

const { EdgeWeightedDigraph } = require("./edge-weighted-digraph");

class TopologicalSort {
    /**
     * Create an MST using Kruskal's Algorithm
     *
     * @param {EdgeWeightedDigraph} graph
     */
    constructor(graph) {
        this.sortedVertices = [];
        const marked = Array.apply(null, new Array(graph.v())).map(() => false);

        for (let v = 0; v < graph.v(); v++) {
            if (!marked[v]) {
                this.dfs(v, graph, marked);
            }
        }

        this.sortedVertices.reverse();
    }

    /**
     * Deep-first search.
     *
     * @param {number} v
     * @param {EdgeWeightedGraph} graph
     * @param {boolean[]} marked
     */
    dfs(v, graph, marked) {
        marked[v] = true;
        for(const edge of graph.adj(v)) {
            if (!marked[edge.to()]) {
                this.dfs(edge.to(), graph, marked);
            }
        }
        this.sortedVertices.push(v);
    }

    /**
     * Return sorted vertices.
     *
     * @returns {Iterable<number>}
     */
    *vertices() {
        yield* this.sortedVertices;
    }

    toString() {
        return `Sorted vertices: ${this.sortedVertices}`;
    }
}

module.exports = { TopologicalSort };

