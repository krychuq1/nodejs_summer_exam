class BaseController{
    constructor(model){
        this.model = model;
    }
    //get all objs form mongo
    getAll(){
       return this.model.find({});
    }
    //save obj in mongo
    create(obj){
        let objToSave = new this.model(obj);
        return objToSave.save();
    }
    getById(id){
        return this.model.findById(id);
    }
    deleteOne(id){
        return this.model.remove({_id: id});
    }
    updateOne(id, newObj){
        return this.model.findByIdAndUpdate(id, newObj, {new : true});
    }
}
export default BaseController;
