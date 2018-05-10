import taskModel from '../models/task';
import BaseController from './base.controller';
class TaskController  extends BaseController{


    constructor(){
        super(taskModel.getModel());
        this.taskModel = taskModel.getModel();
    }
    getuserstasks(userId){
        console.log(this.taskModel.find({postedBy: userId}));
        return this.taskModel.find({postedBy: userId});
    }
   findOne(id){
        return this.model.findById(id);
   }

    deleteOne(id, userId){
        //create promise
        return new Promise((resolve, reject) => {
            //get task which we want to delete
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