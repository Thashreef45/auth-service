import { Schema, model } from 'mongoose'

const apexSchema: Schema = new Schema({
  apexId:String,
  nodalPoints: Array,
  employee: Array,
  password:String,
})

const apexmodel = model('apex', apexSchema)
export default apexmodel
