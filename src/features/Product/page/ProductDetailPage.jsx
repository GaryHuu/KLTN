import productApi from 'api/productApi';
import Quantity from 'components/Quantity';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from 'features/Auth/userSlice';
import { addToCart } from 'features/Cart/cartSlice';
import withLoading from 'components/HOC/withLoading';
import userApi from 'api/userApi';

function ProductDetailPage({hideLoading, showLoading}) {
  const {
    params: { id },
  } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [imgURL, setImgURL] = useState();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);

  useEffect(() => {
    (async function () {
      setLoading(true);
      showLoading();
      try {
        const { data } = await productApi.getProductByID(id);
        setImgURL(data[0].images[0].url);
        setProduct(data[0]);
      } catch (error) {}
      setLoading(false);
      hideLoading();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleQuantityChange = (newValue) => {
    setQuantity(newValue);
  };

  const handleAddToCartClick = () => {
    if (user) {
      //add to cart by user id
      let action = addToCart({
        idProduct: product.id,
        quantity,
        price,
        priceAfterDiscount: price,
      });
      if(isPromo && priceAfterDiscount) {
        action = addToCart({
          idProduct: product.id,
          quantity,
          price,
          priceAfterDiscount: priceAfterDiscount,
        });
      } 
      dispatch(action);
      toast.success('Thêm vào giỏ hàng thành công!');
      return;
    }
    toast.warn('Đăng nhập để thêm vào giỏ hàng!');
    const action = openModal();
    dispatch(action);
  };

  const isPromo = product?.discount !== 'No';
  const price = parseInt(product?.price);
  let discountPercent;
  let priceAfterDiscount;
  if (isPromo) {
    discountPercent = parseInt(product?.discount?.slice(0, -1)) / 100;
    priceAfterDiscount = parseInt(price) - parseInt(price) * discountPercent;
  }

  const handleFavoriteClick = () => {
    (async function () {
      showLoading();
      try {
        const res = await userApi.addFavorites({
          product_id: product.id
        })
        console.log(res);
        toast.success('Đã Yêu Thích Sản Phẩm');
      } catch (error) {
        toast.warn('Sản Phẩm Đã Yêu Thích Sẵn');
      }
      hideLoading();
    })();
  }

  return (
    <div className='product-detail-page'>
      <div className='container'>
        <div className='product-detail-page__content'>
          <div className='product-detail-page__thumbnail'>
            <div className='thumbnail-main'>
              {loading ? (
                <Skeleton height={420} width={350} />
              ) : (
                <img src={imgURL || ''} alt='' />
              )}
            </div>
            <div className='list'>
              {loading ? (
                <Skeleton count={3} height={50} width={50} />
              ) : (
                <Fragment>
                  <img src={imgURL || ''} alt='' />
                  <img src={imgURL || ''} alt='' />
                  <img src={imgURL || ''} alt='' />
                </Fragment>
              )}
            </div>
          </div>
          <div className='product-detail-page__info'>
            {loading ? (
              <Skeleton
                height={26}
                width={'95%'}
                style={{ margin: '0 20px' }}
              />
            ) : (
              <p className='short-desc'>{product.name}</p>
            )}
            <div className='trademark'>
              {loading ? (
                <Skeleton
                  height={26}
                  width={184}
                  style={{ margin: '0 20px' }}
                />
              ) : (
                <p>
                  Danh Mục Sản phẩm: &nbsp;
                  <span>{product.category_name}</span>
                </p>
              )}

              {loading ? (
                <Skeleton height={26} width={150} />
              ) : (
                <p>Mã SP: {product.id}</p>
              )}
            </div>
            <div className='info-detail'>
              {loading ? (
                <Skeleton height={75} width={'95%'} />
              ) : (
                <p>{product?.content}</p>
              )}
            </div>
            <div className='main-info'>
              {loading ? (
                <Skeleton height={24} width={150} />
              ) : (
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
              )}
              {loading ? (
                <Skeleton height={22} width={130} />
              ) : (
                <p className='status'>
                  Tình trạng:&nbsp; <span>Còn Hàng</span>
                </p>
              )}

              {loading ? (
                <Skeleton
                  style={{ marginTop: '10px' }}
                  height={50}
                  width={'90%'}
                />
              ) : (
                <div className='buy'>
                  <div className='buy__quantity'>
                    <span>Số Lượng &nbsp;</span>
                    <Quantity
                      count={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <div onClick={handleAddToCartClick} className='buy__btn'>
                    <i className='fas fa-shopping-cart'></i>
                    <span>Chọn Mua</span>
                  </div>
                  <div onClick={handleFavoriteClick} style={{marginLeft: '10px'}} className='buy__btn heart'>
                    <i className='fas fa-heart'></i>
                    <span>Yêu Thích</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='content-info'>
          {loading ? (
            <Skeleton style={{ margin: '10px' }} height={30} width={'20%'} />
          ) : (
            <h4>Thông tin sản phẩm</h4>
          )}

          {loading ? (
            <Skeleton style={{ margin: '10px' }} height={300} width={'95%'} />
          ) : (
            <p
            className='content'
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default withLoading(ProductDetailPage);
