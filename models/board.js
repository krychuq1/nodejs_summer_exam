import db from '../database/databaseConnection';

class BoardModel{
    /**
     * Constructor:
     * - Define connection to database
     * - Define the table schema for user board
     */
    constructor(){
        this.mongoose = db.getMongoose();
        this.Schema = this.mongoose.Schema;
        this.createSchema();
        this.boardModel = this.mongoose.model('Board', this.boardSchema);

    }
    createSchema(){
        this.boardSchema = new this.Schema({
            requestReceiver: {
                type: String,
                required: true,
            },
            taskId: {
                type: this.mongoose.Schema.Types.ObjectId,
                ref: 'Task',
                required: true,
            },
            accepted: {
                type:Boolean,
                required: true
            },
            requestSender: {
                type: this.mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },

        },)
    }
    getModel(){
        return this.boardModel;
    }
}
const boardModel =  new BoardModel();

export default boardModel;

