/*import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;
const url= 'http://localhost:3000';

describe('Servidor', () => {
    it('deberia responder 404 para rutas desconocidas', (done) => {
        chai.request(url)
        .get('/index')
        .end((err, res) =>{
            expect(res).to.have.status(404);
            expect(res.body.error).to.equal('Ruta no encontrada');
            done();
        })
    });
    it('deberia responder 400 si no se especifica el argumento cmd', (done) => {
        chai.request(url)
        .get('/execmd')
        .end((err, res) =>{
            expect(res).to.have.status(400);
            expect(res.body.error).to.equal('El parámetro cmd es obligatorio');
            done();
        })
    });
    it('deberia ejecutar el comando con éxito sin args', (done) => {
        chai.request(url)
        .get('/execmd?cmd=ls')
        .end((err, res) =>{
            expect(res).to.have.status(200);
            done();
        })
    });
    it('deberia ejecutar el comando con éxito con args', (done) => {
        chai.request(url)
        .get('/execmd?cmd=ls&args=-l')
        .end((err, res) =>{
            expect(res).to.have.status(200);
            done();
        })
    });
    it('deberia ejecutar el comando sin éxito con args pero no válidos', (done) => {
        chai.request(url)
        .get('/execmd?cmd=ls&args=o')
        .end((err, res) =>{
            expect(res).to.have.status(500);
            done();
        })
    });

});
*/
/*
chai.use(chaiHttp);

describe('Server', () => {
  it('should respond with 404 for unknown routes', (done) => {
    chai
      .request(app)
      .get('/unknown')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'Ruta no encontrada');
        done();
      });
  });

  it('should respond with 400 when no cmd parameter is provided', (done) => {
    chai
      .request(app)
      .get('/execmd')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'El parámetro cmd es obligatorio');
        done();
      });
  });

  it('should execute a command without args successfully', (done) => {
    chai
      .request(app)
      .get('/execmd?cmd=echo&args=hello')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('output', 'hello\n');
        done();
      });
  });

  it('should execute a command with args successfully', (done) => {
    chai
      .request(app)
      .get('/execmd?cmd=echo&args="hello world"')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('output', 'hello world\n');
        done();
      });
  });

  // Agregar pruebas adicionales según sea necesario
});
*/
