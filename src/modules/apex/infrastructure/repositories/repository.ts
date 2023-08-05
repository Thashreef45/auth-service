import apexmodel from "../../domain/entities/apexModel"
import connectDB from "../../utils/db-connection"

const apexDb = connectDB()
const apexModel = apexDb.model('apex',apexmodel.schema)

export default {
    ApexLogin: async (id: string, password: string) => {
        return await apexModel.findOne({apexId:id})
    },
}