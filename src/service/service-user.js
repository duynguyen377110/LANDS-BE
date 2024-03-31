"use strict"
const ServiceRole = require("./service-role");
const ModelUser = require("../model/model-user");

class ServiceUser {

    constructor() { }


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
                password: infor.password,
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
}

module.exports = new ServiceUser();