import express from 'express';
import Swagger from '../services/swagger.service';

const router = express.Router();
const swagger = new Swagger();

router.get('/json', function(req, res) {
    res.send(swagger.swaggerSpec);
});

export default router;