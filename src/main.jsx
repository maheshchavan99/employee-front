import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { BASE_URL } from './config/config.js'
import { Provider } from 'react-redux'
import { store } from './stores/stores.js'
import { ToastContainer } from 'react-toastify'

axios.defaults.baseURL = BASE_URL
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ToastContainer />
   <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>,
)
