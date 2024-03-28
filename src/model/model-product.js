"use strict"
const mongoose = require('mongoose');
const configConstantDb = require("../config/consfig-constant-db");
const Schema = mongoose.Schema;

const ModelProduct = new Schema({
    productOwner: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    contact: {
        type: String,
        default: ''
    },
    landArea: {
        type: String,
        default: ''
    },
    price: {
        type: Schema.Types.Decimal128,
        default: 0
    },
    thumbs: [
        {
            type: String,
            default: ''
        }
    ],
    categories: {
        type: Schema.Types.ObjectId,
        ref: configConstantDb.category
    },
    userPost: {
        type: Schema.Types.ObjectId,
        ref: configConstantDb.user
    }
}, {
    collection: configConstantDb.product,
    timestamps: true
})

module.exports = mongoose.model(configConstantDb.product, ModelProduct);