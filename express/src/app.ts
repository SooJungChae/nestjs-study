import express from "express";
import { Cats } from "./app.model";

const port = 3000;
const app = express();

// cats 조회
// cat 조회
// cat 등록
// cat 수정
// cat 삭제

app.get("/cats", (req, res) => {
  res.send(Cats);
});

app.get("/cats/:id", (req, res) => {
  const params = req.params;
  res.send(Cats.find((cat) => cat.id === params.id));
});

app.put("/cats/:id", (req, res) => {
  const params = req.params;
  const body = req.body;
  let result;

  console.log(body);

  // Cats.forEach((cat) => {
  //   if (cat.id === params.id) {
  //     cat = body;
  //     console.log(cat);
  //     result = cat;
  //   }
  // });

  res.send(result);
});

app.listen(port, () => {
  console.log(`Litening on port ${port}`);
});
