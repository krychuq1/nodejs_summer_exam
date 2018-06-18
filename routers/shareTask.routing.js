import express from 'express';
import {checkTokenValidity} from '../services/token.service';
import shareTaskController from "../controllers/shareTask.controller";

let shareTaskRouter = express.Router();
shareTaskRouter.post('/:id', checkTokenValidity, (req, res)=> {

    req.body['requestSender'] = req.user._id;
    req.body['taskId'] = req.body.taskId;

    shareTaskController.shareTask(req.body).then((created, err)=>{
        res.send(created);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

shareTaskRouter.get('/requests',checkTokenValidity, function(req, res) {
    shareTaskController.getShareTaskRequest(req.user.email).then((tasks,err)=>{
        if(err){
            res.send(400);
        }
        res.json({tasks: tasks});
    });
});

export default shareTaskRouter;