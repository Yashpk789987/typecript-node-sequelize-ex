import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";

import { models } from "./models";
import { AdminRouter } from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/admin", AdminRouter);

syncdb();

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is listening to port 4000`);
});

async function syncdb() {
  await models.sequelize.sync({});
}
