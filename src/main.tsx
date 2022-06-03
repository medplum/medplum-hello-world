import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import '@medplum/react/defaulttheme.css';
import '@medplum/react/styles.css';
import './index.css';

const medplum = new MedplumClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MedplumProvider medplum={medplum}>
        <App />
      </MedplumProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
