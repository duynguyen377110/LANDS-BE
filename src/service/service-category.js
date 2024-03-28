"use strict"
const ModelCategory = require("../model/model-category");
const UtilCloudinary = require("../utils/util-cloudinary");
const environment = require("../../environment").environment;

class ServiceCategory {

    constructor() { }

    async getAmount() {
        try {
            return await ModelCategory.find().count().lean();
        } catch (error) {
            throw error;
        }
    }

    async getAllCategory() {
        try {
            return await ModelCategory.find().lean();

        } catch (error) {
            throw error;
        }
    }

    /**
     * GET CATEGORY BY ID
     * @param {*} infor 
     */
    async getCategoryById(infor = {}) {
        try {
            return await ModelCategory.findById(infor.id).lean();
        } catch (error) {
            throw error;
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
            throw error;
        }
    }

    /**
     * CREATE CATEGORY
     * @param {*} infor 
     * @returns 
     */
    async createCategory(infor = {}) {
        try {
            return await ModelCategory.create({
                title: infor.title,
                description: infor.description,
                thumbs: infor.thumbs
            })

        } catch (error) {
            throw error;
        }
    }


    /**
     * UPDATE CATEGORY
     * @param {*} infor 
     * @returns 
     */
    async updateCategory(infor = {}) {
        try {
            let category = await this.findCategoryById(infor.id);

            if(infor.thumbs.length) {
                infor.thumbs.forEach((thumb) => {
                    category.thumbs.unshift(thumb);
                })
            }

            category.title = infor.title;
            category.description = infor.description;
            await category.save();
            return {status: true, message: 'Update category success'};

        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE CATEGORY
     * @param {*} infor 
     * @returns 
     */
    async deleteCategory(infor = {}) {
        try {
            let category = await this.findCategoryById(infor.id);

            if(category.thumbs.length) {
                let images = [];
                for(let image of category.thumbs) {
                    let imageName = image.split('/').splice(-1).join('').split(".")[0];

                    // THUC HIEN KIEM TRA XEM FILE CO TON TAI TREN CLOUD
                    let {status, result } = await UtilCloudinary.exists(`${environment.cloudinary.directory}/${imageName}`);
                    if(status) {
                        images.push(`${environment.cloudinary.directory}/categories/${imageName}`);
                    }
                }
                
                if(images.length) {
                    await UtilCloudinary.destroyMany(images);
                }
            }

            await category.deleteOne();
            return {status: true, message: 'Delete category success'};

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceCategory();