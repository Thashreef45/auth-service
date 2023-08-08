import { Schema, model } from 'mongoose'

const cpModel: Schema = new Schema({
  id:String,
  email: String,
  password:String,
  name:String,
  employee: Array,
  nodalPoint: String,
})

const cpmodel = model('channel-partner', cpModel)
export default cpmodel
