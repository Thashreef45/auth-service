import connectDB from "../../utils/db-connection";
import nodalmodel from "../../domain/nodal-model";

const nodalDb = connectDB()
const nodalModel = nodalDb.model('nodal',nodalmodel.schema)

export default {
    findNodal: async (id: string) => {
        return await nodalModel.findOne({ id: id })
    },
    
    createNodal: async (data: {id:string,phone:number,email:string,password:string,apex:string,address:string,pincode:number}) => {
        const { id, phone, email, password, apex ,address,pincode} = data
        const newNodal = new nodalModel({
            id, phone, email, password, apex , 
            address : {address:address,pincode:pincode}
        })
        await newNodal.save()
        return data
    },

    findByPin : async (pin:number) => {
        return await nodalModel.findOne({'address.pincode':pin})
    },

}



