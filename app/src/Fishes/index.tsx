import React, { FunctionComponent, useState, useEffect } from 'react';
import { getFishes } from 'services/Api';
import Table, { Column } from 'components/Table';
import { Fish } from 'types';
import { prop, path } from 'ramda';

type props = {
};

const FishTable: FunctionComponent<props> = () => {
  const [ data, setData ] = useState<Fish[]>([]);

  const columns: Column<Fish>[] = [
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
      label: 'location',
      key: 'location',
      sort: prop('location'),
    },
    {
      label: 'size',
      key: 'shadowSize'
    },
    {
      label: 'time',
      key: 'time',
      type: 'time',
      sort: path(['time', '0', '0']) as <T>(critter: Record<string, T>) => T
    },
    {
      label: 'availability',
      key: 'months',
      type: 'month'
    }
  ]

  useEffect(() => {
    getFishes().then(setData)
  }, [])

  return (
    <>
      <Table data={data} columns={columns}></Table>
    </>

  )
}

export default FishTable;