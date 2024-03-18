"use strict"

const configConstantSwagger = {

    commonAccessSignup: {
        post: {
            summary: 'Post Common Signup API',
            description: 'Endpoint client signup account request',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Successful operation',
                    content: {
                        'application/json': {
                            example: { message: 'This is the response from POST /example' }
                        }
                    }
                }
            }
        }
    }
}

module.exports = configConstantSwagger;