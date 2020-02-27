import React from 'react';

import useSWR from 'swr';

import {
  createFetcher
} from './util';

// ...

const fetcher = createFetcher(1000);

export default function Repos({ endpoint }) {
  const { data } = useSWR(endpoint, fetcher);

  return (
    <>
      <h2>Repositories</h2>
      {data 
        ? data.map((repo, i) => <p key={i}>{repo.name}</p>)
        : 'Loading repositories...'
      }
    </>
  );
}