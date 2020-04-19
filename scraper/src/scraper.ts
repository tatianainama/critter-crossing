import cheerio from 'cheerio';
import axios from 'axios';
import { splitAt } from 'ramda';
import fs from 'fs';
import express from 'express';

type DataParser = (td: Cheerio) => ({
  [x: string]: number | string | [number, number][]
});

type Fish = {
  name: string,
  img: string,
  price: number,
  location: string,
  shadowSize: number,
  time: [number, number][],
  months: number[],
}

const mkLocation = (location: string): string => {
  switch (location) {
    case 'River (Clifftop)' || 'River (Clifftop)  Pond':
      return 'River (Clifftop)';
    default:
      return location;
  }
}

const mkTime = (time: string): [number, number][] => {
  switch (time) {
    case '9 AM - 4 PM':
      return [[9, 16]];
    case '4 PM - 9 AM':
      return [[16, 9]];
    case '9 PM - 4 AM':
      return [[21, 4]];
    case '9 AM - 4 PM & 9 PM - 4 AM':
      return [[9, 16], [21, 4]];
    case '4 AM - 9 PM':
      return [[4, 21]];
    default:
      return [[0, 24]];
  }
}

const fishPropMap: DataParser[] = [
  td => ({name: td.text().trim()}),
  td => ({ img: td.find('a').attr('href') || '' }),
  td => ({ price: parseInt(td.text().trim())}),
  td => ({ location: mkLocation(td.text().trim())}),
  td => ({ shadowSize: parseInt(td.text().trim())}),
  td => ({ time: mkTime(td.text().trim())})
]

const parseMonths = (tr: CheerioElement[]) => {
  return tr.reduce<number[]>((calendar, td, month) => {
    return td.firstChild.data?.trim() === '✓' ? [ ...calendar, month+1 ] : [ ...calendar ]
  }, [])
}

export const saveImage = (fishes: Fish[]) => {
  return Promise.all(fishes.map(async fish => {
    const location = `images/fishes/${fish.name.replace(' ', '-')}.png`;
    
    const writer = fs.createWriteStream(`${__dirname}/../public/${location}`)
    
    const response = await axios.get(fish.img, {
      responseType: 'stream'
    });
  
    response.data.pipe(writer)
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    }).then(result => {
      return {
        ...fish,
        img: location
      }
    })
  })).catch(error => {
    console.error(error)
    return fishes
  })
}

const scrape = async () => {
  const html = await axios.get('https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)');
  const $ = cheerio.load(html.data, { normalizeWhitespace: true });
  
  const rows = $('[title="Northern Hemisphere"] table.roundy.sortable tbody tr').toArray().slice(1);
  const fishes = rows.reduce((fishes, rowData) => {
    const [ fishData, months ] = splitAt(6, rowData.children.slice(1));

    const fish = {
      ...fishData.reduce(( fish, td, i ) => {
        return {
          ...fish,
          ...fishPropMap[i]($(td))
        };
      }, {} as Fish),
      months: parseMonths(months)
    };

    return [
      ...fishes,
      fish
    ]
  }, [] as Fish[]);

  return fishes;
}

export default scrape;