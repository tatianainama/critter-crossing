import React, { FunctionComponent, useState, useEffect } from 'react';
import { Insect } from 'types';
import { getInsects } from 'services/Api';
import Table, { Column } from 'components/Table';

const InsectTable: FunctionComponent = () => {
  const [ data, setData ] = useState<Insect[]>([]);
  const columns: Column<Insect>[] = [
    {
      label: 'name',
      key: 'name'
    },
    {
      label: 'price',
      key: 'price'
    },
    {
      label: 'flicks',
      key: 'flickPrice'
    },
    {
      label: 'location',
      key: 'location'
    },
    {
      label: 'time',
      key: 'time',
      type: "time"
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