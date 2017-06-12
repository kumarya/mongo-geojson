const assert = require("assert")
const request = require("supertest")
const app = require("../index")


describe('TESTING EXPRESS APP', ()=>{
    
    it('handles a GET request /api', (done)=>{
        
        request(app)
          .get('/api')
          .end((err, response)=>{
              assert(response.body.hi === 'welcome')
              done()
          })
        
        
    })
    
    
})