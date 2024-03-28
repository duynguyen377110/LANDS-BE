"use strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const configConstantDb = require("../config/consfig-constant-db");

const ModelCategory = new Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    thumbs: [
        {
            type: String,
            default: ''
        }
    ],
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: configConstantDb.product
        }
    ]
}, {
    collection : configConstantDb.category,
    timestamps: true
})

module.exports = mongoose.model(configConstantDb.category, ModelCategory);