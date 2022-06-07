import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { to } from 'await-to-js';

import { verifyEmail } from 'store/actions/auth';

import {
  Button,
  Spin,
  Card,
} from 'antd';

class VerifyEmailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVerifyFinished: false,
      isSuccessful: false,
      msg: '',
    };
  }

  async componentDidMount() {
    // Get code from url, verify, update status
    const code = this.props.match.params.code;
    if (!code) {
      this.setState({
        isVerifyFinished: true,
        isSuccessful: false,
        msg: 'Invalid verification token!',
      });

      return;
    }

    let [err, res] = await to(this.props.verifyEmail(code));
    if (err) {
      this.setState({
        isVerifyFinished: true,
        isSuccessful: false,
        msg: err.msg,
      });
    } else {
      this.setState({
        isVerifyFinished: true,
        isSuccessful: true,
        msg: res.msg,
      });
    }
  }

  render() {
    const {
      isVerifyFinished,
      isSuccessful,
      msg,
    } = this.state;

    const {
      history,
      isPostingVerifyEmail,
    } = this.props;

    return (
      <div>
        <Spin spinning={isPostingVerifyEmail}>
          <Card>
            {isVerifyFinished
              ? (
                <div className={'email-verify' + (isSuccessful ? ' success' : ' fail')}>
                  <h2>{msg}</h2>
                  <Button onClick={() => history.push('/login')}>Login</Button>
                </div>
              )
              : (
                <div className="email-verify">
                  <h2>Verifying email address...</h2>
                </div>
              )
            }
          </Card>
        </Spin>
      </div>
    );
  }
}

VerifyEmailPage.propTypes = {
  history: PropTypes.any.isRequired,
  match: PropTypes.object.isRequired,

  isPostingVerifyEmail: PropTypes.bool.isRequired,

  verifyEmail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isPostingVerifyEmail: state.rootReducer.auth.isPostingVerifyEmail,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  verifyEmail,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage);
