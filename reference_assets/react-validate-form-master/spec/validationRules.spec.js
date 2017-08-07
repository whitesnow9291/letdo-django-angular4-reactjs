import validationRules from "../src/validationRules";


describe("Default Validation Rules", () => {
  it("tests for a required value", () => {
    const validValue = "some value";
    const invalidValue = "";
    const expectedValid = validationRules.required.test(validValue);
    const expectedInvalid = validationRules.required.test(invalidValue);

    expect(expectedValid).toBe(true);
    expect(expectedInvalid).toBe(false);
  });

  it("tests for a valid email", () => {
    const validValue = "email@email.com";
    const invalidValue = "";
    const expectedValid = validationRules.email.test(validValue);
    const expectedInvalid = validationRules.email.test(invalidValue);

    expect(expectedValid).toBe(true);
    expect(expectedInvalid).toBe(false);
  });

  it("tests for a minimum length", () => {
    const validValue = "abcd";
    const invalidValue = "ab";
    const minLength = 3;
    const expectedValid = validationRules.min.test(minLength)(validValue);
    const expectedInvalid = validationRules.min.test(minLength)(invalidValue);

    expect(expectedValid).toBe(true);
    expect(expectedInvalid).toBe(false);
  });

  it("tests for a maximum length", () => {
    const validValue = "abcd";
    const invalidValue = "abcdefg";
    const maxLength = 5;
    const expectedValid = validationRules.max.test(maxLength)(validValue);
    const expectedInvalid = validationRules.max.test(maxLength)(invalidValue);

    expect(expectedValid).toBe(true);
    expect(expectedInvalid).toBe(false);
  });
});
