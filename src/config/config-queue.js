"use strict"

const configQueue = {
    AUTH: {
        SIGNIN: {
            REDUCER_SIGNIN: 'AUTH-SIGNIN',
            COMSUMER_SIGNIN: 'REFLY-AUTH-SIGNIN'
        },
        SIGNOUT: {
            REDUCER_SIGNOUT: 'AUTH-SIGNOUT',
            COMSUMER_SIGNOUT: 'REFLY-AUTH-SIGNOUT'
        },
        SIGNUP: {
            REDUCER_SIGNUP: 'AUTH-SIGNUP',
            COMSUMER_SIGNUP: 'REFLY-AUTH-SIGNUP'
        },

        // ROLE
        ROLE: {
            REDUCER_ROLE: 'AUTH-ROLE',
            COMSUMER_ROLE: 'REFLY-AUTH-ROLE'
        },
        UPDATE_ROLE: {
            REDUCER_UPDATE_ROLE: 'AUTH-UPDATE-ROLE',
            COMSUMER_UPDATE_ROLE: 'REFLY-AUTH-UPDATE-ROLE'
        },
        DELETE_ROLE: {
            REDUCER_DELETE_ROLE: 'AUTH-DELETE-ROLE',
            COMSUMER_DELETE_ROLE: 'REFLY-AUTH-DELETE-ROLE'
        },
        // USER
        USER: {
            REDUCER_USER: 'AUTH-USER',
            COMSUMER_USER: 'REFLY-AUTH-USER'
        },
        UPDATE_USER: {
            REDUCER_UPDATE_USER: 'AUTH-UPDATE-USER',
            COMSUMER_UPDATE_USER: 'REFLY-AUTH-UPDATE-USER'
        },
        DELETE_USER: {
            REDUCER_DELETE_USER: 'AUTH-DELETE-USER',
            COMSUMER_DELETE_USER: 'REFLY-AUTH-DELETE-USER'
        }
    },
    CATEGORY: {
        NEW: {
            PRODUCER: "NEW-CATEGORY",
            CONSUMER: "REFLY-NEW-CATEGORY"
        },
        UPDATE: {
            PRODUCER: "UPDATE-CATEGORY",
            CONSUMER: "REFLY-UPDATE-CATEGORY"
        },
        DELETE: {
            PRODUCER: "DELETE-CATEGORY",
            CONSUMER: "REFLY-DELETE-CATEGORY"
        }
    },
    PRODUCT:{
        NEW: {
            PRODUCER: "NEW-PRODUCT",
            CONSUMER: "REFLY-NEW-PRODUCT"
        },
        UPDATE: {
            PRODUCER: "UPDATE-PRODUCT",
            CONSUMER: "REFLY-UPDATE-PRODUCT"
        },
        DELETE: {
            PRODUCER: "DELETE-PRODUCT",
            CONSUMER: "REFLY-DELETE-PRODUCT"
        }
    }
}

module.exports = configQueue;