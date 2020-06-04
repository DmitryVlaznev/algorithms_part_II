const { IndexedMinPQ } = require("./indexed-min-priority-queue");

(async () => {
    try {
        let ordered;
        const pq = new IndexedMinPQ();
        // a:1, b:5, c:10, d15
        console.log("");
        console.log("check order...");
        pq.enqueue("c", 10);
        pq.enqueue("a", 1);
        pq.enqueue("d", 15);
        pq.enqueue("b", 5);
        console.log("'b' is in the queue", pq.contains("b"));

        ordered = [];
        while(!pq.isEmpty()) {
            ordered.push(pq.dequeue().element);
        }
        if ("abcd" == ordered.join("")) {
            console.log("[v]", ordered);
        } else {
            console.log("INCORRECT. ", ordered);
        }

        console.log("");
        console.log("decrease a priority of 'b'...");
        pq.enqueue("c", 10);
        pq.enqueue("a", 1);
        pq.enqueue("d", 15);
        pq.enqueue("b", 5);
        pq.update("b", 42);
        ordered = [];
        while(!pq.isEmpty()) {
            ordered.push(pq.dequeue().element);
        }
        if ("acdb" == ordered.join("")) {
            console.log("[v]", ordered);
        } else {
            console.log("INCORRECT. ", ordered);
        }

        console.log("");
        console.log("increase a priority of 'c'...");
        pq.enqueue("c", 10);
        pq.enqueue("a", 1);
        pq.enqueue("d", 15);
        pq.enqueue("b", 5);
        pq.update("c", 2);
        ordered = [];
        while(!pq.isEmpty()) {
            ordered.push(pq.dequeue().element);
        }
        if ("acbd" == ordered.join("")) {
            console.log("[v]", ordered);
        } else {
            console.log("INCORRECT. ", ordered);
        }
    } catch (error) {
        console.error(error);
    }
})();

