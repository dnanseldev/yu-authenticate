import { User } from "./user.entity";

describe.only("Testing User Entity", () => {
  test("Method: isInValidEmail", () => {
    const result = User.isValidEmail("dnansel.dev@gmail.com.br");
    console.log(`Result: ${result}`);
    expect(result).toBe(true);
  });

  test("Method: isValidName", () => {
    const result = User.isValidName("Daniel");
    console.log(`Result: ${result}`);
    expect(result).toBe(true);
  });

  test("Method: isValidUsername", () => {
    const result = User.isValidUsername("daanselmo");
    console.log(`Result: ${result}`);
    expect(result).toBe(true);
  });
});
