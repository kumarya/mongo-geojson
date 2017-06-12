const mongoose = require("mongoose")

before(done=>{
    //test database
    mongoose.connect('mongodb://info:zxc123@ds141490.mlab.com:41490/react')
    mongoose.connection
      .once('open', ()=>done())
      .on('error', err=>{
          console.warn('warning', err)
      })
})

beforeEach(done=>{
    const {drivers} = mongoose.connection.collections;
    drivers.drop()
      .then(()=>drivers.ensureIndex({'geometry.coordinates':'2dsphere'}))
      .then(()=>done())
      .catch(()=>done())
})