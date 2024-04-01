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
        DELETE_ROLE: {
            REDUCER_DELETE_ROLE: 'AUTH-DELETE-ROLE',
            COMSUMER_DELETE_ROLE: 'REFLY-AUTH-DELETE-ROLE'
        }
    }
}

module.exports = configQueue;