import taskModel from '../models/task';
import BaseController from './base.controller';
class TaskController  extends BaseController{
    /**
     * Constructor:
     * super() defining taskModel as parent object
     */
    constructor(){
        super(taskModel.getModel());
        this.taskModel = taskModel.getModel();
    }
    findOne(id){
        return this.model.findById(id);
    }
    getTaskByUserId(userId){
        //console.log(this.taskModel.find({postedBy: userId}));
        return this.taskModel.find({postedBy: userId});
    }
    deleteOne(id, userId){
        //create promise
        return new Promise((resolve, reject) => {
            //find and return the task which we want to delete
            this.model.findById(id, (err, obj)=>{
                if(err || obj === null){
                    reject(err);
                }else{
                    if(JSON.stringify(userId) === JSON.stringify(obj.postedBy)){
                        this.model.remove({_id: id}).then((deleted, err)=>{
                            if(err)
                                reject(err);
                            resolve(deleted);
                        });
                    }else{
                        reject(err);
                    }
                }
            });
        });
    }

}
const taskController = new TaskController();
export default taskController;