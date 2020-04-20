import cheerio from 'cheerio';
import axios from 'axios';
import { splitAt, compose } from 'ramda';
import fs from 'fs';

type DataParser = (td: Cheerio) => ({
  [x: string]: number | string | [number, number][]
});

export enum CONFIG {
  Fish,
  Insect
};

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
  td => ({ name: td.text().trim().toLowerCase()}),
  td => ({ img: td.find('a').attr('href') || '' }),
  td => ({ price: parseInt(td.text().trim())}),
  td => ({ location: mkLocation(td.text().trim())}),
  td => ({ shadowSize: parseInt(td.text().trim())}),
  td => ({ time: mkTime(td.text().trim())})
]

const insectPropMap: DataParser[] = [
  td => ({ name: td.text().trim().toLowerCase()}),
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

const getConfig = ({ url, type }: { url: string, type: CONFIG }): ScrapeConfig<Fish | Insect> => {
  return type === CONFIG.Fish ? {
    url,
    tableSelector: '[title="Northern Hemisphere"] table.roundy.sortable tbody tr',
    split: 6,
    propMap: fishPropMap,
  } : {
    url,
    tableSelector: '[title="Northern Hemisphere"] table.sortable tbody tr',
    split: 4,
    propMap: insectPropMap,
    extraData: (insect) => ({ flickPrice: insect.price * 1.5 } as Insect)
  }
}

export const INSECTS_CONFIG = (url: string): ScrapeConfig<Insect> => ({
  url,
  tableSelector: '[title="Northern Hemisphere"] table.sortable tbody tr',
  split: 4,
  propMap: insectPropMap,
  extraData: (insect) => ({ flickPrice: insect.price * 1.5 } as Insect)
})

export const FISHES_CONFIG: (url: string) => ScrapeConfig<Fish> = url => ({
  url,
  tableSelector: '[title="Northern Hemisphere"] table.roundy.sortable tbody tr',
  split: 6,
  propMap: fishPropMap,
})

type ScrapeConfig<T> = {
  url: string
  tableSelector: string,
  split: number,
  propMap: DataParser[],
  extraData?: (value: T) => T
}

export const getData = async <T>({ url, tableSelector, split, propMap, extraData }: ScrapeConfig<T>): Promise<T[]> => {
  const $ = await scraper(url);
  const rows = $(tableSelector).toArray().slice(1);
  const data = rows.reduce((collection, rowData) => {
    const [ mainData, months ] = splitAt(split, rowData.children.slice(1))
    
    const _critter = mainData.reduce(( critter, td, i ) => {
      return {
        ...critter,
        ...propMap[i]($(td))
      }
    }, {} as T);

    const _extra = extraData ? extraData(_critter) : {};
    return [
      ...collection,
      {
        ..._critter,
        ..._extra,
        months: parseMonths(months)
      }
    ]
  }, [] as T[])

  return data;
}

export const scrapeCritters = compose(getData, getConfig);

const scraper = async (url: string) => {
  const html = await axios.get(url);
  return cheerio.load(html.data, { normalizeWhitespace: true });
}

export default getData;