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
        }
    }
}

module.exports = configQueue;