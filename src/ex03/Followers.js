import React from 'react';

import useSWR from 'swr';

import {
  createFetcher
} from './util';

// ...

const fetcher = createFetcher(2000);

export default function Followers({ endpoint }) {
  const { data } = useSWR(endpoint, fetcher);

  return (
    <>
      <h2>Followers</h2>
      {data 
        ? data.map((follower, i) => <p key={i}>{follower.login}</p>)
        : 'Loading followers...'
      }
    </>
  );
}