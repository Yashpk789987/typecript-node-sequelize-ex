import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";

import { models } from "./models";
import { AdminRouter, CategoryRouter, SubCategoryRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/admin", AdminRouter);
app.use("/category", CategoryRouter);
app.use("/sub-category", SubCategoryRouter);

syncdb();

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is listening to port 4000`);
});

async function syncdb() {
  await models.sequelize.sync({});
}
