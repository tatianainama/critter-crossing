import express from 'express';

import scrape from './scraper';

const app: express.Application = express();
const port: number = 3001;

app.get('/', (req, res) => {
  scrape();
  res.send('Hello World!')
});

app.get('/fishes', (req, res) => {
  return scrape().then(fishes => {
    return res.send(fishes);
  })
})

app.listen(port, () => {
  console.log(`Scrapper app listening at http://localhost:${port}`);
  scrape();
});