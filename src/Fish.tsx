import React, { FunctionComponent } from 'react';
import { Table } from 'antd';

import FISHES from './fish-data.json';
import { Fish } from './types';

type props = {
};

const FishData = FISHES as unknown as Fish[];

const FishTable: FunctionComponent<props> = () => {
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
    },
    {
      title: 'Time',
      dataIndex: 'time'
    },
    {
      title: 'Months',
      dataIndex: 'months'
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
    <Table columns={columns} dataSource={FishData} size="small">
    </Table>
  )
}

export default FishTable;