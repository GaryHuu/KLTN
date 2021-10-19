import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

import productDetailImg from 'assets/img/product-detail.png';
import Quantity from 'components/Quantity';

import 'react-toastify/dist/ReactToastify.css';
import productApi from 'api/productApi';

function ProductDetailPage() {
  const {
    params: { id },
  } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [imgURL, setImgURL] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { data } = await productApi.getProductByID(id);
        setImgURL(data[0].images[0].url);
        setProduct(data[0]);
        setLoading(false);
      } catch (error) {}
    })();
  }, [id]);

  const handleQuantityChange = (newValue) => {
    console.log(newValue);
    setQuantity(newValue);
  };

  const handleAddToCartClick = () => {
    toast.success('Thêm vào giỏ hàng thành công!');
  };

  const isPromo = product?.discount !== 'No';
  const price = parseInt(product?.price);
  let discountPercent;
  let priceAfterDiscount;
  if (isPromo) {
    discountPercent = parseInt(product?.discount?.slice(0, -1)) / 100;
    priceAfterDiscount = parseInt(price) - parseInt(price) * discountPercent;
  }

  return (
    <div className='product-detail-page'>
      <div className='container'>
        <div className='product-detail-page__content'>
          <div className='product-detail-page__thumbnail'>
            <div className='thumbnail-main'>
              <img src={imgURL || ''} alt='' />
            </div>
            <div className='list'>
              <img src={imgURL || ''} alt='' />
              <img src={imgURL || ''} alt='' />
              <img src={imgURL || ''} alt='' />
            </div>
          </div>
          <div className='product-detail-page__info'>
            <p className='short-desc'>{product.name}</p>
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
                Giá: &nbsp;{' '}
                <span>
                  {isPromo && priceAfterDiscount
                    ? priceAfterDiscount.toLocaleString()
                    : price
                    ? price.toLocaleString()
                    : ''}{' '}
                  đ
                </span>
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
        <div className='content-info'>
          <h4>Thông tin sản phẩm</h4>
          <p
            className='content'
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
