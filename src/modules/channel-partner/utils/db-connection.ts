import mongoose, {connect,createConnection} from "mongoose";
import env from 'dotenv'
env.config()

const connectDB = ()=>{
    const connection = createConnection(String(process.env.CP_DB))
    connection.on('connected',()=>{
        console.log('auth-service--CP-db connected')
    })
    connection.on('error', (err) => {
        console.error('auth-service--CP-db connection failed');
    });

    return connection
}

export default connectDB