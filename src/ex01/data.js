import _ from 'lodash';

export function generateData(input) {
  const multiplier = input.length !== 0 ? input.length : 1;

  return _.range(2).map(t =>
    _.range(25 * multiplier).map((j, i) => {
      return {
        x: j,
        y: (t + 1) * _.random(0, 255)
      };
    })
  );
}