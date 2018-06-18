import express from 'express';
import Swagger from '../services/swagger.service';

/**
 * Defining swagger router
 * @type {Router|router|*}
 */
const router = express.Router();
const swagger = new Swagger();

router.get('/json', function(req, res) {
    res.send(swagger.swaggerSpec);
});

export default router;