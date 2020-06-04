// *********************************************************************
// An indexed min priority queue
// *********************************************************************

const { NoSuchElementException } = require("./custom-exceptions");

// An indexed min priority queue element class.
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

// An indexed min priority queue class.
class IndexedMinPQ {
    /**
     * Create an array-based heap to implement a priority queue.
     */
    constructor() {
        this.index = new Map();
        this.heap = [null];
    }

    /**
     * Return the size of the queue.
     *
     * @returns {number}
     */
    get size() {
        return this.heap.length - 1;
    }

    /**
     * Swap two heap elements.
     *
     * @param {QElement} e1
     * @param {QElement} e2
     */
    swap(e1, e2) {
        const i1 = this.index.get(e1.element);
        const i2 = this.index.get(e2.element);

        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
        this.index.set(e1.element, i2);
        this.index.set(e2.element, i1);
    }

    /**
     * Check if the element is in PQ or not.
     *
     * @param {*} element
     * @returns {boolean}
     */
    contains(element) {
        return this.index.has(element);
    }

    /**
     * Update an element priority.
     *
     * @param {*} element
     * @param {number} priority
     */
    update(element, priority) {
        if (!this.contains(element)) {
            throw new NoSuchElementException("There is no such an element in the queue.");
        }
        const index = this.index.get(element);
        const curPriority = this.heap[index].priority;
        this.heap[index].priority = priority;

        if (priority < curPriority) {
            this.swim(index);
        } else {
            this.sink(index);
        }
    }

    /**
     * Promote a node to its an appropriate place in the heap.
     *
     * @param {number} index
     */
    swim(index) {
        let parent = parseInt(index / 2);
        while (index > 1 && this.higher(this.heap[index], this.heap[parent])) {
            this.swap(this.heap[index], this.heap[parent]);
            index = parent;
            parent = parseInt(index / 2);
        }
    }

    /**
     * Sink a node to its an appropriate place in the heap.
     *
     * @param {number} index
     */
    sink(index) {
        while (index * 2 <= this.size) {
            let child = index * 2;
            if (child + 1 <= this.size && this.higher(this.heap[child + 1], this.heap[child])) {
                child++;
            }
            if (!this.higher(this.heap[child], this.heap[index])) {
                break;
            }
            this.swap(this.heap[index], this.heap[child]);
            index = child;
        }
    }

    /**
     * Add an element with a priority to the queue.
     *
     * @param {*} element
     * @param {number} priority
     */
    enqueue(element, priority) {
        const item = new QElement(element, priority);
        this.heap.push(item)
        let index = this.size;
        this.index.set(element, index);
        this.swim(index);
    }

    /**
     * Remove an element with the highest priority from the queue and
     * return it.
     *
     * @returns {QElement}
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new NoSuchElementException("The queue is empty.");
        }

        this.swap(this.heap[1], this.heap[this.size])
        const item = this.heap.pop();
        this.sink(1);
        this.index.delete(item);
        return item;
    }

    /**
     * Is the `a` priority is bigger than the `b` priority.
     *
     * @param {QElement} a
     * @param {QElement} b
     * @returns {boolean}
     */
    higher(a, b) {
        return a.priority < b.priority;
    }

    /**
     * Return an element with the highest priority.
     * Do not remove it from the queue.
     *
     * @returns {QElement}
     */
    front() {
        if (this.isEmpty()) {
            throw new NoSuchElementException("The queue is empty.");
        }
        return this.heap[1];
    }

    /**
     * Return an element with the lowest priority.
     * Do not remove it from the queue.
     *
     * @returns {QElement}
     */
    rear() {
        if (this.isEmpty()) {
            throw new NoSuchElementException("The queue is empty.");
        }
        return this.heap[this.size];
    }

    /**
     * Return whether the queue is empty or not.
     *
     * @returns {boolean}
     */
    isEmpty() {
        return this.size == 0;
    }

    /**
     * Return a string representation of queue elements.
     *
     * @returns {string}
     */
    toString() {
        return `[${this.heap.slice(1).map(i => i.element.toString()).join(", ")}]`
    }
}

module.exports = { IndexedMinPQ, QElement };