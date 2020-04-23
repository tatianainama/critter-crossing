import React, { FunctionComponent, useState, useEffect } from 'react';
import { Insect } from 'types';
import { getInsects } from 'services/Api';
import Table, { Column } from 'components/Table';
import { prop, path } from 'ramda';

const InsectTable: FunctionComponent = () => {
  const [ data, setData ] = useState<Insect[]>([]);
  const columns: Column<Insect>[] = [
    {
      label: 'name',
      key: 'name'
    },
    {
      label: 'price',
      key: 'price',
      sort: prop('price')
    },
    {
      label: 'flicks',
      key: 'flickPrice',
      sort: prop('flickPrice')
    },
    {
      label: 'location',
      key: 'location',
      sort: prop('location')
    },
    {
      label: 'time',
      key: 'time',
      type: 'time',
      sort: path(['time', '0', '0']) as (<Insect>(critter: Record<string, Insect>) => Insect)
    },
    {
      label: 'availability',
      key: 'months',
      type: 'month'
    }
  ]
  
  useEffect(() => {
    getInsects().then(setData)
  }, [])
  
  return (
    <>
      <Table data={data} columns={columns}></Table>
    </>


  
  )
};

export default InsectTable;