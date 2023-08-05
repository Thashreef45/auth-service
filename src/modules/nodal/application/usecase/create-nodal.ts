import { hash } from 'bcrypt'
import { verify } from "jsonwebtoken";
import repository from '../../infrastructure/repositories/repository';


const nodalSignup = async (call: any, callback: any) => {
    try {
        let data = call.request
        let token: string = data.token.split(" ")[1]
        const nodalExist = await repository.findNodal(data.id)
        const pincodeAvailable = await repository.findByPin(data.pincode)
        const isApex = verify(token, String(process.env.JWT_SIGNATURE))
        if (!nodalExist && !pincodeAvailable) {
            if (typeof isApex === 'object' && isApex.administration == 'apex') {
                data.password = await hash(data.password, 10)
                const resData = await repository.createNodal(data)
                callback(null, { message: 'success', status: 200 })
            } else {
                callback(null, { message: 'Apex not authorized', status: 401 })
            }
        } else {
            callback(null, { message: 'Nodal Point Already Exist', status: 409 })
        }
    } catch (error) {
        console.log(error)
    }
}

export default nodalSignup