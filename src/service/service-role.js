"use strict"
const ModelRole = require("../model/model-role");

class ServiceRole {

    constructor() { }

    /**
     * GET ALL ROLE
     * @returns 
     */
    async getAllRole() {
        try {
            return await ModelRole.find({}).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET ROLE BY ID
     * @param {*} id 
     * @returns 
     */
    async getRoleById(id = '') {
        try {
            return await ModelRole.findById(id).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * FIND ROLE BY ID
     * @param {*} id 
     * @returns 
     */
    async findRoleById(id = '') {
        try {
            return await ModelRole.findById(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * CREATE ROLE
     * @param {*} infor 
     * @returns 
     */
    async createRole(infor = {}) {
        try {
            return await ModelRole.create({title: infor.title});
        } catch (error) {
            throw error;
        }
    }

    /**
     * UPDATE ROLE
     * @param {*} infor 
     * @returns 
     */
    async updateRole(infor = {}) {
        try {
            let role = await this.findRoleById(infor.id);
            
            if(!role) {
                return {status: false, message: 'Update role unsuccess'};
            }
            role.title = infor.title;
            await role.save();
            return {status: true, message: 'Update role success'};

        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE ROLE
     * @param {*} infor 
     * @returns 
     */
    async deleteRole(infor = {}) {
        try {
            await ModelRole.findOneAndDelete({_id: {$eq: infor.id}});
            return { status: true, message: 'Delete role success'};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceRole();