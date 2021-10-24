import React from 'react';
import SlideHome from './components/SlideHome';
import HomeProduct from './components/HomeProduct';
import FeatureProduct from './components/FeatureProduct';
import HotPromotion from './components/HotPromotion';

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
