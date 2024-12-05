import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Blog from './Blog/Blog';
import Register from './Register'
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/blog/*" element={<Blog />} />
      <Route path="/register/*" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

// Measure performance
reportWebVitals();

