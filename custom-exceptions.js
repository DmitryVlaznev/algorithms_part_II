class IllegalArgumentException extends Error {
    constructor(message) {
        super(message);
        this.name = "IllegalArgumentException";
    }
}

class NoSuchElementException extends Error {
    constructor(message) {
        super(message);
        this.name = "NoSuchElementException";
    }
}

class IllegalFunctionCallException extends Error {
    constructor(message) {
        super(message);
        this.name = "IllegalFunctionCallException";
    }
}

module.exports = {
    IllegalArgumentException,
    IllegalFunctionCallException,
    NoSuchElementException,
};
