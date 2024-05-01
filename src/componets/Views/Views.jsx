import React, { useContext, useState, useEffect} from 'react';
import { FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './Views.css';
function View() {

  const [ userDetails, setUserDetails ] = useState();
  const [ postDetails, setPostDetails ] = useState();
  const { db } = useContext(FirebaseContext);
  const { id } = useParams();
  const location = useLocation();
  console.log(location.state);
 async function query() {
    try {
      const userSnap = await getDoc(doc(db, 'users', id));
      console.log(userSnap.data())
      setUserDetails(userSnap.data());
      setPostDetails(location.state)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
     query();
     
  },[]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={ postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price } </p>
          <span>{postDetails?.name }</span>
          <p>{postDetails?.category }</p>
          <span>{postDetails?.createdAt }</span>
        </div>
        <div className="contactDetails">
          <p>{ userDetails?.userName }</p>
          <p></p>
          <p>{ userDetails?.phone }</p>
        </div>
      </div>
    </div>
  );
}
export default View;