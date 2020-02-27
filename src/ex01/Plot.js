import React from 'react';

import {
  VictoryScatter
} from 'victory';

import {
  generateData
} from './data';

import styles from './Plot.module.css';

// ...

const colors = ['#fff489', '#fa57c1', '#b166cc', '#7572ff', '#69a6f9'];

// ...

export default React.memo(function Plot({ input }) {
  const dataset = generateData(input);

  return (
    <div className={styles.grid}>
      {dataset.map((data, i) => (
        <VictoryScatter
          key={i}
          data={data}
          size={5}
          style={{
            data: {
              fill: d => colors[d.x % 5],
            },
          }}
        />
      ))}
    </div>
  )
});