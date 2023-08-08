import cpmodel from "../../domain/entities/cp-model"
import connectDB from "../../utils/db-connection"

const cpDB = connectDB()
const cpModel = cpDB.model('channel-partner',cpmodel.schema)

export default {
    cpLogin : async(id:string) =>{
        return await cpModel.findOne({id:id})
    },

    findById : async(id:string)=>{
        return await cpModel.findOne({id:id},{password:0})
    },

    findByPin :async (pin:number) => {
        return await cpModel.findOne({'address.pincode':pin},{password:0})
    },
    
    createCP : async(data:{pincode: Number,address: String,nodalPoint: String,phone: Number,email: String,password:String,apex:String,}) =>{
        const {address,pincode , nodalPoint , apex , phone , email , password} = data
        const newCP = new cpModel({
            address:{
                address:address,
                pincode : pincode
            },nodalPoint , apex , phone , email , password
        })
        newCP.save()
        return data
    },

} 
