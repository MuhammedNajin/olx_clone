import React, { useState, useEffect, useContext, } from 'react';
import { FirebaseContext,  } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {
  
   const { db } = useContext(FirebaseContext);
   const [ post, setPost ] = useState([]); 
   const navigate = useNavigate();
   const helper = async () => {
    console.log('hii')
    try {
      const docSnap = await getDocs(collection(db, 'products'))
      console.log('hddddddd', docSnap);
      const allPost = docSnap.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        }
      })
      console.log(allPost)
      setPost(allPost)
    } catch (error) {
      console.log(error)
    }
   }
   useEffect(() => {
      helper()
   },[])
   console.log(post)
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        {
        post.map((product) => (
          <div onClick={(e) => {
              navigate(`/view/${product.userId}`, { state: product });
          }} className="cards">
          <div
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{ product.category }</span>
              <p className="name">{ product.name }dddd</p>
            </div>
            <div className="date">
              <span>{ product.createdAt }</span>
            </div>
          </div>
        </div>
        ))
       }
      </div>
      
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;