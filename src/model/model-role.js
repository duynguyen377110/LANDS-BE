"use strict";
const mongoose = require("mongoose");
const configConstantDb = require("../config/consfig-constant-db");
const Schema = mongoose.Schema;

const ModelRole = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: configConstantDb.user
        }
    ]
}, {
    collection: configConstantDb.role,
    timestamps: true
})

module.exports = mongoose.model(configConstantDb.role, ModelRole);