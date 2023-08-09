import repository from '../../infrastructure/repositories/repository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import {ApexLoginRequest,ApexLoginResponse} from '../interface/apex-types'

const apexLogin = async (call:ApexLoginRequest, callback: (error:Error| null,response:ApexLoginResponse)=>void) => {
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
        if(error instanceof Error){
            callback(error, { message: 'Internal Server Error', status: 500 });
        }
    }
}

export default apexLogin 