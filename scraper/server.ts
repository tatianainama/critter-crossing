import express from 'express';
import dotenv from 'dotenv'
import { saveImage, scrapeCritters, CONFIG } from './src/scraper';

const app: express.Application = express();

dotenv.config();

if (process.env.AC_FISH === undefined || process.env.AC_INSECT === undefined) {
  console.error("Could not load config file")
  process.exit();
}

app.use(express.static('public'))

app.get('/', (req, res) => { res.send('Hello World!') });

app.get('/fishes', (req, res) => {
  return scrapeCritters({url: process.env.AC_FISH!, type: CONFIG.Fish}).then(saveImage('images/fishes/')).then((fishes => {
    return res.send(fishes);
  }))
})

app.get('/insects', (req, res) => {
  return scrapeCritters({url:process.env.AC_INSECT!, type: CONFIG.Insect}).then(saveImage('images/insects/')).then((insects => {
    return res.send(insects);
  }))
})

app.listen(process.env.PORT, () => {
  console.log(`Scrapper app listening at http://localhost:${process.env.PORT}`);
});