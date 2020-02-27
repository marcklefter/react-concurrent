import React, {
  useState
} from 'react';

import Plot from './Plot';

import styles from './App.module.css';

// ...

export default function App() {
  const [text, setText] = useState('');

  const handleChange = e => {
    const value = e.target.value;

    setText(value);
};

  return (
    <div className={styles.container}>
      <input
        value={text}
        style={{ display: 'block', margin: 'auto' }}
        size={50}
        onChange={handleChange}
      />
      <Plot input={text} />
    </div>
  )
}