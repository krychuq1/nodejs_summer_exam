import config from '../config';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

class DbConnection{

    constructor(){
        mongoose.Promise = bluebird;
        this.connectToDb();
    }
    connectToDb(){
        mongoose.connect(config.mongoUrl,
             (err)=> {if(err) throw err;
            });
    }
    getMongoose(){
        return mongoose;
    }

}
const  db = new DbConnection();
export default db;