import express from 'express';
import {checkTokenValidity} from '../services/token.service';

let homeRouter = express.Router();

homeRouter.post('',checkTokenValidity, function(req, res) {
        if (req.user) {

           return res.send(req.user);
        }
       return res.sendStatus(310);
});


export default homeRouter;

