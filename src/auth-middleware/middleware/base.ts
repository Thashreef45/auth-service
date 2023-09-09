import { JsonWebTokenError, verify } from "jsonwebtoken"
import { GRPCCall, CallbackFunction } from "../interface/types"

const authMiddleware = (administration: string) => {
    return (call: GRPCCall, callback: CallbackFunction) => {
        try {
            if (call.request.token) {
                try {
                    const token: string = tokenSplit(String(call.request.token))
                    const decode: any = verifyToken(token, String(process.env.JWT_SIGNATURE))
                    if (decode.administration == administration) {
                        callback(null, { message: 'Token verified successfully', status: 200,id:decode.id })
                    } else {
                        callback(null, { message: 'Access forbidden', status: 403 })
                    }
                } catch (error) {
                    callback(null, { message: 'Invalid token', status: 401 })
                }
            }
            else {
                callback(null, { message: 'Authorization token missing', status: 401 })
            }
        } catch (error) {
            console.error(error)
        }
    }

}



//splits token and `Bearer` and return token
const tokenSplit = (token: string) => {
    return token.split(" ")[1]
}


//Token verification 
const verifyToken = (token: string, signature: string) => {
    try {
        return verify(token, signature)
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new Error('Invalid token');
        }
    }
}



export default authMiddleware