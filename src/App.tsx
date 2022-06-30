import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Officein from './Components/Officein/Officein';
import Test2 from './Components/Test2/Test2';

function App() {
  return (
    <Routes>
      <Route path="/officein" element={<Officein />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/test2" element={<Test2 />} />
    </Routes>
  );
}

export default App;
