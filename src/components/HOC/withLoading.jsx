import React from 'react';

function withLoading(WrappedComponent) {
  return (props) => {
    const showLoading = () => {
      document.body.classList.add('loading-data');
    };

    const hideLoading = () => {
      document.body.classList.remove('loading-data');
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
