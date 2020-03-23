import axios from 'axios';

import {
  useQuery,
  queryCache
} from 'react-query';

import {
  delay
} from './util';

// ...

async function doFetch(uri, delayMs) {
  const result = await axios(uri)
  
  return delayMs ? delay(result.data, delayMs) : result.data;
}

function doImageFetch(src) {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      resolve(src)
    }
  });
}

// ...
// useQuery configuration.

const config = {
  staleTime: 10 * 60 * 1000,
  suspense: true
};

// ...
// Custom wrapper hooks for useQuery.
export function useFetch(uri, delayMs) {
  return useQuery(
    uri,
    () => doFetch(uri, delayMs),
    config
  ).data;
}

export function useImageFetch(src) {
  return useQuery(
    src,
    () => doImageFetch(src),
    config
  ).data;
}

// ...

export function preFetch(uri, delayMs) {
  queryCache.prefetchQuery(
    uri,
    () => doFetch(uri, delayMs)
  );
}