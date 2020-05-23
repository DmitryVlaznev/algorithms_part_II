const { IllegalFunctionCallException } = require("./custom-exceptions");

const fs = require("fs");
const readline = require("readline");

// *********************************************************************
// * A weighted graph edge class.
// *********************************************************************
class Edge {
    /**
     * Create an undirected weighted edge.
     *
     * @param {number} v A first node.
     * @param {number} w A second node.
     * @param {number} weight An edge weight.
     */
    constructor(v, w, weight) {
        this.v = v;
        this.w = w;
        this.weight = weight;
    }

    /**
     * Return a first node.
     *
     * @returns {number}
     */
    either() {
        return this.v;
    }

    /**
     * Return a second node.
     *
     * @param {number} vertex One vertex of the edge which not to be
     * returned.
     * @returns {number}
     */
    other(vertex) {
        return vertex == this.v ? this.w : this.v;
    }

    /**
     * Compare this edge with the other one.
     *
     * @param {Edge} that Another edge to compare with.
     */
    compareTo(that) {
        return this.weight < that.weight ? -1 : this.weight > that.weight ? 1 : 0;
    }

    /**
     * Return a string representation of the edge.
     *
     * @returns {string}
     */
    toString() {
        return `{${this.v}-${this.w}:(${this.weight})}`
    }
}


// *********************************************************************
// * A weighted graph class.
// *********************************************************************
class EdgeWeightedGraph {
    /**
     * Init a graph structure and counters.
     */
    constructor() {
        this.graph = [];
        this.numberOfVertices = 0;
        this.numberOfEdges = 0;
    }

    /**
     * Init a graph with a number of vertices.
     *
     * @param {number} size
     */
    init(size) {
        this.graph = Array.apply(null, new Array(size)).map(() => []);
        this.numberOfVertices = size;

        this.init = () => {
            throw new IllegalFunctionCallException(
                `You can call the "init" function once only.`
            );
        }
    }

    /**
     * Load a graph data from a file.
     *
     * @param {string} filename
     */
    async initWithFile(filename) {
        // File format:
        // ----------
        // 5            << a number of vertices
        // 1-2 23.3     << edges
        // 2-4 0.21
        // 3-0 23
        // 0-4 42
        const fileStream = fs.createReadStream(filename);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            if (!this.numberOfVertices) {
                this.init(parseInt(line, 10));
            } else {
                const [nodes, weight] = line.split(" ");
                const [v, w] = nodes.split("-").map(i => parseInt(i, 10));
                this.addEdge(new Edge(v, w, parseFloat(weight)));
            }
        }

        this.initWithFile = () => {
            throw new IllegalFunctionCallException(`You can call the "initWithFile" function once only.`);
        }
    }

    /**
     * Add an edge to a graph.
     *
     * @param {Edge} edge
     */
    addEdge(edge) {
        const v = edge.either();
        const w = edge.other(v);
        this.graph[v].push(edge);
        this.graph[w].push(edge);
        this.numberOfEdges++;
    }

    /**
     * Return all edges adjusted to the given vertex.
     *
     * @param {number} v
     * @returns {Iterable<Edge>}
     */
    *adj(v) {
        for (const edge of this.graph[v]) {
            yield edge;
        }
    }

    /**
     * Return all graph edges.
     *
     * @returns {Iterable<Edge>}
     */
    *edges() {
        if(!this.e()) {
            return;
        }
        for (let i = 0; i < this.graph.length; i++) {
            yield* this.adj(i);
        }
    }

    /**
     * Return a number of vertices.
     *
     * @returns {number}
     */
    v() {
        return this.numberOfVertices;
    }

    /**
     * Return a number of edges.
     *
     * @returns {number}
     */
    e() {
        return this.numberOfEdges;
    }

    /**
     * Return a string representation of the graph.
     *
     * @returns {string}
     */
    toString() {
        let str = `Vertices: ${this.v()}, Edges: ${this.e()}\n`;
        for (let i = 0; i < this.graph.length; i++) {
            const e_str = [...this.adj(i)].map(e => e.toString()).join(", ");
            str += `[${i}] => [${e_str}]\n`;
        }
        return str;
    }
}

module.exports = { Edge, EdgeWeightedGraph }