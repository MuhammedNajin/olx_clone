import React, { useEffect, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Home from './Pages/Home';
import Login from './componets/Login/Login';
import Signup from './componets/SignUp/SignUp';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/Views';

function App() {
  const { user, setUser } = useContext(AuthContext)
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {
          console.log('currentUser', currentUser)
           setUser(currentUser);
        }
    })
  })

  return (
    <div>
     
      <Router >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/view/:id' element={<ViewPost/>} />
         </Routes>
        </Router>
     
    </div>
  );
}

export default App;