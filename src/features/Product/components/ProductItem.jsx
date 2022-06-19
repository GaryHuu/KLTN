import userApi from 'api/userApi'
import freeshipIcon from 'assets/img/freeship-icon.svg'
import medicineImg from 'assets/img/medicine-img-01.png'
import presentGreenIcon from 'assets/img/present-green-icon.svg'
import { openModal } from 'features/Auth/userSlice'
import { addToCart } from 'features/Cart/cartSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProductItem({ product }) {
  const isPromo = product.discount !== 'No'
  const price = parseInt(product.price)
  const history = useHistory()
  const user = useSelector((state) => state.user.current)
  const dispatch = useDispatch()
  let discountPercent
  let priceAfterDiscount
  if (isPromo && product) {
    discountPercent = parseInt(product.discount.slice(0, -1)) / 100
    priceAfterDiscount = parseInt(price) - parseInt(price) * discountPercent
  }

  const handleAddToCart = () => {
    if (user) {
      //add to cart by user id
      let action = addToCart({
        idProduct: product.id,
        quantity: 1,
        price,
        priceAfterDiscount: price,
        name: product.name,
      })
      if (isPromo && priceAfterDiscount) {
        action = addToCart({
          idProduct: product.id,
          quantity: 1,
          price,
          priceAfterDiscount: priceAfterDiscount,
          name: product.name,
        })
      }
      dispatch(action)
      toast.success('Thêm vào giỏ hàng thành công!')
      return
    }
    toast.warn('Đăng nhập để thêm vào giỏ hàng!')
    const action = openModal()
    dispatch(action)
  }

  const handleAddToFavorite = () => {
    if (user) {
      ;(async function () {
        try {
          const res = await userApi.addFavorites({
            product_id: product.id,
          })
          if (res.status === 200 && res.success === true) {
            toast.success('Đã yêu thích sản phẩm')
          }
        } catch (error) {
          toast.warn('Sản phẩm đã yêu thích sẵn')
        }
      })()
      return
    }
    toast.warn('Đăng nhập để thêm sản phẩm yêu thích!')
    const action = openModal()
    dispatch(action)
  }

  return (
    <Link
      onClick={(e) => {
        e.preventDefault()
        history.push(`/product/${product.id}`)
      }}
      to={`/product/${product.id}`}
      className='product__item discount'
    >
      <div className='item__header'>
        {isPromo && (
          <span className='header__discount'>{product.discount}</span>
        )}
        <img
          className='header__product'
          src={product?.images?.[0].url || medicineImg}
          alt='medicine logo'
        />
        <img
          className='header__freeship'
          src={freeshipIcon}
          alt='freeship logo'
        />
        <img className='header__gift' src={presentGreenIcon} alt='gift logo' />
      </div>
      <div className='item__footer'>
        <h5>
          {product.name.length <= 40
            ? product.name
            : `${product.name.substring(0, 40)}...`}
        </h5>

        {isPromo && priceAfterDiscount ? (
          <p>
            {priceAfterDiscount.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        ) : (
          <p>
            {price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        )}

        {isPromo && priceAfterDiscount && (
          <p className='footer__discount'>
            {price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        )}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleAddToCart()
        }}
        className='action action-cart'
      >
        <i className='fas fa-shopping-cart'></i>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleAddToFavorite()
        }}
        className='action action-heart'
      >
        <i className='fas fa-heart'></i>
      </div>
    </Link>
  )
}

export default ProductItem
