import './styles.css';

import React, {
  lazy,
  Suspense,
} from 'react';

const App = lazy(() => import('./App'));

export default function() {
  return (
    <Suspense fallback={'Loading...'}>
      <App />
    </Suspense>
  )
};