import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import iconMoveTop from 'assets/img/button-move-top.png';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: '50px',
        bottom: '50px',
        cursor: 'pointer',
        zIndex: 99,
      }}
      className='scroll-to-top'
    >
      {isVisible && (
        <div onClick={scrollToTop}>
          <img
            style={{
              width: '50px',
            }}
            src={iconMoveTop}
            alt='Go to top'
          />
        </div>
      )}
    </div>
  );
}
