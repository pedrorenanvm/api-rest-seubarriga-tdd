exports.seed = (knex) => {
  return knex('users').insert([
    { id: 10100, name: 'User #3', mail: 'user3mail.com', password: '$2a$10$woCk439YSlf9NY4gdbxEjO7Tyuv7uifi2EKLpGFTdHK0gHM8VE.12' },
    { id: 10101, name: 'User #4', mail: 'user4@mail.com', password: '$2a$10$woCk439YSlf9NY4gdbxEjO7Tyuv7uifi2EKLpGFTdHK0gHM8VE.12' },
  ])
    .then(() => knex('accounts').insert([
      { id: 10100, name: 'Acc Saldo Principal', user_id: 10100 },
      { id: 10101, name: 'Acc Saldo Secundário', user_id: 10100 },
      { id: 10102, name: 'Acc Alternativo 1', user_id: 10101 },
      { id: 10103, name: 'Acc Alternativo 2', user_id: 10101 },
    ]));
};
