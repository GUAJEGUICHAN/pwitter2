import React, { useEffect, useState } from 'react'
import AppRouter from './AppRouter';
import { authService } from '../fbInstance';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(authService.getAuth(), (user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true);
    })
  }, [])
  return (
    <div>
      {
        init ? <AppRouter isLoggedIn={isLoggedIn} /> : "로딩중...."
      }
    </div>);
}

export default App;
