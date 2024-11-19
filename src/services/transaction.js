module.exports = (app) => {
  const find = (userId, filter = {}) => {
    return app.db('transactions')
      .join('accounts', 'accounts.id', 'acc_id')
      .where(filter)
      .andWhere('accounts.user_id', '=', userId)
      .select();
  };

  const findOne = (filter) => {
    return app.db('transactions')
      .where(filter)
      .first();
  } 

  const save = (transaction) => {
    return app.db('transactions')
      .insert(transaction, '*');
  }; 
  
  const update = (id, transaction) => {
    return app.db('transactions')
      .where({id}) // iguais
      .update(transaction, '*');
  }

  const remove = (id) => {
    return app.db('transactions')
      .where({id: id}) // iguais
      .del();
  }

  return { find, save, findOne, update, remove};
};