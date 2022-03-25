const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("./swagger.json");
const { validate } = require("./cpfValidate");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/:cpf", (request, response) => {
  const { cpf } = request.params;

  const isCpf = validate(cpf);

  return response.status(201).json({ message: `O CPF: ${cpf} é ${isCpf ? "VERDADEIRO" : "FALSO"}` });
});

app.use((err, request, response, next) => {
    if (err instanceof Error) {
      return response.status(500).json({ message: err.message });
    }
  }
);

app.listen(3333, () => console.log("Server is running on port 3333"));