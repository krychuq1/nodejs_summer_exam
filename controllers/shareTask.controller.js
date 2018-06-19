import boardModel from '../models/board';
import BaseController from './base.controller';
import {decrypt} from '../services/encryption.service';
import taskController from "../controllers/task.controller";

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
                    resolve(tasks);
                })
            });
        });
    }
}
const shareTaskController = new ShareTaskController();
export default shareTaskController;