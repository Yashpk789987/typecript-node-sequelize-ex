import express, { Response, Request } from "express";
import { db, Book, Author } from "./models";

const app = express();

db.sync({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/save/:name", async (req: Request, res: Response) => {
  try {
    let book = await Book.create({ authorId: 1, name: req.params.name });
    res.json({ ok: true, book });
  } catch (error) {}
});

app.get("/author/:name", async (req: Request, res: Response) => {
  try {
    let author = await Author.create({ name: req.params.name });
    res.json({ ok: true, author });
  } catch (error) {}
});

app.get("/books", async (_, res: Response) => {
  const books = await Book.findAll({ include: "author" });
  res.json({ ok: true, books });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is listening to port 4000`);
});
