import { hash } from "bcrypt"
import repository from "../../infrastructure/repositories/repository"

const createCP = async (call:any,callback:any) => {
    try {
        const data = call.request
        console.log(Number(data.phone),'phone >>>7')
        data.token = data.token.split(" ")[1]
        console.log(data,"data --8")
        // const cpIdExist = await repository.findById(data.id)
        // const cpPinExist = await repository.findByPin(data.address.pincode)
        // if (!cpIdExist && !cpPinExist) {
        //     data.password = await hash(data.password, 10)
        //     const response = await repository.createCP(data)
        //     callback (null,{ message: 'success', status:200})
        // } callback (null,{ message: 'CP already exist' ,status:409})
        callback (null,{ message: 'success', status:200})
    } catch (error) {
        console.log(error)
    }
}

export default createCP