import axios from 'axios';

// ...

export function delay(resolveWith, ms) {
  return new Promise(resolve => {
    setTimeout(
        () => resolve(resolveWith),
        ms
    )
  });
}

export function createFetcher(delayMs) {
  return async function(uri) {
    const result = await axios(uri);
  
    return delayMs ? delay(result.data, delayMs) : result.data;
  }
}