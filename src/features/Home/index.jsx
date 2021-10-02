import React from 'react';
import FeatureProduct from './components/FeatureProduct';
import HomeProduct from './components/HomeProduct';
import HotPromotion from './components/HotPromotion';
import SlideHome from './components/SlideHome';

function Home() {
  return (
    <>
      <SlideHome />
      <HotPromotion />
      <FeatureProduct />
      <HomeProduct />
    </>
  );
}

export default Home;
