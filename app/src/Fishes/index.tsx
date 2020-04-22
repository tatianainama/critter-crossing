import React, { FunctionComponent, useState, useEffect } from 'react';
import { getFishes } from 'services/Api';
import Table from 'components/Table';
import { Fish } from 'types';

type props = {
};

const FishTable: FunctionComponent<props> = () => {
  const [ data, setData ] = useState<Fish[]>([]);

  const fetchData = async () => {
    const response = await getFishes()
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
}

export default FishTable;