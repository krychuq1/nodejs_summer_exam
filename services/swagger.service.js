import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from '../swaggerConfig';

class Swagger {
    constructor() {
        // swagger options
        this.options = swaggerConfig;
        this.swaggerUi = swaggerUi;
        this.init();
    }
    /**
     * Initialize method
     */
    init() {
        this.swaggerSpec = swaggerJSDoc(this.options);
    }
}
export default Swagger;