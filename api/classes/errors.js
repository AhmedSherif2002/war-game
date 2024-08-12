class Error {
    constructor(message, type){
        this.message = message
        this.type = type;
    }
}

class ValidationError extends Error {
    constructor(message, type){
        super(message, type);
    }
}

module.exports = {
    ValidationError
}