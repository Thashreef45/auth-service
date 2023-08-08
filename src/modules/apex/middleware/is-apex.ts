import { verify } from "jsonwebtoken"

const apexMiddleware = (call:{request:{token?:string}}, callback:any) => {
    try {
        if (!call.request.token) callback(null, { message: 'Authorization token missing', status: 401 })
        else {
            try {
                const token:string = call.request.token.split(" ")[1]
                const decode : any = verify(token , String(process.env.JWT_SIGNATURE) )
                if(decode.administration != 'apex'){
                    callback(null,{message:'Access forbidden',status:403})
                }else{
                    callback(null,{message:'Token verified successfully',status:200})
                }
            } catch (error) {
                callback(null,{message:'Invalid token',status:401})
            }
        }
    } catch (error) {
        console.error(error)
    }
}