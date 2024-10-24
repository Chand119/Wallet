
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import store, { persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
)