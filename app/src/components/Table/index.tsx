import React, { useState, FunctionComponent, useEffect } from 'react';
import Critter, { Time, Month, Colors } from 'types';
import { Table as Tb } from 'reactstrap';
import Tag from 'components/Tag';
import Button from 'components/Button';
import Input from 'components/Input';
import moment from 'moment';
import { parseMonth } from 'services/DataParser';
import { includes } from 'ramda';

import './styles.css';

export type Column<T> = {
  label: string,
  key: keyof T,
  type?: 'time' | 'month',
  display?: (critter: T) => string
};

interface TableProps<T> {
  data: T[],
  columns: Column<T>[]
}

const showAvailability = (months: Month[]): { color: Colors, text: string} => {
  const currentMonth = (moment().get('month') as Month) + 1;

  if (months.length === 12){
    return {
      color: 'green',
      text: 'all year'
    }
  }
  const availableNow = months.findIndex(m => m === currentMonth);
  
  if (availableNow === -1) {
    const availableFrom = months.find(m => m > currentMonth) || 1;
    return {
      color: 'purple',
      text: `from ${parseMonth(availableFrom)}`
    }
  }

  const nextIteration = (i: number) => (i + 1) % months.length;
  
  let i = availableNow;
  while (true) {
    const actual = months[i];
    const next = months[nextIteration(i)];
    
    if ( (actual % 12) + 1 !== next) {
      const lastMonth = actual === currentMonth;
      return lastMonth ? {
        color: 'red',
        text: 'last month available'
      } : {
        color: 'orange',
        text: `until ${parseMonth(actual)}`
      }
    } else {
      i = nextIteration(i);
    }
  }
}

const DisplayMonths: FunctionComponent<{months: Month[]}> = ({ months }) => {
  const result = showAvailability(months);
  return (
    <Tag color={result.color}>{result.text}</Tag>
  )
}

const DisplayTime: FunctionComponent<{time: Time}> = ({ time }) => {
  return (
    <div>
      {
        time.map(([from, to]) => {
          return (from === 0 && to === 24) ?
            'All day' : `${from}hs - ${to}hs`
        }).join(' & ')
      }
    </div>
  );
}

const DisplayData = (type: 'time' | 'month') => type === 'time' ? DisplayTime : DisplayMonths;

const isInTimeRange = (rangeTime: Time) => {
  return rangeTime.some(([from, to]) => moment().isBetween(moment().hour(from).minute(0), moment().hour(to < from ? to + 24 : to).minute(0)));
}

type State<T> = {
  critters: T[],
  relevant: T[],
  search: string,
}
const Table = <T extends Critter>({ data, columns }: TableProps<T>) => {

  const [ state, setState ] = useState<State<T>>({
    critters: data,
    relevant: data,
    search: ''
  });

  useEffect(() => {
    setState({
      search:'',
      relevant: data,
      critters: data,
    })
  }, [data]);

  const availableNow = () => {
    const currentMonth = moment().month() + 1;
    const result = state.critters.filter(critter => {
      return includes(currentMonth, critter.months) && isInTimeRange(critter.time)
    });
    setState({
      ...state,
      relevant: result
    })
  }

  const showAll = () => {
    setState({
      ...state,
      relevant: [...state.critters]
    })
  }

  const search = () => {
    const { critters, search } = state;
    const result = critters.filter(critter => includes(search.toLowerCase(), critter.location.toLowerCase()) || includes(search.toLowerCase(), critter.name.toLowerCase()));
  
    setState({
      ...state,
      relevant: result
    })
  }

  return (
    <div className="cc-critter-schedule">
      <div className="cc-critter-schedule-actions">
        <div className="cc-critter-schedule-actions-search">
          <Input value={state.search} handleChange={(_filter) => { setState({...state, search: _filter})}}/>
          <Button onClick={() => search()}>search</Button>
        </div>
        <Button onClick={() => { availableNow() }} color="primary">Available now</Button>
        <Button onClick={() => { showAll() }}>Show all</Button>
      </div>
      <Tb striped hover responsive className="critter-table">
        <thead>
          <tr>
            <th></th>
            {
              columns.map(({ label }, key) => (
                <th key={key}>{label}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            state.relevant.map((critter, key) => (
              <tr key={key}>
                <td className="critter-img"><img className="critter-img" src={`${process.env.REACT_APP_API}/${critter.img}`} alt={critter.name}/></td>
                {
                  columns.map(({ key, display, type }, i) => (
                      <td key={i}>
                        { type ? DisplayData(type)(critter) :
                          display ? display(critter) :
                          critter[key]
                        }
                      </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Tb>      
    </div>
  )
}

export default Table;