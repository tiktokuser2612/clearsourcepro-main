import { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import $ from 'jquery';

class ScrollToTop extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // console.log('Scroll to top');
      $(window).scrollTop(0);
      // setTimeout(() => {
      //   window.initDropdowns()
      // });
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.any,
  children: PropTypes.any,
};

export default withRouter(ScrollToTop);
