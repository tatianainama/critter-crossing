import React, { FunctionComponent, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import moment from 'moment';
import { includes } from 'ramda';

import FISHES from './fish-data.json';
import { Fish, Month, Time, FishLocation } from './types';
import { parseMonth, parseFishLocation, FishLocationLabel } from './DataParser';

type props = {
};

const FishData = FISHES as unknown as Fish[];

const FishTable: FunctionComponent<props> = () => {
  const [ data, setData ] = useState<Fish[]>(FishData);

  const isInTimeRange = (rangeTime: Time) => {
    return rangeTime.some(([from, to]) => moment().isBetween(moment().hour(from).minute(0), moment().hour(to < from ? to + 24 : to).minute(0)));
  }

  const availableNow = () => {
    const currentMonth = moment().month() + 1;
    const xs = data.filter(fish => {
      return includes(currentMonth, fish.months) && isInTimeRange(fish.time)
    });
    setData(xs)
  } 
  const columns = [
    {
      title: '',
      dataIndex: 'image',
      render: (image: string) => (<img src={image} alt='' className="fish-icon"/>)
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      render: (location: FishLocation) => parseFishLocation(location),
      filters: FishLocationLabel.map((location, id) => ({
        text: location,
        value: id
      })),
      onFilter: (value: string | number | boolean, fish: Fish) => fish.location === value,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      render: (time: Time) => DisplayTime({time})
    },
    {
      title: 'Months',
      dataIndex: 'months',
      render: (months: Month[]) => DisplayMonths({ months })
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: {
        compare: (a: Fish, b: Fish) => a.price - b.price,
        multiple: 1
      }
    },
    {
      title: 'Size',
      dataIndex: 'shadowSize'
    },
  ];

  return (
    <>
    <div>
      <Button onClick={() => availableNow()}>available now</Button>
      <Button onClick={() => setData(FishData)}>show all</Button>
    </div>
    <Table<Fish>
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
    >
    </Table>
    </>

  )
}

const DisplayMonths: FunctionComponent<{months: Month[]}> = ({ months }) => {
  const currentMonth = moment().get('month') as Month;

  const getColor = (month: number) => {
    switch (month) {
      case 12:
      case 1:
      case 2:
        return 'blue';
      case 3:
      case 4:
      case 5:
        return 'pink';
      case 6:
      case 7:
      case 8:
        return 'gold';
      case 9:
      case 10:
      case 11:
        return 'volcano'
    }
  }
  return (
    <div>
      { months.map(month => (
        <Tag key={month} color={getColor(month)}>{parseMonth(month)}</Tag>
      ))}
    </div>
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
export default FishTable;