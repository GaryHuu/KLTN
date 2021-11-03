import React from 'react';

function withLoading(WrappedComponent) {
  return (props) => {
    const showLoading = (className) => {
      document.body.classList.add('loading-data');
      if (className) document.body.classList.add('top');
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const hideLoading = () => {
      document.body.classList.remove('loading-data');
      document.body.classList.remove('top');
      scrollToTop();
    };

    return (
      <WrappedComponent
        showLoading={showLoading}
        hideLoading={hideLoading}
        {...props}
      />
    );
  };
}

export default withLoading;
