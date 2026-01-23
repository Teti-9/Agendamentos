import express from "express"
import instrutorApi from "./routes/instrutorApi.js"
import agendamentosApi from "./routes/agendamentosApi.js"
import authApi from "./routes/authApi.js"
import authMiddleware from "./middleware/authMiddleware.js"
import swaggerUI from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import cors from "cors"

const app = express();
const PORT = 8000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Agendamentos",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/auth", authApi);
app.use("/api", instrutorApi);
app.use("/api", authMiddleware, agendamentosApi);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
