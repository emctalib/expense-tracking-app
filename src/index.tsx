import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './slices/store';
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<h2>Loading...</h2>}>
      <Provider store={store}><App /></Provider>
    </Suspense>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
