const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

//asserstion style

const expect = chai.expect;

chai.use(chaiHttp);


//describe our test

describe('User API', ()=> {
    it("User Created", (done)=>{
        chai.request(server)
        .post('/api/users')
        .end((err, response)=> {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys("user", "statusText");
            // expect(response.body).to.have.all.keys("user", "statusText", "list"); //need to fail
            done();
        })
    })
})

