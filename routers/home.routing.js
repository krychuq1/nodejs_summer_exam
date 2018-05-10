/**
 * Created by Palko on 03/03/2018.
 */
import express from 'express';
let homeRouter = express.Router();
import jwt from 'jsonwebtoken';
import userController from '../controllers/user.controller';
import {checkTokenValidity} from '../services/token.service';

homeRouter.post('',checkTokenValidity, function(req, res) {
        if (req.user) {

           return res.send(req.user);
        }
       return res.sendStatus(310);
});



export default homeRouter;

