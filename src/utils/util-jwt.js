const jwt = require('jsonwebtoken');

class JWT {

    serect = 'booking_application_website_366110';

    constructor() { }

    sign(infor = {}, privateKey = '', type = '') {
        return jwt.sign({data: infor}, privateKey, { algorithm: 'RS256', expiresIn: type === 'AccessToken'? '1 days' : '7 days'});
    }

    verify(token, publicKey, cb) {
        try {
            let result = jwt.verify(token, publicKey, { algorithms: ['RS256']});

            console.log("Result verify token");
            console.log(result);
            cb({status: true});
            
        } catch(error) {
            
            console.log("Error verify token");
            console.log(error);
            cb({status: false});
        }
    }
}

module.exports = new JWT();