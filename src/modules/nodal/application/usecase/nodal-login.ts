import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken";
import repository from '../../infrastructure/repositories/repository';


const nodalLogin = async (call: any, callback: any) => {
    try {
        let data = call.request
        const nodalExist = await repository.findNodal(data.id)
        if (nodalExist) {
            if (await compare(data.password, nodalExist.password)) {
                callback(null,{ message: "success", token: sign({ id: data.id,administration:"nodal"}, String(process.env.JWT_SIGNATURE), { expiresIn: '24h' }) ,status:200})
            }else{
                callback(null,{ message: "Wrong password",status:401 })
            }
        }else{
            callback(null,{ message: "Nodal not exist" ,status:404})
        }

    } catch (error) {
        console.log(error)
    }
}

export default nodalLogin