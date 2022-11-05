import React from 'react';
import { GetServerSideProps } from 'next';

interface IHomeProps {
  count: number;
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const { count } = await (await fetch('http://localhost:3333/pools/count')).json();

  return { props: { count } };
};

const Home: React.FC<IHomeProps> = ({ count }) => {
  return (
    <h1>Hello World {count}</h1>
  );
};

export default Home;
