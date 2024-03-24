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

    async findCategoryById(id) {
        try {
            return await ModelCategory.findById(id);

        } catch (error) {
            throw error;
        }
    }

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
                        images.push(`${environment.cloudinary.directory}/${imageName}`);
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