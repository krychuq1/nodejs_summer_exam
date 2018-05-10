import express from 'express';
import taskController from "../controllers/task.controller";
import {checkTokenValidity} from '../services/token.service';
import htmlencode from 'htmlencode';
//define router
let taskRouter = express.Router();
let widget = new htmlencode.Encoder('string');

/**
 * @swagger
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *      - title
 *      - description
 *      - author
 *      - token
 *      properties:
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          author:
 *              type: string
 */
/**
 * @swagger
 * /tasks:
 *  post:
 *      tags:
 *      - task
 *      summary: create task
 *      description: create task
 *      parameters:
 *      - in: body
 *        name: task
 *        schema:
 *           $ref: '#/definitions/Task'
 *      - in: header
 *        name: X-Access-Token
 *        schema:
 *          type: string
 *      responses:
 *          201:
 *              description: ok
 *
 */
taskRouter.post('/', checkTokenValidity, (req, res)=> {

    req.body['postedBy'] = req.user._id;

    taskController.create(req.body).then((created, err)=>{
        if(err)
            res.status(400).send(err);
        res.send(created);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

/**
 * @swagger
 * /tasks:
 *  get:
 *      tags:
 *      - task
 *      summary: get all tasks
 *      description: get all tasks
 *      responses:
 *          201:
 *              description: ok
 *
 */
taskRouter.get('/', function(req, res) {
    taskController.getAll().then((tasks, err)=>{
        var encodedTasks = [];
        if(err)
            res.status(400).send(err);
        tasks.forEach(function (task) {
            let encodedTask = {
                _id: task._id,
                title: widget.htmlEncode(task.title),
                description: widget.htmlEncode(task.description),
                author: widget.htmlEncode(task.author)
            };
            encodedTasks.push(encodedTask);
        });
        res.json({tasks: encodedTasks});
    }).catch((e)=>{
        res.status(400).send(e.errmsg);
    });
});

/**
 * @swagger
 * /tasks/user:
 *  get:
 *      tags:
 *      - task
 *      summary: get all user's tasks
 *      description: get all user's tasks
 *      parameters:
 *      - in: header
 *        name: X-Access-Token
 *        schema:
 *          type: string
 *      responses:
 *          201:
 *              description: ok
 *
 */

taskRouter.get('/user', checkTokenValidity, function(req, res) {

    taskController.getuserstasks(req.user._id).then((tasks, err)=>{
        var encodedTasks = [];
        if(err)
            res.status(400).send(err);
        tasks.forEach(function (task) {
            let encodedTask = {
                _id: task._id,
                title: widget.htmlEncode(task.title),
                description: widget.htmlEncode(task.description),
                author: widget.htmlEncode(task.author)
            };
            encodedTasks.push(encodedTask);
        });
        res.json({tasks: encodedTasks});
    }).catch((e)=>{
        res.status(400).send(e.errmsg);
    });
});

/**
 * @swagger
 * /tasks/{taskId}:
 *  delete:
 *      tags:
 *      - task
 *      summary: delete specific task
 *      description: delete specific task based on id
 *      parameters:
 *      - in: path
 *        name: taskId
 *        schema:
 *          type: string
 *      - in: header
 *        name: X-Access-Token
 *        schema:
 *          type: string
 *      responses:
 *          200:
 *              description: ok
 */
taskRouter.delete('/:taskId', checkTokenValidity, function (req, res) {
    taskController.deleteOne(req.params.taskId, req.user._id).then((deleted, err)=> {
        res.send(deleted);
    }, err=>{
        res.status(400).send(err);

    });
    //     .then((deleted, err)=>{
    //     if(err)
    //         res.status(400).send(err);
    //     res.send(deleted);
    // }).catch((e)=>{
    //     res.status(400).send(e.errmsg);
    // });
});

/**
 * @swagger
 * /tasks/{taskId}:
 *  get:
 *      tags:
 *      - task
 *      summary: get specific task
 *      description: get specific task based on id
 *      parameters:
 *      - in: path
 *        name: taskId
 *        schema:
 *          type: string
 *      - in: header
 *        name: X-Access-Token
 *        schema:
 *          type: string
 *      responses:
 *          200:
 *              description: ok
 */
taskRouter.get('/:id', checkTokenValidity,function (req, res) {
    console.log('you are gonan update this ', req.params.id);
    taskController.findOne(req.params.id).then((task, err) => {
        if(err)
            res.status(400).send(err);
        res.send(task);
    })
});

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *      tags:
 *      - task
 *      summary: update specific task
 *      description: update specific task based on id
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *      - in: body
 *        name: task to update
 *        schema:
 *           $ref: '#/definitions/Task'
 *      responses:
 *          200:
 *              description: ok
 */
taskRouter.put('/:id', checkTokenValidity, function (req, res) {
    taskController.updateOne(req.params.id, req.body).then((updated, err)=>{
        if(err)
            res.status(400).send(err);
        res.send(updated);
    }).catch((e)=>{
        res.status(400).send(e.errmsg);
    });
});



export default taskRouter;