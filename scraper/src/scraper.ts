import cheerio from 'cheerio';
import axios from 'axios';
import { splitAt, reject } from 'ramda';
import fs from 'fs';


type DataParser = (td: Cheerio) => ({
  [x: string]: number | string | [number, number][]
});

interface Critter {
  name: string,
  img: string,
  price: number,
  location: string,
  time: [number, number][],
  months: number[]
}

interface Fish extends Critter {
  shadowSize: number,
}

interface Insect extends Critter {
  flickPrice: number,
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
  td => ({ name: td.text().trim()}),
  td => ({ img: td.find('a').attr('href') || '' }),
  td => ({ price: parseInt(td.text().trim())}),
  td => ({ location: mkLocation(td.text().trim())}),
  td => ({ shadowSize: parseInt(td.text().trim())}),
  td => ({ time: mkTime(td.text().trim())})
]

const insectPropMap: DataParser[] = [
  td => ({ name: td.text().trim()}),
  td => ({ img: td.find('a').attr('href') || '' }),
  td => ({ price: parseInt(td.text().trim())}),
  td => ({ location: td.text().trim()}),
  td => ({ time: mkTime(td.text().trim())})
];

const parseMonths = (tr: CheerioElement[]) => {
  return tr.reduce<number[]>((calendar, td, month) => {
    return td.firstChild.data?.trim() === '✓' ? [ ...calendar, month+1 ] : [ ...calendar ]
  }, [])
}

const isFish = (critter: Fish | Insect): critter is Fish => {
  return (critter as Fish).shadowSize !== undefined;
}

const downloadImg = async (url: string, destinationPath: string) => {
  const writer = fs.createWriteStream(`${__dirname}/../public/${destinationPath}`);
  const response = await axios.get(url, { responseType: 'stream' });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

export const saveImage = (path: string) => (critters: Critter[]) => {
  return Promise.all(critters.map(critter => {
    const _path = `${path}${critter.name.replace(' ', '-')}.png`;
    return downloadImg(critter.img, _path).then(result => ({
      ...critter,
      img: _path
    }))
  })).catch(error => {
    console.error(error)
    return critters
  })
}

const scrapeFishes = async () => {
  const $ = await scraper(process.env.AC_FISH);

  const rows = $('[title="Northern Hemisphere"] table.roundy.sortable tbody tr').toArray().slice(1);
  const fishes = rows.reduce((fishes, rowData) => {
    const [ fishData, months ] = splitAt(6, rowData.children.slice(1));

    const fish = {
      ...fishData.reduce(( fish, td, i ) => {
        return {
          ...fish,
          ...fishPropMap[i]($(td)),
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

export const scrapeInsects = async () => {
  const $ = await scraper(process.env.AC_INSECT);

  const rows = $('[title="Northern Hemisphere"] table.sortable tbody tr').toArray().slice(1);
  const insects = rows.reduce((insects, rowData) => {
    const [ insectData, months ] = splitAt(4, rowData.children.slice(1))
    
    const _insect = insectData.reduce(( insect, td, i ) => {
      return {
        ...insect,
        ...insectPropMap[i]($(td))
      }
    }, {} as Insect);

    return [
      ...insects,
      {
        ..._insect,
        flickPrice: _insect.price * 1.5,
        months: parseMonths(months)
      }
    ]
  }, [] as Insect[])

  return insects;
}

const scraper = async (url?: string) => {
  const html = await axios.get(url||'');
  return cheerio.load(html.data, { normalizeWhitespace: true });
}

export default scrapeFishes;