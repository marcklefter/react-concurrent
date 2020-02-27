import React, {
  useState,
  Suspense,
  useTransition
} from 'react';

import {
  preFetch
} from './fetch';

import {
  BASE_URL
} from './constants';

import ErrorBoundary from './ErrorBoundary';
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
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // the useTransition hook returns:
  //
  // startTransition - a function that allows us to perform low-priority state updates (= initiate a "transition"). 
  // isPending - a flag to inform us of whether or not we're transitioning.
  const [startTransition, isPending] = useTransition({
    timeoutMs: 5000
  });

  const selectUser = user => {
    setCurrentUser(user);

    // initiate a "transition", i.e. prepare for switching to the user profile view, in the background. 
    startTransition(() => {
      // start to fetch user profile data.
      preFetch(`${BASE_URL}/${user}`);

      // perform a low-priority state update to begin rendering the user profile view, as part of the background work.
      setShowProfile(true);
    })
  };

  const onBack = () => {
    setCurrentUser(null);
    setShowProfile(false);
  };

  return (
    showProfile
      ? (
        // this suspense boundary catches the promise thrown by the User component if its data is unavailable.
        //
        // Note: The isPending flag will be false until the transition completes (= the component's data has been 
        // fetched) or up until the transition timeout; in the latter case, the Suspense fallback will be shown.
        <Suspense fallback={`Loading ${currentUser}...`}>
          {/* this error boundary catches any error(s) that may occur during data fetching. */}
          <ErrorBoundary>
            <button onClick={onBack}>Back</button>

            <div className="row" style={{ flexDirection: 'column' }}>
              <User user={currentUser} />
            </div>

            <div className="row">
              <div className="column">
                {/* this suspense boundary allows us to load repos "lazily", i.e. ensuring that rendering the 
                critical User component is not delayed by the not-as-vital Repos component. */}
                <Suspense fallback={`Loading repos...`}>
                  <Repos endpoint={`${BASE_URL}/${currentUser}/repos`} />
                </Suspense>
              </div>

              <div className="column">
                {/* this suspense boundary allows us to load followers "lazily", i.e. ensuring that rendering the 
                critical User component is not delayed by not-as-vital Followers component. */}
                <Suspense fallback={`Loading followers...`}>
                  <Followers endpoint={`${BASE_URL}/${currentUser}/followers`} />
                </Suspense>
              </div>
            </div>
          </ErrorBoundary>
        </Suspense>
      )
      : (
        <Suspense fallback={null}>
          {users.map(user => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key={user}
              style={{
                display: 'block',
                cursor: 'pointer'
              }}
              onClick={() => selectUser(user)}
            >
              {/* if a transition to the user profile view is pending (= being prepared in the background), show a 
              pending indicator to the user. */}
              {user} {(isPending && currentUser === user) && '...'} 
            </a>
          ))
          }
        </Suspense >
      )
  )
}