const express = require("express")

const app = express()
const mongoose = require("mongoose")

const bodyParser = require("body-parser")
const router = require("./router")

mongoose.Promise = global.Promise

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://info:zxc123@ds115411.mlab.com:15411/mongo')
    
}



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
router(app)

app.use((err, req, res, next)=>{
    res.status(422).send({error:err.message})
    
    
    
})




module.exports = app

app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('Server INITNIA')
})