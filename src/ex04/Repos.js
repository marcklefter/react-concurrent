import React from 'react';

import {
  useFetch 
} from './fetch';

// ...

export default function Repos({ endpoint }) {
  const data = useFetch(endpoint, 1000); // throws promise upon first render.

  return (
    <>
      <h2>Repositories</h2>
      {data.map((repo, i) => <p key={i}>{repo.name}</p>)}
    </>
  );
}