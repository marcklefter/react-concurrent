import React, {
  useState
} from 'react';

import {
  BASE_URL
} from './constants';

import Followers from './Followers';
import Repos from './Repos';
import User from './User';

// ...

const users = [
  'marcklefter',
  'krawaller',
  'masak',
  'toshi38'
];

// ...

export default function App() {
  const [currentUser, setCurrentUser] = useState('');

  const selectUser = user => {
    setCurrentUser(user);
  };

  const onBack = () => {
    setCurrentUser('');
  };

  return currentUser
    ? (
      <>
        <button onClick={onBack}>Back</button>
        <div className="row" style={{ flexDirection: 'column' }}>
          <User user={currentUser} onBack={onBack} />
        </div>
        <div className="row">
          <div className="column">
            <Repos endpoint={`${BASE_URL}/${currentUser}/repos`} />
          </div>
          <div className="column">
            <Followers endpoint={`${BASE_URL}/${currentUser}/followers`} />
          </div>
        </div>
      </>
    )
    : users.map(user => (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        key={user}
        style={{
          display: 'block',
          cursor: 'pointer'
        }}
        onClick={() => selectUser(user)}
      >
        {user}
      </a>
    ))
}