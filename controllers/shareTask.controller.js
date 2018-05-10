import boardModel from '../models/board';
import BaseController from './base.controller';
import {decrypt} from '../services/encryption.service';
import taskController from "../controllers/task.controller";

import {encrypt} from '../services/encryption.service';
import userController from '../controllers/user.controller';
import forEachAsync from 'forEachAsync';
class ShareTaskController  extends BaseController {


    constructor() {
        super(boardModel.getModel());
        this.boardModel = boardModel.getModel();
    }

    shareTask(board) {

        let userObj = new this.boardModel(board);
        //save new model
        return userObj.save();
    }

    getShareTaskRequest(userEmail) {

        var requestSenders = [];
        var activity = [];

        return new Promise((resolve, reject) => {
            //array for storing promises
            let promises = [];
            let tasks = [];
            let decryptedemail = decrypt(userEmail);

            this.model.find({requestReceiver: decryptedemail}, (err, requests) => {
                if (err) return reject(err);
                //loop through requested tasks
                requests.forEach(requestedTask =>{
                    //create variable which holds promises
                    let promise = taskController.getById(requestedTask.taskId).then((task, err)=>{
                        if(task!=null){
                            tasks.push(task)

                        }
                    });
                    //push to promise array
                    promises.push(promise);

                });
                //when all promises are done
                Promise.all(promises).then(()=>{

                    //resole first promise :)

                    console.log("here");
                    resolve(tasks);
                })

                // taskController.getById()
                //tasks



                    // requests.forEach(err,request=>{

                        // userController.userModel.findOne({_id: request.requestSender}, (err, user) => {
                        //
                        //     requestSenders.push(user.companyName);
                    // });
                });
            });
        // });
    }
}
const shareTaskController = new ShareTaskController();
export default shareTaskController;