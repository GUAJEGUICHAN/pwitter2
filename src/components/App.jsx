import React, { useEffect, useState } from 'react'
import AppRouter from './AppRouter';
import { authService } from '../fbInstance';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(authService.getAuth(), (user) => {
      setUserObj(user)
      setInit(true);
    })
  }, [])
  return (
    <div>
      {init ? <AppRouter isLoggedIn={userObj ? true : false} userObj={userObj} /> : "로딩중...."
      }
    </div>);
}

export default App;
