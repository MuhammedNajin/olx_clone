import React from 'react';

import Header from '../componets/Header/Header';
import Banner from '../componets/Banner/Banner';

import Posts from '../componets/Posts/Posts';
import Footer from '../componets/Footer/Footer';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 