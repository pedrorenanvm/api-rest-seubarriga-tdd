const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select(['id', 'name', 'mail']);
  };

  const findOne = (filter = {}) => {
    return app.db('users').where(filter).first();
  };

  const getPasswdHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if(!user.name) throw new ValidationError('Nome é um atributo obrigatório');
    if(!user.mail) throw new ValidationError('E-mail é um atributo obrigatório');
    if(!user.password) throw new ValidationError('Senha é um atributo obrigatório');

    const userDb = await findOne({ mail: user.mail });
    if (userDb) throw new ValidationError('Já existe um usuário com esse email');

    const newUser = { ...user };
    newUser.password = getPasswdHash(user.password);
    return app.db('users').insert(newUser, ['id','name', 'mail']);
  };

  return { findAll, save, findOne };
};
