import React, { FunctionComponent, useState, useEffect } from 'react';
import { getFishes } from 'services/Api';
import Table from 'components/Table';
import FISHES from './fish-data.json';
import { Fish } from 'types';

type props = {
};

const FishData = FISHES as unknown as Fish[];

const FishTable: FunctionComponent<props> = () => {
  const [ data, setData ] = useState<Fish[]>(FishData);

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