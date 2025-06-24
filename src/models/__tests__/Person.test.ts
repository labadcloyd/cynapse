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
