import express from 'express';
import storiesRoute from './routes/stories';
import path from 'node:path';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a route to get all stories from defined route
app.use('/stories', storiesRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'components', 'home.htm'));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});