import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '/Images/olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';

export default function Signup() {
    const navigate = useNavigate(); 
    const [ userName, setUserName ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const { db } = useContext(FirebaseContext);
    const submit = (e) => {
        console.log(db)
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('hii')
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: userName
            })
            .then(() => {
              const document = doc(db, 'users', user.uid );
              setDoc(document, { 
                userName: userName, 
                phone: phone 
              })
              .then(() => {
                console.log('success')
                navigate('/login');
              })
              .catch((err) => {
                console.log('error')
                console.log(err.message, err.code)
              })
              
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err.code, err.message)
        })

    }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input 
            onChange={(e) => setUserName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue=""
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
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
          <button type='button' onClick={submit}>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}