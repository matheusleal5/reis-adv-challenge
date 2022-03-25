const express = require("express");

const { validate } = require("./cpfValidate");

const app = express();

app.use(express.json());

app.get("/:cpf", (request, response) => {
  const { cpf } = request.params;

  const isCpf = validate(cpf);

  return response.status(201).json({ message: `O CPF ${cpf} é: ${isCpf ? "Verdadeiro" : "Falso"}` });
});

app.listen(3333, () => console.log("Server is running on port 3333"));