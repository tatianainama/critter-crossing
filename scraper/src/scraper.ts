import cheerio from 'cheerio';
import axios from 'axios';
import { splitAt } from 'ramda';

type DataParser = (td: Cheerio) => ({
  [x: string]: number | string | [number, number][]
});

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
      }, {}),
      months: parseMonths(months)
    };

    return [
      ...fishes,
      fish
    ]
  }, [] as object[]);

  return fishes;
}

export default scrape;