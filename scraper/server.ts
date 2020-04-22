import express from 'express';
import dotenv from 'dotenv'
import { saveImage, scrapeCritters, CONFIG, storeData } from './src/scraper';

const app: express.Application = express();

dotenv.config();

if (process.env.AC_FISH === undefined || process.env.AC_INSECT === undefined) {
  console.error("Could not load config file")
  process.exit();
}

app.use(express.static('public', {
  setHeaders: function setHeaders(res, path, stat) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }}))

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
})

app.get('/', (req, res) => { res.send('Hello World!') });


const getFishes = () => {
  scrapeCritters({url: process.env.AC_FISH!, type: CONFIG.Fish}).then(saveImage('images/fishes/')).then(storeData(`${__dirname}/public/data/fishes.json`));
}

const getInsects = () => {
  scrapeCritters({url:process.env.AC_INSECT!, type: CONFIG.Insect}).then(saveImage('images/insects/')).then(storeData(`${__dirname}/public/data/insects.json`))
}

app.listen(process.env.PORT, () => {
  getFishes();
  getInsects();
  console.log(`Scrapper app listening at http://localhost:${process.env.PORT}`);
});