import React from 'react';

import {
  useFetch 
} from './fetch';

// ...

export default function Followers({ endpoint }) {
  const data = useFetch(endpoint, 2000); // throws promise upon first render.

  return (
    <>
      <h2>Followers</h2>
      {data.map((follower, i) => <p key={i}>{follower.login}</p>)}
    </>
  );
}