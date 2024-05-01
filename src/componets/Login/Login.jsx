import React, { useState, useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '/Images/olx-logo.png';
import './Login.css';

function Login() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const handler = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user)
      navigate('/');
    } catch (error) {

      console.log(error.code, error.message);
    }


  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue=""
          />
          <br />
          <br />
          <button type='button' onClick={handler} >Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;