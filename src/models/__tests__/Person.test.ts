import { Person } from "../Person";

test("Person should have a name", () => {
  const createdPerson = new Person("Cloyd");

  expect(createdPerson.name).toBe("Cloyd");
});
