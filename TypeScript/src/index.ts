import express, { Request, Response, Application, NextFunction } from "express";
import morgan from "morgan";
import { getBooks, getBookById } from "./services";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response): void => {
  res.send("Api is Working Dude...");
});

app.get("/books", async (req: Request, res: Response) => {
  res.send(await getBooks());
});

app.get("/books/:id", async (req: Request, res: Response) => {
  const book = await getBookById(req.params.id);
  if (book.id !== 0) res.send(book);
  else
    res
      .send({
        error: "Not Found",
      })
      .status(404);
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
