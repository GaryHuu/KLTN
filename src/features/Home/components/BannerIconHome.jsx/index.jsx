import React from 'react';
import customerServiceIcon from 'assets/img/customer-service-icon.svg';
import percentGreenIcon from 'assets/img/percent-green-icon.svg';
import deliveryGreenIcon from 'assets/img/delivery-green-icon.svg';
import giftGreenIcon from 'assets/img/gift-green-icon.svg';

function BannerIconHome() {
  return (
    <div className='banner__icon'>
      <div className='icon__item'>
        <img src={customerServiceIcon} alt='customer service logo' />
        <p>Dược sĩ tư vấn</p>
      </div>
      <div className='icon__item'>
        <img src={percentGreenIcon} alt='percent logo' />
        <p>Sản phẩm chính hãng</p>
      </div>
      <div className='icon__item'>
        <img src={deliveryGreenIcon} alt='delivery logo' />
        <p>Giao hàng toàn quốc</p>
      </div>
      <div className='icon__item'>
        <img src={giftGreenIcon} alt='gift logo' />
        <p>Tích lũy đổi quà</p>
      </div>
    </div>
  );
}

export default BannerIconHome;
