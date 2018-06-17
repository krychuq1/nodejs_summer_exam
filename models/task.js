import db from '../database/databaseConnection';

class TaskModel{
    /**
     * Constructor:
     * - Define connection to database
     * - Define the table schema for tasks
     */
    constructor(){
        this.mongoose = db.getMongoose();
        this.Schema = this.mongoose.Schema;
        this.createSchema();
        this.taskModel = this.mongoose.model('Task', this.taskSchema);

    }
    createSchema(){
        this.taskSchema = new this.Schema({
            title: {
                type: String,
                required: true,
            },
            postedBy: {
                type: this.mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            author: {
                type:String,
                required: true
            },
            deadline: {
                type: Date
            },
        }, {versionKey: false, timestamps: true})
    }
    getModel(){
        return this.taskModel;
    }
}
const taskModel =  new TaskModel();

export default taskModel;

