import React, { useState } from 'react';
// import { useRouteMatch } from 'react-router';
import productDetailImg from 'assets/img/product-detail.png';
import Quantity from 'components/Quantity';
import { useHistory } from 'react-router';
function ProductDetailPage() {
  const history = useHistory();

  // const {
  //   params: { id },
  // } = useRouteMatch();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newValue) => {
    console.log(newValue);
    setQuantity(newValue);
  };

  const handleAddToCartClick = () => {
    history.push('/cart');
  };

  return (
    <div className='product-detail-page'>
      <div className='container'>
        <div className='product-detail-page__content'>
          <div className='product-detail-page__thumbnail'>
            <div className='thumbnail-main'>
              <img src={productDetailImg} alt='' />
            </div>
            <div className='list'>
              <img src={productDetailImg} alt='' />
              <img src={productDetailImg} alt='' />
              <img src={productDetailImg} alt='' />
            </div>
          </div>
          <div className='product-detail-page__info'>
            <p className='short-desc'>
              Thực Phẩm Chức Năng Bảo Vệ Sức Khỏe Solgar Vegetarian COQ-10 60mg
              Chai 60 Viên
            </p>
            <div className='trademark'>
              <p>
                Thương hiệu: &nbsp;
                <span>Blackmores</span>
              </p>
              <p>SKU: TP002455</p>
            </div>
            <div className='info-detail'>
              <p>
                Trọng lượng: &nbsp; <span>300 g</span>
              </p>
              <p>
                Kích thước: &nbsp; <span>15 x 15 x 15 cm</span>
              </p>
              <p>
                Quy cách: &nbsp; <span>Chai 60 viên</span>
              </p>
              <p>
                Xuất sứ: &nbsp; <span>USA</span>
              </p>
            </div>
            <div className='main-info'>
              <p className='price'>
                Giá: &nbsp; <span>1.160.000đ</span>
              </p>
              <p className='status'>
                Tình trạng:&nbsp; <span>Còn Hàng</span>
              </p>
              <div className='buy'>
                <div className='buy__quantity'>
                  <span>Số Lượng &nbsp;</span>
                  <Quantity count={quantity} onChange={handleQuantityChange} />
                </div>
                <div onClick={handleAddToCartClick} className='buy__btn'>
                  <i className='fas fa-shopping-cart'></i>
                  <span>Chọn Mua</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
