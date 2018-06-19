class BaseController{
    constructor(model){
        this.model = model;
    }

    /**
     * return all objects from the database
     * @returns {all}
     */
    getAll(){
       return this.model.find({});
    }

    /**
     * Save a new object to the database
     * @param obj
     * @returns {status}
     */
    create(obj){
        let objToSave = new this.model(obj);
        return objToSave.save();
    }

    /**
     * Find and return an object from database by id
     * @param id
     * @returns {Query}
     */
    getById(id){
        return this.model.findById(id);
    }

    /**
     * Find and delete an object based on id
     * @param id
     * @returns {*}
     */
    deleteOne(id){
        return this.model.remove({_id: id});
    }

    /**
     * Update all data of an object if it is found by id
     * @param id
     * @param newObj
     * @returns {Query}
     */
    updateOne(id, newObj){
        return this.model.findByIdAndUpdate(id, newObj, {new : true});
    }
}
export default BaseController;
