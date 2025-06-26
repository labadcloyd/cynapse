import { Person } from "../Person";

test("Person should have a name", () => {
  const createdPerson = new Person("Cloyd");

  expect(createdPerson.name).toBe("Cloyd");
});

test("Person should throw an error when the length of name is less than 2", () => {
  expect(() => {
    const createdPerson = new Person("t");
  }).toThrow("Name should be longer than 2 characters");
});

test("Person should throw an error when the length of name is greater than 20", () => {
  expect(() => {
    const createdPerson = new Person("123456789012345678901");
  }).toThrow("Name should not be longer than 20 characters");
});

test("Person's wallet_balance should be 0 when not provided", () => {
  const createdPerson = new Person("Cloyd");

  expect(createdPerson.wallet_balance).toBe(0);
});

test("Person's wallet_balance should be provided number when provided", () => {
  const createdPerson = new Person("Cloyd", 10);

  expect(createdPerson.wallet_balance).toBe(10);
});
