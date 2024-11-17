test("Devo conhecer as principáis assertivas do jest", () => {
  let number = null;
  expect(number).toBeNull();

  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test("Devo saber trabalhar com objetos no Jest", () => {
  const obj = { name: "Pedro Renan", mail:'pedro@compass.com', age: 22 };

  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('mail', 'pedro@compass.com');
  expect(obj.name).toBe("Pedro Renan");

  const obj2 = { name: "Pedro Renan", mail: 'pedro@compass.com', age: 22 };
  expect(obj).toEqual(obj2);
  
})