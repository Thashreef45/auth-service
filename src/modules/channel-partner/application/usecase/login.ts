import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import repository from '../../infrastructure/repositories/repository'



const cpLogin = async (call: any, callback: any) => {
    try {
        const { id, password } = call.request
        const cpExist = await repository.cpLogin(id)
        if (cpExist) {
            if (await compare(password, cpExist.password)) {
                callback(null, { message: "success", token: sign({ id: id, administration: "channelPartner" }, String(process.env.JWT_SIGNATURE), { expiresIn: '24h' }), status: 200 })
            } else {
                callback(null, { message: "Wrong password", status: 401 })
            }
        } else {
            callback(null, { message: "CP not exist", status: 404 })
        }
    } catch (error) {
        console.log(error)
    }
}

export default cpLogin

