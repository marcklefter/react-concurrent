import React, {
  useState,

  useDeferredValue
} from 'react';

import Plot from './Plot';

import styles from './App.module.css';

// ...

export default function App() {
  const [text, setText] = useState('');
  
  // as the user enters text, the useDeferredValue hook will return a version of it that "lags behind" for at most
  // 2000 ms. This allows this component to immediately show the newly entered text without waiting for the Plot 
  // component to also render (and thus possibly block further user input).
  //
  // The Plot component will instead render with the (deferred) text in the background and thus not block the user
  // from entering text.
  const deferredText = useDeferredValue(text, {
    timeoutMs: 2000
  });

  console.log(text, deferredText);

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
      <Plot input={deferredText} />
    </div>
  )
}