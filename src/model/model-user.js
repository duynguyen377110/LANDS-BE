"use strict";
const mongoose = require("mongoose");
const configConstantDb = require("../config/consfig-constant-db");
const Schema = mongoose.Schema;

const ModelRole = new Schema({
    name: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: configConstantDb.role
    }
}, {
    collection: configConstantDb.user,
    timestamps: true
})

module.exports = mongoose.model(configConstantDb.user, ModelRole);