import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
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
    "apexAuth":apexAuth,
    "nodalAuth":nodalAuth,
    "cpAuth":cpAuth,
})



export default grpcServer

