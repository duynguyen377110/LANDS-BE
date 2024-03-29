"use strict"
const ModelProduct = require("../model/model-product");
const ServiceCategory = require("./service-category");
const UtilCloudinary = require("../utils/util-cloudinary");
const environment = require("../../environment").environment;

class ServiceProduct {

    constructor() { }

    /**
     * GET ALL PRODUCT
     * @returns 
     */
    async getAll() {
        try {
            return await ModelProduct.find({}).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * FIND PRODUCT BY ID
     * @param {*} id 
     * @returns 
     */
    async findProductById(id = '') {
        try {
            return await ModelProduct
                        .findById(id)
                        .populate([
                            {
                                path: 'categories',
                            }
                        ]);

        } catch (error) {
            throw error;
        }
    }

    /**
     * CREATE PRODUCT
     * @param {*} infor 
     * @returns 
     */
    async createProduct(infor = {}) {
        try {
            let category = await ServiceCategory.findCategoryById(infor.category);
            let product = await ModelProduct.create({
                productOwner: infor.productOwner,
                address: infor.address,
                contact: infor.contact,
                landArea: infor.landArea,
                price: infor.price,
                categories: category,
                thumbs: infor.thumbs
            })

            if(!product) {
                return { status: false, message: 'Create product unsuccess'};
            }
            
            category.products.unshift(product);
            await category.save();
            return { status: true, message: 'Create product success'};

        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE PRODUCT
     * @param {*} infor 
     * @returns 
     */
    async deleteProduct(infor = {}) {
        try {
            let product = await this.findProductById(infor.id);

            if(product.thumbs.length) {
                let thumbs = [];

                for(let thumb of product.thumbs) {
                    let thumbExtract = thumb.split('/');
                    let index = thumbExtract.findIndex((directory) => directory === environment.cloudinary.directory);
                    let thumbExtractResult = thumbExtract.slice(index).join('/').split('.')[0];

                    // CHECK IMAGE EXIT ON CLOUD
                    let {status } = await UtilCloudinary.exists(thumbExtractResult);
                    if(status) {
                        thumbs.push(thumbExtractResult);
                    }
                }
                
                // DELETE MANY THUMBS
                if(thumbs.length) {
                    await UtilCloudinary.destroyMany(thumbs);
                }
                
            }

            if(product.categories) {
                product.categories.products = product.categories.products.filter((pro) => pro.toString() !== product._id.toString());
                await product.categories.save();
            }

            await product.deleteOne();
            return {status: true, message: 'Delete category success'};

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceProduct();