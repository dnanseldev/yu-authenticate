import { User } from "./user.entity";

describe("Testing User Entity", () => {
  const user = new User();

  test("Method: isInValidEmail", () => {
    const result = user.isValidEmail("dnansel.dev@gmail.com.br");
    console.log(`Result: ${result}`);
    expect(result).toBe(true);
  });

  test("Method: isValidName", () => {
    const result = user.isValidName("Daniel");
    console.log(`Result: ${result}`);
    expect(result).toBe(true);
  });

  test("Method: isValidUsername", () => {
    const result = user.isValidUsername("daanselmo");
    console.log(`Result: ${result}`);
    expect(result).toBe(true);
  });
});
