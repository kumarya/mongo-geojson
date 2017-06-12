const Driver = require("../models/driver")

module.exports = {
    home(req, res, next){
        
        res.send({hi: "welcome"})
        
    },
    
    index(req, res, next){
        const {lng, lat} = req.query
        
        Driver.geoNear(
            {type:'Point', coordinates:[parseFloat(lng), parseFloat(lat)]},
            {spherical:true, maxDistance:200000 }
            
        )
          .then(drivers=>res.send(drivers))
          .catch(next)
          
    },
    
    create(req, res, next){

        Driver.create(req.body)
          .then((driver)=>{
              res.send(driver)
          })
          .catch(next)
        
    },
    
    edit(req, res, next){
        const id = req.params.id
        
        
        Driver.findByIdAndUpdate(id, req.body, {new:true})
          .then((driver)=>{
              res.send(driver)
              
          })
          .catch(next)
        
    },
    
    delete(req, res, next){
        const id = req.params.id
        
        Driver.findByIdAndRemove(id)
          .then((driver)=>{
              res.status(204).send(driver)
              
          })
          .catch(next)
    }
    
    
}