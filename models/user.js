import db from '../database/databaseConnection';

class UserModel{
    /**
     * Constructor:
     * - Define connection to database
     * - Define the table schema for users
     */
    constructor(){
        this.mongoose = db.getMongoose();
        this.Schema = this.mongoose.Schema;
        this.createSchema();
        this.userModel = this.mongoose.model('User', this.userSchema);

    }
    createSchema(){
        this.userSchema = new this.Schema({
            companyName: {
                type: String,
                validate: /^[a-zA-Z0-9]{2,}$/,
                minLength:2
            },
            email: {
                type: String,
                validate: /^[a-zA-Z0-9._@+]{5,}$/,
                minLength: 5,
                maxLength: 40,
                required: true,
                unique: true
            },
            password: {
                type:String,
                validate: /[0-9a-zA-Z]$/,
                minLength:6,
                maxLength: 50,
                required: true
            },
            token:{
                type:String,
                required: false
            },

            resetPasswordToken: {
                type: String
            },
            resetPasswordExpires: {
                type: Date
            },

            loginAttempts: {
                type: Number,
                default: 0
            },
            startTime: {
                type: Date, index: true
            },
            endTime: {
                type: Date
            },
            lockUntil: {
                type:Date,
                default: new Date()
            },
            image: {
                type: String
            },
            role: {
                type: String,

            }

        }, {versionKey: false})
    }
    getModel(){
        return this.userModel;
    }
}
const userModel =  new UserModel();

export default userModel;
