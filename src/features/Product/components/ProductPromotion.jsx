import React from 'react';
import iconHotPromotion from 'assets/img/icon-hot-promotion.svg';
import hotPromotionItem01 from 'assets/img/hot-promotion-item-01.png';
import hotPromotionItem03 from 'assets/img/hot-promotion-item-03.png';
import hotPromotionItem02 from 'assets/img/hot-promotion-item-02.png';
function ProductPromotion() {
  return (
    <div className='produce-promo'>
      <div className='produce-promo__title'>
        <img src={iconHotPromotion} alt='' />
        <span>Sản Phẩm Khuyến Mãi</span>
      </div>
      <div className='produce-promo__list'>
        <div className='produce-promo__item'>
          <img src={hotPromotionItem01} alt='' />
        </div>
        <div className='produce-promo__item'>
          <img src={hotPromotionItem03} alt='' />
        </div>
        <div className='produce-promo__item'>
          <img src={hotPromotionItem02} alt='' />
        </div>
      </div>
    </div>
  );
}

export default ProductPromotion;
