import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Test1 from './Components/Test1/Test1';
import Test2 from './Components/Test2/Test2';

function App() {
  return (
    <>
      <Login />
      <Routes>
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </>
  );
}

export default App;
