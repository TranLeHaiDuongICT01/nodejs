import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SearchContextProvide } from './context/searchContext';
import { AuthContextProvide } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvide>
      <SearchContextProvide>
        <App />
      </SearchContextProvide>
    </AuthContextProvide>
  </React.StrictMode>
);

