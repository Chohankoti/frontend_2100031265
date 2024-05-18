import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "./components/NavBar";

import Task1 from "./components/Task1";
import Task2 from './components/Task2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Task1 />} />
          <Route path="/2" element={<Task2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
