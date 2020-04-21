import React, { FunctionComponent } from 'react';
import Critter, { Time, Month, Colors } from 'types';
import { Table as Tb } from 'reactstrap';
import Tag from 'components/Tag';
import Button from 'components/Button';
import moment from 'moment';
// import { includes } from 'ramda';
import { parseMonth } from 'services/DataParser';
import './styles.css';

type TableProps = {
  data: Critter[],
}

const Table: FunctionComponent<TableProps> = ({ data }) => {
  // const isInTimeRange = (rangeTime: Time) => {
  //   return rangeTime.some(([from, to]) => moment().isBetween(moment().hour(from).minute(0), moment().hour(to < from ? to + 24 : to).minute(0)));
  // }

  // const availableNow = () => {
  //   const currentMonth = moment().month() + 1;
  //   const xs = data.filter(fish => {
  //     return includes(currentMonth, fish.months) && isInTimeRange(fish.time)
  //   });
  // }
  
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

  return (
    <div className="cc-critter-schedule">
      <Button>Show available now</Button>
      <Button color='link'>link button yaya</Button>
      <Tb striped hover responsive className="critter-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>price</th>
            <th>location</th>
            <th>time</th>
            <th>availability</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((critter, key) => (
              <tr key={key}>
                <td className="critter-img"><img className="critter-img" src={`${process.env.REACT_APP_API}/${critter.img}`} alt={critter.name}/></td>
                <td>{critter.name}</td>
                <td>{critter.price}</td>
                <td>{critter.location}</td>
                <td>{DisplayTime(critter)}</td>
                <td>{DisplayMonths(critter)}</td>
              </tr>
            ))
          }
        </tbody>
      </Tb>      
    </div>
  )
}

export default Table;