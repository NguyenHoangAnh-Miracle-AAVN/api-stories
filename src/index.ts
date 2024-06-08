import express from "express";
import storiesRoute from "./routes/stories";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a route to get all stories from defined route
app.use("/stories", storiesRoute);

app.get("/", function (req, res) {
  res.status(200).send("<html><body><h1>It work!</h1></body></html>");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
