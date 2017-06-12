const assert = require("assert")
const request = require("supertest")
const mongoose = require("mongoose")

const app = require("../../index")



const Driver = mongoose.model('Driver')
    

describe('Testing Drivers Controller', ()=>{
    
   xit('Post to /api/drivers creates a new driver', (done) => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  
  it('PUT to api/drivers/:id/edit edit ', (done)=>{
    
    const driver = new Driver({email:'t@tmail.com'})
    driver.save()
      .then(()=>{
        request(app)
          .put(`/api/drivers/${driver._id}/edit`)
          .send({driving:true})
          .end(()=>{
            Driver.findOne({email:'t@tmail.com'})
              .then(driver=>{
                assert(driver.driving === true)
                done()
              })
          })
      })
    
    
  })
  
  it('DELELTE /api/drivers/:id/delete delete', (done)=>{
    
    const driver = new Driver({email:"test@gmail.com"})
    
    driver.save()
      .then(()=>{
        request(app)
          .delete(`/api/drivers/${driver._id}/delete`)
          .end(()=>{
            Driver.findOne({email:"test@gmail.com"})
              .then((driver)=>{
                assert(driver === null)
                done()
              })
          })
      })
    
    
  })
  
  it('GET /api/drivers find drivers in ur locations', (done)=>{
    
    const seaDriver = new Driver({email:"sea@gmail.com", geometry:{type:'Point', coordinates:[-122.4759902, 47.6147628]}})
    const miamDriver = new Driver({email:'miami@gmail.com', geometry:{type:'Point', coordinates:[-80.253, 25.791]}})
    Promise.all([seaDriver.save(), miamDriver.save()])
      .then(()=>{
        request(app)
          .get(`/api/drivers?lng=-80&lat=25`)
          .end((err, response)=>{
            assert(response.body.length === 1)
            assert(response.body[0].obj.email === 'miami@gmail.com')
            done()
          })
      })
  })
    
    
})