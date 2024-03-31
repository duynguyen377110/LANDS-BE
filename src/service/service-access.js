"use strict"
const ModelAccess = require("../model/model-access");
const ServiceUser = require("../service/service-user");
const UtilBcrypt = require("../utils/util-bcrypt");
const UtilCrypto = require("../utils/util-crypto");
const UtilJwt = require("../utils/util-jwt");

class ServiceAccess {

    constructor() { }

    /**
     * CREATE USER ACCESS
     * @param {*} user 
     * @param {*} publicKey 
     * @param {*} accessToken 
     * @param {*} refreshToken 
     * @returns 
     */
    async createUserAccess(user = {}, publicKey = '', accessToken = "", refreshToken = '') {
        try {
            return await ModelAccess.create({
                user, publicKey, accessToken, refreshToken, status: true
            })

        } catch (error) {
            throw error;
        }
    }

    async clearUserAccess() { }

    async findUserAccessByUserModel(user = {}) {
        try {
            return await ModelAccess
                        .findOne({
                            user: {$eq: user}
                        })
                        .populate({
                            path: 'user'
                        })
                        .exec();

        } catch (error) {
            throw error;
        }
    }

    async userSignin(infor = {}) {
        try {
            let user = await ServiceUser.findUserByEmail(infor.email);

            if(!user) {
                return { status: false, message: 'Not found user'};
            }

            let comparePassword = UtilBcrypt.compare(infor.password, user.password);

            if(!comparePassword) {
                return { status: false, message: 'Password not match'};
            }

            let access = await this.findUserAccessByUserModel(user);

            if(!access) {
                access = {};

                let { publicKey, privateKey } = UtilCrypto.generateKeyPairSync();
                let accessToken = UtilJwt.sign({
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    address: infor.address
                }, privateKey, 'AccessToken');

                let refreshToken = UtilJwt.sign({
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    address: infor.address
                }, privateKey, 'RefreshToken');

                access = await this.createUserAccess(user, publicKey, accessToken, refreshToken);
            }

            return {
                status: true,
                message: 'signin success',
                access
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceAccess();