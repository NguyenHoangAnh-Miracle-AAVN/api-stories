import express from 'express';
import storiesRoute from './routes/stories';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a route to get all stories from defined route
app.use('/stories', storiesRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});