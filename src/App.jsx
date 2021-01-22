import React from 'react';
import routes from './routes/index';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/index';

function App() {
  return (
    <BrowserRouter>
      { renderRoutes(routes) }
    </BrowserRouter>
  );
}

export default App;