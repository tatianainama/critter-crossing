import Axios from 'axios';
import { Fish, Insect } from 'types';

export const getFishes = (): Promise<Fish[]> => Axios.get(`${process.env.REACT_APP_API}/data/fishes.json`).then(result => result.data);

export const getInsects = (): Promise<Insect[]> => Axios.get(`${process.env.REACT_APP_API}/data/insects.json`).then(result => result.data);

export default {
  getFishes,
  getInsects
}