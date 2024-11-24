import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

function logger(req, res, next) {
  console.log("");
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/post", (req, res) => {
  res.render("createPost.ejs");
});

app.post("/post", (req, res) => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = new Date().getFullYear();

  const data = {
    title: req.body["title"],
    post: req.body["post"],
    date: `${date} ${monthName[month]} ${year}`,
  };
  res.render("index.ejs", data);
});

app.put("/post", (req, res) => {
  res.sendStatus(200);
});

app.delete("/post", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
