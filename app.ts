import express,{Application} from 'express'
import helmet from 'helmet';
import nocache from 'nocache';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import env from 'dotenv';
import grpcServer from './src/grpc-config/grpc-server';


class Server{
    public app:Application
    constructor(){
        env.config()
        this.app = express()
        this.initialiseMiddleware()
        this.initiliseGatewayListner()

    }

    private initialiseMiddleware():void{
        this.app.use(cors())
        this.app.use(helmet());
        this.app.use(nocache())
        this.app.use(compression())
        this.app.use(logger('dev'))
        this.app.use(express.json());
    }

    private initiliseGatewayListner():void{
        grpcServer()
    }

    public start(port:string):void{
        this.app.listen(port,()=>console.log(`auth service running at ${port}`))
    }
}

export default Server