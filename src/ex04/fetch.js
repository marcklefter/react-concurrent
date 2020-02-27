import axios from 'axios';

import {
  delay
} from './util';

// ...
// This method will track the state of a promise (returned from a fetch call) and notify a suspense boundary while
// a fetch is pending by throwing the promise (as required by the Suspense mechanism). 
function suspensify(promise) {
  let status = "pending";
  let result;
  
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "failure";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "failure") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

async function _fetch(uri, delayMs) {
  const result = await axios(uri);

  return delayMs ? delay(result.data, delayMs) : result.data;
}

function _fetchImage(src) {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      resolve(src)
    }
  });
}

// uri -> promise. 
const promises = {};

// ...

export function preFetch(uri, delayMs) {
  !promises[uri] && (promises[uri] = suspensify(_fetch(uri, delayMs)));
}

export function useFetch(uri, delayMs) {
  if (!promises[uri]) {
    promises[uri] = suspensify(_fetch(uri, delayMs));
  }

  // throws the promise for the passed uri if the fetch is currently pending, otherwise it returns the fetched data.
  return promises[uri].read();
}

export function useImageFetch(uri) {
  if (!promises[uri]) {
    promises[uri] = suspensify(_fetchImage(uri));
  }

  return promises[uri].read();
}
