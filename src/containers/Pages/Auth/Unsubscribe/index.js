import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  unsubscribe,
} from 'store/actions/auth';

import {
  Spin,
  Card,
} from 'antd';

import notifier from 'utils/notifier';

class UnsubscribePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUnsubscribeFinished: false,
      isSuccessful: false,
    };
  }

  async componentDidMount() {
    // Get code from url, verify, update status
    const unsubscribeCode = this.props.match.params.unsubscribeCode;
    const unsubscribeEmail = this.props.match.params.unsubscribeEmail;

    if (unsubscribeCode && unsubscribeEmail) {
      this.props.unsubscribe(unsubscribeCode, unsubscribeEmail)
        .then(res => {
          notifier.success(res.msg);
          this.setState({
            isUnsubscribeFinished: true,
            isSuccessful: true,
          });
        })
        .catch(err => {
          notifier.error(err.msg);
          this.setState({
            isUnsubscribeFinished: true,
            isSuccessful: false,
          });
        });
    }

  }

  render() {
    const {
      isUnsubscribeFinished,
      isSuccessful,
    } = this.state;

    const {
      isPostingUnsubscribe,
    } = this.props;

    return (
      <div>
        <Spin spinning={isPostingUnsubscribe} />
        <Card>
          {isUnsubscribeFinished &&
          <div className={(isSuccessful ? 'success' : 'fail') + ' email-verify'}>
            {isSuccessful
              ? <h2>Successfully unsubscribed.</h2>
              : <div>Sorry, Can not unsubscribe this time.</div>
            }
          </div>
          }
        </Card>
      </div>
    );
  }
}

UnsubscribePage.propTypes = {
  location: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired,

  isPostingUnsubscribe: PropTypes.bool.isRequired,

  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isPostingUnsubscribe: state.rootReducer.auth.isPostingUnsubscribe,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  unsubscribe,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UnsubscribePage);
