import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

import apexLogin from '../modules/apex/application/usecase/login';
import nodalSignup from '../modules/nodal/application/usecase/create-nodal';
import nodalLogin from '../modules/nodal/application/usecase/nodal-login';
import cpLogin  from '../modules/channel-partner/application/usecase/login';
import createCP from '../modules/channel-partner/application/usecase/createCP';
import { apexAuth,nodalAuth,cpAuth} from '../auth-middleware/middleware/middlewares';

const packageDef = protoLoader.loadSync("./src/grpc-config/auth.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef)
const authPackage: any = grpcObject.authPackage;

const server = new grpc.Server()

const grpcServer = () => {
    server.bindAsync(String(process.env.GATE_WAY_PORT),
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (!err) {
                server.start();
                console.log("gRPC server started on port:", port)
            }
        }
    )
}

server.addService(authPackage.authService.service, {
    "apexLogin": apexLogin,
    "createNodal":nodalSignup,
    "nodalLogin":nodalLogin,
    "cpLogin":cpLogin,
    "createCP":createCP,
    "apexAuth":apexAuth,
    "nodalAuth":nodalAuth,
    "cpAuth":cpAuth,
})


export default grpcServer

