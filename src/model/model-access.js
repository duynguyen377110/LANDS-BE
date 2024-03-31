"use strict"
const mongoose = require("mongoose");
const configConstantDb = require("../config/consfig-constant-db");
const Schema = mongoose.Schema;

const ModelAccess = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: configConstantDb.user
    },
    tokens: [
        {
            type: String,
            default: ''
        }
    ],
    refreshToken: {
        type: String,
        default: ''
    },
    accessToken: {
        type: String,
        default: ''
    },
    publicKey: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: configConstantDb.access,
})

module.exports = mongoose.model(configConstantDb.access, ModelAccess);