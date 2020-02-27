import React from 'react';

import useSWR from 'swr';

import {
  BASE_URL
} from './constants';

import {
  createFetcher
} from './util';

// ...

const fetcher = createFetcher(4000);

export default function User({ user }) {
  const { data } = useSWR(`${BASE_URL}/${user}`, fetcher);

  if (!data) {
    return `Loading ${user}...`;
  }

  const {
    avatar_url,
    name
  } = data;

  return (
    <>
      <div>
        <img className="image" src={avatar_url} alt="" />
      </div>
      <h1>{name}</h1>
    </>
  )
}