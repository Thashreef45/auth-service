import {connect} from "mongoose";

const connectDB = ()=>{
    connect('').then(()=>{
        console.log('auth-service--cp-db connected')
    })
}