import React from 'react';
import { Link } from 'react-router-dom';

import bctIcon from 'assets/img/BCT-icon.svg';
import expressIcon from 'assets/img/express-icon.svg';
import fbIcon from 'assets/img/fb-icon.svg';
import ggIcon from 'assets/img/google-icon.svg';
import mailIcon from 'assets/img/mail-icon.svg';
import percentIcon from 'assets/img/percent-icon.svg';
import phanoLinkLogoColor from 'assets/img/phanolink-logo-color.svg';
import phoneIcon from 'assets/img/phone-icon.svg';
import presentIcon from 'assets/img/present-icon.svg';
import transactionIcon from 'assets/img/transaction-icon.svg';
import ytIcon from 'assets/img/youtube-icon.svg';
import zaloIcon from 'assets/img/zalo-icon.svg';

function Footer() {
  return (
    <footer>
      <div className='container footer__commit'>
        <div className='commit__block percent'>
          <img src={percentIcon} alt='percent logo' />
          <p>Sản phẩm chính hãng</p>
        </div>
        <div className='commit__block express'>
          <img src={expressIcon} alt='express logo' />
          <p>Giao hàng toàn quốc</p>
        </div>
        <div className='commit__block transaction'>
          <img src={transactionIcon} alt='transaction logo' />
          <p>Thanh toán linh hoạt</p>
        </div>
        <div className='commit__block present'>
          <img src={presentIcon} alt='gift logo' />
          <p>Tích điểm đổi quà</p>
        </div>
      </div>
      <div className='footer__contact'>
        <div className='container'>
          <div className='wrap'>
            <div className='contact__item phone'>
              <Link to='/' className='item__detail'>
                <img src={phoneIcon} alt='phone logo' />
                <p>
                  Gọi ngay <strong>1800 6768</strong> (tư vấn miễn phí)
                </p>
              </Link>
            </div>
            <div className='contact__item input'>
              <form className='item__form' method='get'>
                <button type='submit'>
                  <img src={mailIcon} alt='mail logo' />
                </button>
                <input
                  type='text'
                  placeholder='Nhập email để nhận mã giảm giá'
                  required=''
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='container footer__info'>
        <div className='info__content'>
          <div className='content__locate'>
            <img src={phanoLinkLogoColor} alt='brand color logo' />
            <div className='locate__address'>
              <p>CÔNG TY CỔ PHẦN DƯỢC PHẨM PHANO</p>
              <Link to='/'>
                Địa chỉ: 31 Hồ Biểu Chánh, P.12, Q.Phú Nhuận, TP.HCM
              </Link>
            </div>
            <div className='locate__contact'>
              <p>MST: 0304860663</p>
              <Link to='/'>Email: cskh@phanolink.com</Link>
              <Link to='/'>Tel: 1800 6768</Link>
            </div>
          </div>
          <div className='content__assist'>
            <h4>HỖ TRỢ KHÁCH HÀNG</h4>
            <ul className='assist__list'>
              <li>
                <Link to='/'>Chính sách đổi trả</Link>
              </li>
              <li>
                <Link to='/'>Chính sách giao hàng</Link>
              </li>
              <li>
                <Link to='/'>Chính sách bảo mật</Link>
              </li>
              <li>
                <Link to='/'>Hướng dẫn thanh toán</Link>
              </li>
              <li>
                <Link to='/'>Hướng dẫn đặt hàng</Link>
              </li>
              <li>
                <Link to='/'>Giải quyết phản hồi</Link>
              </li>
              <li>
                <Link to='/'>Giấy phép kinh doanh</Link>
              </li>
            </ul>
          </div>
          <div className='content__account'>
            <h4>TÀI KHOẢN</h4>
            <ul className='account__list'>
              <li>
                <Link to='/'>Đăng ký</Link>
              </li>
              <li>
                <Link to='/'>Đăng nhập</Link>
              </li>
              <li>
                <Link to='/'>Kiểm tra đơn hàng</Link>
              </li>
            </ul>
          </div>
          <div className='content__social'>
            <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
            <div className='social__list'>
              <Link to='/'>
                <img src={zaloIcon} alt='zalo logo' />
              </Link>
              <Link to='/'>
                <img src={fbIcon} alt='facebook logo' />
              </Link>
              <Link to='/'>
                <img src={ggIcon} alt='google logo' />
              </Link>
              <Link to='/'>
                <img src={ytIcon} alt='youtube logo' />
              </Link>
            </div>
          </div>
        </div>
        <div className='info__license'>
          <p>
            <span>© 2019</span> - Bản quyền thuộc về Công Ty Dược Phẩm Phano
          </p>
          <img src={bctIcon} alt='BCT logo' />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
