import React, { FunctionComponent, useState, useEffect } from 'react';
import { Insect } from 'types';
import { getInsects } from 'services/Api';
import Table from 'components/Table';

const InsectTable: FunctionComponent = () => {
  const [ data, setData ] = useState<Insect[]>([]);
  
  const fetchData = async () => {
    const response = await getInsects()
    setData(response)
  }
  
  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <>
      <Table data={data}></Table>
    </>
  
  )
};

export default InsectTable;