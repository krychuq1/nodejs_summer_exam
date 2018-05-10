/**
 * Created by Palko on 06/02/2018.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);


describe('/POST signup', () => {
    it('user should create account', (done) => {
    let a = {
        companyName: "test1",
        email: "test1",
        password: "test1",
    }
    chai.request('localhost:3000')
        .post('/signup')
        .send(a)
        .end((err, res) => {
    res.should.have.status(200);
    done();

        });
    });
});

