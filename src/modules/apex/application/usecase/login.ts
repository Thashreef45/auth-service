import repository from '../../infrastructure/repositories/repository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const apexLogin = async (call: any, callback: any) => {
    try {
        const { id, password } = call.request
        const apex = await repository.ApexLogin(id, password)
        if (apex) {
            if (await compare(password, apex.password)) {
                callback(null, { message: 'success', token: sign({ id: apex.id, administration: "apex" }, String(process.env.JWT_SIGNATURE), { expiresIn: '24h' }), status: 200 })
            } else {
                callback(null, { message: 'Incorrect Password', status: 401 })
            }
        } else {
            callback(null, { message: 'Apex not found', status: 404 })
        }
    } catch (error) {
        console.log(error)
    }
}

export default apexLogin