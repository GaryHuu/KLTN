import React from 'react'
import aboutUsImgVision from 'assets/img/about_us_vision.png'
import aboutUsImgCommit from 'assets/img/about_us_commit.png'
import aboutUsImgValue from 'assets/img/about_us_value.png'
import aboutUsImg from 'assets/img/about-us.png'
import aboutUsImgPeople from 'assets/img/about_us_item_5.png'
import { Link } from 'react-router-dom'

function AboutUs() {
  return (
    <div className='about-us'>
      <div
        className='breadcrumb-container'
        style={{ backgroundImage: `url('${aboutUsImg}')` }}
      >
        <div className='breadcrumb-overlay' />
        <div className='container'>
          <div className='content'>
            <h1 className='title'>Về chúng tôi</h1>
            <div className='breadcrumb'>
              <Link to='/'>
                <p>Trang chủ</p>
              </Link>
              <span>/</span>
              <Link to='/about-us'>
                <p>Về chúng tôi</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='information'>
          <h3 className='title'>Về Chúng Tôi</h3>
          <div className='hero'>
            <div className='left'>
              <img src={aboutUsImgPeople} alt='' />
            </div>
            <div className='right'>
              <div className='head'>
                <h4>Công ty cổ phần dược phẩm</h4>
                <h3>PhanoLink</h3>
              </div>
              <div className='content'>
                <h3>Về chúng tôi</h3>
                <p>
                  Năm 2022 đánh dấu 1 bước ngoặc trọng đại với việc thành lập
                  công ty CP Dược Phẩm PhanoLink.
                  <br />
                  Nhà Thuốc PhanoLink đã có mặt tại địa chỉ số 1, Võ Văn Ngân,
                  Phường Linh Chiểu, Quận Thủ Đức, Thành Phố Hồ Chí Minh.
                  <br />
                  Hiện nay PhanoLink đang phát triển với mô hình cung cấp dược
                  phẩm từ xa cho khách hàng. Và đang lên kế hoạch mở rộng quy mô
                  tại phòng khám và bệnh viện, tiên phong với mô hình nhà thuốc
                  bên trong siêu thị, trung tâm thương mại.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='vision'>
          <h3 className='title'>Tầm nhìn sứ mệnh</h3>
          <img src={aboutUsImgVision} alt='' />
        </div>
        <div className='vision'>
          <h3 className='title'>PhanoLink cam kết</h3>
          <img src={aboutUsImgCommit} alt='' />
        </div>
        <div className='vision'>
          <h3 className='title'>Giá trị cốt lõi</h3>
          <img src={aboutUsImgValue} alt='' />
        </div>
      </div>
    </div>
  )
}

export default AboutUs
