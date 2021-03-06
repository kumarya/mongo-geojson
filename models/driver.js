const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PointSchema = new Schema({
    type:{
        type:String,
        default:'Point'
    },
    coordinates:{type:[Number], index:'2dsphere'}
})

const driverSchema = new Schema({
    email:{type:String, unique:true, lowercase:true, required:true},
    driving:{type:Boolean, default:false, required:true},
    geometry: PointSchema
})

const Driver = mongoose.model('Driver', driverSchema)

module.exports = Driver