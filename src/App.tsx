import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Officein from './Components/Officein/Officein';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/officein" element={<Officein />} />
    </Routes>
  );
}

export default App;
