// *********************************************************************
// UnionFind compressed
// *********************************************************************

class UnionFindCompressed {
    /**
     * Create a parents data array.
     * @param {number} n
     */
    constructor(n) {
        this.parents = new Array(n);
        for (let i = 0; i < n; i++) {
            this.parents[i] = i;
        }
    }

    /**
     * Find a node root.
     * @param {number} index
     */
    _root(index) {
        while (this.parents[index] !== index) {
            this.parents[index] = this.parents[this.parents[index]];
            index = this.parents[index];
        }
        return index;
    }

    /**
     * Are the nodes connected?
     *
     * @param {number} a
     * @param {number} b
     *
     * @returns {boolean} Check result.
     */
    connected(a, b) {
        return this._root(a) === this._root(b);
    }

    /**
     * Connect two nodes.
     *
     * @param {number} a
     * @param {number} b
     */
    union(a, b) {
        const ra = this._root(a);
        const rb = this._root(b);
        this.parents[ra] = rb;
    }
}

module.exports = { UnionFindCompressed };