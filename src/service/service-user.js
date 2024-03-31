"use strict"
const ModelUser = require("../model/model-user");
const ServiceRole = require("./service-role");
const UtilBcrypt = require("../utils/util-bcrypt");

class ServiceUser {

    constructor() { }

    /**
     * GET ALL USER
     * @returns 
     */
    async getAll() {
        try {
            return await ModelUser
                        .find({})
                        .populate([
                            {
                                path: 'role'
                            }
                        ])
                        .lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET USER BY ID
     * @param {*} id 
     * @returns 
     */
    async getUserById(id = '') {
        try {
            return await ModelUser
                        .findById(id)
                        .populate([
                            {
                                path: 'role'
                            }
                        ])
                        .lean();

        } catch (error) {
            throw error;
        }
    }

    /**
     * FIND USER BY ID
     * @param {*} id 
     * @returns 
     */
    async findUserById(id) {
        try {
            return await ModelUser
                        .findById(id)
                        .populate([
                            {
                                path: 'role'
                            }
                        ])
                        .exec();
        } catch (error) {
            throw error;
        }
    }

    /**
     * FIND USER BY EMAIL
     * @param {*} email 
     * @returns 
     */
    async findUserByEmail(email = '') {
        try {
            return await ModelUser.findOne({email: {$eq: email}}).exec();
        } catch (error) {
            throw error;
        }
    }


    /**
     * CREATE USER
     * @param {*} infor 
     * @returns 
     */
    async createUser(infor = {}) {
        try {
            let role = await ServiceRole.findRoleById(infor.role);

            let user = await ModelUser.create({
                fullName: infor.fullName,
                email: infor.email,
                password: UtilBcrypt.has(infor.password),
                phone: infor.phone,
                address: infor.address,
                role
            })

            if(user) {
                role.users.push(user);
                await role.save();
                return {status: true, message: 'Create user success'};
            }
            return {status: false, message: 'Create user unsuccess'};

        } catch (error) {
            throw error;
        }
    }

    /**
     * UPDATE USER
     * @param {*} infor 
     * @returns 
     */
    async updateUser(infor = {}) {
        try {
            let user = await this.findUserById(infor.id);

            if(user) {
                if(user.role._id.toString() !== infor.role) {
                    let role = await ServiceRole.findRoleById(infor.role);
                    
                    if(role) {
                        user.role.users = user.role.users.filter((elm) => elm.toString() !== infor.id);
                        await user.role.save();

                        role.users.push(user);
                        await role.save();
                        user.role = role;
                    }
                }

                user.fullName = infor.fullName;
                user.email = infor.email;
                user.phone = infor.phone;
                user.address = infor.address;

                await user.save();
                return {status: true, message: 'Create user success'};
            }
            return {status: false, message: 'Create user unsuccess'};

        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE USER
     * @param {*} infor 
     * @returns 
     */
    async deleteUser(infor= {}) {
        try {
            let user = await this.findUserById(infor.id);
            if(!user) {
                return {status: false, message: 'Delete user unsuccess'};
            }
            
            user.role.users = user.role.users.filter((elm) => elm.toString() !== infor.id);
            await user.role.save();
            await user.deleteOne();
            return {status: true, message: 'Delete user success'};

        } catch(error) {
            throw error;
        }
    }
}

module.exports = new ServiceUser();