"use strict"
const mongoose = require("mongoose");
const environment = require("../../environment").environment;

class UtilDatabase {

    constructor() {
        this.connect();
    }

    async connect() {
        try {
            let connect = await mongoose.connect(environment.db);
            if(!connect) throw new Error('Connect db unsuccess');
            console.log('connect db success');

        } catch (err) {
            console.log(err);
        }
    }

    static getInstance() {
        if(!UtilDatabase.Instance) {
            UtilDatabase.Instance = new UtilDatabase();
        }

        return UtilDatabase.Instance
    }
}

const Instance = UtilDatabase.getInstance();

module.exports = Instance;