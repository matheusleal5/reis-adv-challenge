const { describe, it, expect } = require("@jest/globals");
const { validate } = require("./cpfValidate");

describe("CPF Validation", () => {
  it("should be able to check any valid cpf with 11 digits", () => {
    const validCPF = "111.444.777-35";
    const isCpf = validate(validCPF);
    expect(isCpf).toEqual(true);
  });

  it("should be able to check any invalid cpf with 11 digits", () => {
    const invalidCPF = "111.444.777-32";
    const isCpf = validate(invalidCPF);
    expect(isCpf).toEqual(false);
  });

  it("should not be able to check any cpf without correct format", () => {
    const invalidCpf = "111.444.777";

    try {
      validate(invalidCpf);
    } catch (error) {
      expect(error.message).toBe("O CPF inserido não possui 11 dígitos!");
    }
  });
});