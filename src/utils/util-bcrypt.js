"use strict"
const bcrypt = require("bcrypt");
class Bcrypt  {

    salt = 12;

    constructor() {}


    has(password) {
        return bcrypt.hashSync(password, this.salt);
    }

    compare(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = new Bcrypt();