import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameList from './components/GameList';
import GameUploadForm from './components/GameUploadForm';
import AuthForm from './components/AuthForm';
import {api} from './utils/api'

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
     const checkLogin = async () => {
       const token = localStorage.getItem("token");
       if(token) {
        try{
          const response = await api.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data.user)
          console.log(response.data.user)
        } catch (error){
            console.log(error)
        }
       }
     }
     checkLogin()
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push('/login')
  };
   const handleLogin = (userData) => {
       setUser(userData);
   }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
        <Switch>
          <Route exact path="/"  render={() => <GameList user={user} />}/>
          <Route path="/upload" render={() => user ? <GameUploadForm /> : <AuthForm onLogin={handleLogin} />} />
          <Route path="/login" render={() => <AuthForm  onLogin={handleLogin} />} />
          <Route path="/register" render={() => <AuthForm isRegister onLogin={handleLogin} />} />
      </Switch>
    </div>
  );
}

export default App;
