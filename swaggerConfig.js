let swaggerConfig = {
    swaggerDefinition: {
        info: {
            title: 'WebSecurity',
            version: '1.0.0',
            description: 'This is API for school project'
        },
        basePath: '/',
        host: '',
        schemes: ['http'],
        produces: ['application/json'],
        consumes: ['application/json'],
    },
    apis: ['./routers/*.js'], // Path to the API docs
};

export default swaggerConfig;