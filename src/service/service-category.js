"use strict"
const ModelCategory = require("../model/model-category");
const UtilCloudinary = require("../utils/util-cloudinary");
const environment = require("../../environment").environment;
const { InternalServerError } = require("../core/core-error");

class ServiceCategory {

    constructor() { }

    /**
     * GET CATEGORY AMOUNT
     * @returns 
     */
    async getAmount() {
        try {
            return await ModelCategory.find().count().lean();

        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }

    /**
     * GET ALL CATEGORY
     * @returns 
     */
    async getAllCategory() {
        try {
            return await ModelCategory.find().lean();

        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }

    /**
     * GET CATEGORY BY ID
     * @param {*} infor 
     */
    async getCategoryById(infor = {}) {
        try {
            return await ModelCategory
                        .findById(infor.id)
                        .populate([
                            {
                                path: 'products'
                            }
                        ])
                        .lean();
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }

    /**
     * FIND CATEGORY BY ID
     * @param {*} id 
     * @returns 
     */
    async findCategoryById(id) {
        try {
            return await ModelCategory.findById(id);

        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }

    /**
     * DELETE THUMBS IMAGE OF CATEGORY
     * @param {*} infor 
     * @returns 
     */
    async deleteThumbsCategory(infor = {}) {
        try {
            if(infor.thumbs.length) {
                let thumbs = [];

                for(let thumb of infor.thumbs) {
                    let thumbExtract = thumb.split('/');
                    let index = thumbExtract.findIndex((directory) => directory === environment.cloudinary.directory);
                    let thumbExtractResult = thumbExtract.slice(index).join('/').split('.')[0];

                    // CHECK IMAGE EXIT ON CLOUD
                    let {status } = await UtilCloudinary.exists(thumbExtractResult);
                    if(status) {
                        thumbs.push(thumbExtractResult);
                    }
                }
                
                if(thumbs.length) {
                    await UtilCloudinary.destroyMany(thumbs);
                }
            }

            return { status: true, message: 'Delete thumbs success'};

        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }
}

module.exports = new ServiceCategory();