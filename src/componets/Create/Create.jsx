import React, { Fragment, useState,  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { getStorage, ref, uploadBytes, getDownloadURL, } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import './Create.css';
import Header from '../Header/Header';

const Create = () => {
 const [state, setState] = useState({
  name: '',
  category: '',
  price: '',
  file: null
 })

 const { db } = useContext(FirebaseContext);
 const { user } = useContext(AuthContext);
 const nagivate = useNavigate()

 async function handler() {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `image/${state.file.name}`)
      const snapShot = await uploadBytes(storageRef, state.file)
      const url = await getDownloadURL(storageRef);
      const productRef = collection(db, 'products');
      const date = new Date()
      const data = {
          name: state.name,
          category: state.category,
          price: state.price,
          url: url,
          userId: user.uid,
          createdAt: date.toDateString(),
      }
      await addDoc(productRef, data)
      nagivate('/')

    } catch (error) {
      console.log(error.message);
    }
 }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              onChange={(e) => setState({...state, name: e.target.value})}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue=""
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              onChange={(e) => setState({...state, category: e.target.value})}
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue=""
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input onChange={(e) => setState({...state, price: e.target.value})} className="input" type="number" id="fname" name="Price" />
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={state.file ? URL.createObjectURL(state.file) : ""}></img>
            <br />
            <input onChange={(e) => {
              setState({...state, file: e.target.files[0]})
            }} type="file" />
            <br />
            <button type='button' onClick={handler} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;