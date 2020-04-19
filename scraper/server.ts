import express from 'express';
import dotenv from 'dotenv'
import scrapeFishes, { saveImage, scrapeInsects } from './src/scraper';

const app: express.Application = express();

dotenv.config();

app.use(express.static('public'))

app.get('/', (req, res) => { res.send('Hello World!') });

app.get('/fishes', (req, res) => {
  return scrapeFishes().then(saveImage('images/fishes/')).then((fishes => {
    return res.send(fishes);
  }))
})

app.get('/insects', (req, res) => {
  return scrapeInsects().then(saveImage('images/insects/')).then((insects => {
    return res.send(insects);
  }))
})

app.listen(process.env.PORT, () => {
  console.log(`Scrapper app listening at http://localhost:${process.env.PORT}`);
  scrapeFishes();
});