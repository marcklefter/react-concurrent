import React from 'react';

import {
  BASE_URL
} from './constants';

import {
  useFetch,
  useImageFetch
} from './fetch';

// ...

function Img({ src }) {
  const image = useImageFetch(src); // throws promise upon first render.

  return (
    <div>
      <img className="image" src={image} alt="" />
    </div>
  )
}

// note: This component suspends until _both_ the user profile information and the avatar image have been fetched
// successfully.
export default function User({ user }) {
  const data = useFetch(`${BASE_URL}/${user}`); // throws promise upon first render.

  const {
    avatar_url,
    name
  } = data;

  return (
    <>
      <Img src={avatar_url} />
      <h1>{name}</h1>
    </>
  );
}