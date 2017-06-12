const mongoose = require("mongoose")
const DriversController = require("./controllers/drivers_controllers")


module.exports = (app)=>{
    app.get('/api', DriversController.home)
    
    app.post('/api/newdriver', DriversController.create)
    
    app.put('/api/drivers/:id/edit', DriversController.edit)
    
    app.delete('/api/drivers/:id/delete', DriversController.delete)
    
    app.get('/api/drivers', DriversController.index)
    
}