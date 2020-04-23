import React, { useState, FunctionComponent, useEffect } from 'react';
import Critter, { Time, Month, Colors } from 'types';
import { Table as Tb } from 'reactstrap';
import Tag from 'components/Tag';
import Button from 'components/Button';
import Input from 'components/Input';
import moment from 'moment';
import { parseMonth } from 'services/DataParser';
import { includes, descend, ascend, sortWith } from 'ramda';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import './styles.css';

export type Column<T> = {
  label: string,
  key: keyof T,
  type?: 'time' | 'month',
  display?: (critter: T) => string,
  sort?: (critter: Record<string, T>) => T
};

enum SortDirection {
  Asc,
  Desc
};

interface TableProps<T> {
  data: T[],
  columns: Column<T>[]
};

type Sort<T> = [
  SortDirection | undefined,
  (critter: Record<string, T>) => T
]

type Actions<T> = {
  search: string,
  sort: {
    [key: string]: Sort<T>
  }
};

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

const Table = <T extends Critter>({ data, columns }: TableProps<T>) => {

  const [ critters, setState ] = useState<T[]>(data);

  const [ actions, setAction ] = useState<Actions<T>>({
    search: '',
    sort: {}
  })

  useEffect(() => {
    setState(data)
    setAction({
      search: '',
      sort: columns.reduce((_sort, col) => {
        if (col.sort) {
          return {
            ..._sort,
            [col.key]: [
              undefined,
              col.sort
            ]
          }
        }
        return _sort
      }, {})
    })
  }, [data, columns]);

  const availableNow = () => {
    const currentMonth = moment().month() + 1;
    const result = critters.filter(critter => {
      return includes(currentMonth, critter.months) && isInTimeRange(critter.time)
    });
    setState(result)
  }

  const showAll = () => {
    setState(data)
    setAction({
      search: '',
      sort: Object.keys(actions.sort).reduce((_sort, key) => {
        return {
          ..._sort,
          [key]: [
            undefined,
            actions.sort[key][1]
          ]
        }
      }, {})
    })
  }

  const search = () => {
    const { search } = actions;
    const result = critters.filter(critter => includes(search.toLowerCase(), critter.location.toLowerCase()) || includes(search.toLowerCase(), critter.name.toLowerCase()));
  
    setState(result)
  }

  const sortData = (_actions: Actions<T>) => {
     const sorts = Object.keys(_actions.sort).reduce<((a: Record<string, T>, b: Record<string, T>) => number)[]>((_sort, key) => {
      const [ direction, sort] = _actions.sort[key];
      if (direction === undefined) {
        return _sort
      } else {
        const x = direction === SortDirection.Asc ? ascend(sort) : descend(sort);
        return [
          ..._sort,
          x
        ]
      }
     }, []);
     const _sorted = sortWith(sorts, critters as unknown[] as (Array<Record<string, T>>)) as unknown[] as T[];
     setState(_sorted);
  }

  const setSort = (key: string, sort: Sort<T>) => {
    const _actions = {
      search: actions.search,
      sort: {
        ...actions.sort,
        [key]: sort
      }
    }
    sortData(_actions);
    setAction(_actions);
  }

  const showSortIcon = (key: string, sort: ((critter: Record<string, T>) => T)) => {
    const value = actions.sort[key];
    if (value === undefined || value[0] === undefined) {
      return (<FaSort onClick={() => {setSort(key, [SortDirection.Asc, sort])}}/>)
    } else {
      return value[0] === SortDirection.Asc ? (
        <FaSortUp onClick={() => {setSort(key, [SortDirection.Desc, sort])}}/>
      ) : (
        <FaSortDown onClick={() => {setSort(key, [SortDirection.Asc, sort])}}/>
      )
    }
  }

  return (
    <div className="cc-critter-schedule">
      <div className="cc-critter-schedule-actions">
        <div className="cc-critter-schedule-actions-search">
          <Input value={actions.search} handleChange={(_filter) => { setAction({...actions, search: _filter})}}/>
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
              columns.map(({ label, sort, key }, i) => (
                <th key={i}>{label} {sort ? showSortIcon(key as string, sort) : null}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            critters.map((critter, key) => (
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