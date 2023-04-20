import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;
const url= 'http://localhost:3000';

describe('Servidor', () => {
    it('Añade funko con éxito', (done) => {
        chai.request(url)
        .post('/funkos?user=diego&id=12&name=Legolas&desc=Es%20guay&type=Pop!&genre=PeliculasTV&franchise=El%20Señor%20De%20Los%20Anillos&number=1&exclusive=true&specialCharacter=Nada&value=30')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    });
    it('Añade funko sin éxito', (done) => {
        chai.request(url)
        .post('/funkos?user=diego&id=1&name=Legolas&desc=Es%20guay&type=Pop!&genre=PeliculasTV&franchise=El%20Señor%20De%20Los%20Anillos&number=1&exclusive=true&specialCharacter=Nada&value=30')
        .end((err, res) => {
            expect(res).to.have.status(500);
            done();
        })
    });
    it('Elimina funko con éxito', (done) => {
        chai.request(url)
        .delete('/funkos?user=diego&id=12&name=Legolas&desc=Es%20guay&type=Pop!&genre=PeliculasTV&franchise=El%20Señor%20De%20Los%20Anillos&number=1&exclusive=true&specialCharacter=Nada&value=30')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    });
    it('Elimina funko sin éxito', (done) => {
        chai.request(url)
        .delete('/funkos?user=diego&id=12&name=Legolas&desc=Es%20guay&type=Pop!&genre=PeliculasTV&franchise=El%20Señor%20De%20Los%20Anillos&number=1&exclusive=true&specialCharacter=Nada&value=30')
        .end((err, res) => {
            expect(res).to.have.status(500);
            done();
        })
    });
    it('Update funko con éxito', (done) => {
        chai.request(url)
        .patch('/funkos?user=diego&id=1&name=Aragorn&desc=Es%20guay&type=Pop!&genre=PeliculasTV&franchise=El%20Señor%20De%20Los%20Anillos&number=1&exclusive=true&specialCharacter=Nada&value=30')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    });
    it('Update funko sin éxito', (done) => {
        chai.request(url)
        .patch('/funkos?user=diego&id=23&name=Aragorn&desc=Es%20guay&type=Pop!&genre=PeliculasTV&franchise=El%20Señor%20De%20Los%20Anillos&number=1&exclusive=true&specialCharacter=Nada&value=30')
        .end((err, res) => {
            expect(res).to.have.status(500);
            done();
        })
    });
    it('Get funko con éxito', (done) => {
        chai.request(url)
        .get('/funkos?user=diego&id=1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    });
    it('Get funko sin éxito', (done) => {
        chai.request(url)
        .get('/funkos?user=diego&id=34')
        .end((err, res) => {
            expect(res).to.have.status(500);
            done();
        })
    });
    it('Get lista funkos con éxito', (done) => {
        chai.request(url)
        .get('/funkos?user=diego')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    });
    it('Get lista funkos sin éxito', (done) => {
        chai.request(url)
        .get('/funkos?user=jesus')
        .end((err, res) => {
            expect(res).to.have.status(500);
            done();
        })
    });
});