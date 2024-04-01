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
        }
    }
}

module.exports = configQueue;