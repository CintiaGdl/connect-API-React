import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { RequireAuth } from './shared/components/RequireAuth/RequireAuth';
import { useState } from 'react';
import { JwtContext } from './shared/context/JWTContext';

function App() {

  const [jwt, setJwt] = useState(localStorage.getItem("token"));

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
    <div className="App">
      <Router>
        <nav className='NavBar'>
          <h1>Welcome</h1>
          {jwt && <NavLink to='/'>Home</NavLink>}
          {!jwt && (
            <>
              <NavLink to='/login'>Login</NavLink>
              <NavLink to='/register'>Register</NavLink>
            </>
          )}
        </nav>
        <Routes>
          <Route path='/' element={<RequireAuth><HomePage /></RequireAuth>}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
        </Routes>
      </Router>
    </div>
    </JwtContext.Provider>
  );
}

export default App;
