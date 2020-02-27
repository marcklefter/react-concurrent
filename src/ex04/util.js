export function delay(resolveWith, ms) {
  return new Promise(resolve => {
    setTimeout(
        () => resolve(resolveWith),
        ms
    )
  });
}