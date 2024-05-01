import React, { useContext, useState } from 'react';
import { AuthContext, FirebaseContext  } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate()
  console.log(user)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{ user != null ? `Welcome ${user.displayName}` : 'Login' }</span>
          <hr />
        </div>
        { user && <div className="loginPage">
          <button onClick={(e) => {
            const auth = getAuth();
             signOut(auth)
             .then(() => {
               setUser(null);
             })
             .catch((err) => {
               console.log(err)
             })
          }} className='logout-button'>Logout</button>
        </div> }

        <div className="sellMenu">
          <SellButton></SellButton>
          <div onClick={(e) => {
              navigate('/create')
            }} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;