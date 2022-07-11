import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Officein from './Components/Officein/Officein';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthRequired } from './auth/auth';
import Header from './Components/Header/Header';
import SellBook from './Components/SellBook/SellBook';
import FranchApps from './Components/FranchApps/FranchApps';

function App() {
  return (
    <Routes>
      <Route path="/officein" element={<Officein />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/sellbook"
        element={(
          <AuthRequired>
            <>
              <Header />
              <SellBook />
            </>
          </AuthRequired>
      )}
      />
      <Route path="/" element={<Login />} />
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
      <Route
        path="/franchising"
        element={(
          <AuthRequired>
            <>
              <Header />
              <FranchApps />
            </>
          </AuthRequired>
        )}
      />
    </Routes>
  );
}

export default App;
