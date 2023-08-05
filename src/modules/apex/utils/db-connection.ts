import {createConnection} from "mongoose";
import env from 'dotenv'
env.config()

const connectDB = ()=>{
    const connection = createConnection(String(process.env.APEX_DB))
    connection.on('connected',()=>{
        console.log('auth-service--apex-db connected')
    })
    connection.on('error', (err) => {
        console.error('auth-service--apex-db connection failed');
    });

    return connection
}

export default connectDB