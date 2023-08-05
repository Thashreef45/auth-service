import mongoose, {connect,createConnection} from "mongoose";
import env from 'dotenv'
env.config()

const connectDB = ()=>{
    const connection = createConnection(String(process.env.NODAL_DB))
    connection.on('connected',()=>{
        console.log('auth-service--nodal-db connected')
    })
    connection.on('error', (err) => {
        console.error('auth-service--nodal-db connection failed');
    });

    return connection
}

export default connectDB