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

        // ROLE
        ROLE: {
            REDUCER_ROLE: 'AUTH-ROLE',
            COMSUMER_ROLE: 'REFLY-AUTH-ROLE'
        },
        ALL_ROLE: {
            REDUCER_ALL_ROLE: 'AUTH-ALL-ROLE',
            COMSUMER_ALL_ROLE: 'REFLY-AUTH-ALL-ROLE'
        },
        GET_ROLE_BY_ID: {
            REDUCER_GET_ROLE_BY_ID: 'AUTH_GET-ROLE-BY-ID',
            COMSUMER_GET_ROLE_BY_ID: 'REFLY-AUTH_GET-ROLE-BY-ID'
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
        ALL_USER: {
            REDUCER_ALL_USER: 'AUTH-ALL-USER',
            COMSUMER_ALL_USER: 'REFLY-AUTH-ALL-USER'
        },
        GET_USER_BY_ID: {
            REDUCER_GET_USER_BY_ID: 'AUTH_GET-USER-BY-ID',
            COMSUMER_GET_USER_BY_ID: 'REFLY-AUTH_GET-USER-BY-ID'
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
    PRODUCT: {
        CATEGORY: {
            REDUCER_CATEGORY: 'PRODUCT-ROLE',
            COMSUMER_CATEGORY: 'REFLY-PRODUCT-ROLE'
        }
    }
}

module.exports = configQueue;