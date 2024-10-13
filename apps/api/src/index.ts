import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import router from "./routes";
import { connectMongo } from "./libs/database";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.use((req, res, next) => {
  console.log("[ Server ] Requested: ", req.method, req.url);
  next();
});

async function startExpress() {
  app.listen(process.env.PORT, async () => {
    console.log("[ Server ] Running on port ", process.env.PORT);
  });
}

async function main() {
  await connectMongo();
  await startExpress();
}

main();
