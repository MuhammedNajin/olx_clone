import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Context, { FirebaseContext } from './store/Context.jsx'
import { db } from './Firebase/Firebase.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{db, name: 'najin'}}>
     <Context>
        <App />
     </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
