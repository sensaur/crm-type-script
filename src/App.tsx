import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Officein from './Components/Officein/Officein';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthRequired } from './auth/auth';
import Header from './Components/Header/Header';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/officein" element={<Officein />} />
      <Route
        path="/dashboard"
        element={(
          <AuthRequired>
            <>
              <Header />
              <Dashboard />
            </>
          </AuthRequired>
)}
      />
    </Routes>
  );
}

export default App;
