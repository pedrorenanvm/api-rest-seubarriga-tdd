const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const mail = `${Date.now()}@gmail.com`;
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'User Account', mail: `${Date.now()}@gmail.com`, password: '123456' })
  user = { ...res[0] };
  user.token = jwt.encode(user, 'Sgrego!');
});

test('Deve listar todos os usuários', () => {
  return request(app).get('/users')
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
}, 10000);

test('Deve inserir usuário com sucesso', () => {
  return request(app).post('/users')
  .send({ name: 'Heising Berger', mail, password: '123456' }) // se o valor da chave tem o mesmo nome do valor da variável pode-se passar apenas o valor  
  .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Heising Berger'); 
      expect(res.body).not.toHaveProperty('password');
    });  
})

test('Deve armazenar uma senha cryptografada', async () => {
  const res = await request(app).post('/users')
    .send({ name: 'Heising Berger', mail: `${Date.now()}@gmail.com`, password: '123456' });
    .set('authorization', `bearer ${user.token}`)
  expect(res.status).toBe(201);

  const { id } = res.body;
  const userDB = await app.services.user.findOne({ id });
  expect(userDB.password).not.toBeUndefined();
  expect(userDB.password).not.toBe('123456')

});

test('Não deve inserir usuário sem nome', () => {
  return request(app).post('/users')
    .send({ mail: 'walterwhite@mail.com' , password: '123456' }) 
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
  });

test('Não deve inserir usuário sem email', async () => {
    const result = await request(app).post('/users')
      .send({ name: 'Heising Berger', password: '123456' })
      .set('authorization', `bearer ${user.token}`)
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('E-mail é um atributo obrigatório');
  });

test('Não deve inserir usuário sem senha', (done) => {
   request(app).post('/users')
    .send({ name: 'Heising Berger', mail: 'walterwhite@mail.com' })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório');
      done();
    })
    .catch(err => done.fail(err));
});

test('Não deve inserir usuário com email existente', () => {
  return request(app).post('/users')
    .send({ name: 'Heising Berger', mail, password: '123456' })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com esse email');
    });
});