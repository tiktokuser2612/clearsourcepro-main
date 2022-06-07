import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  login,
} from 'store/actions/auth';
import LoadingIndicator from 'components/LoadingIndicator';


const AdminSignIn = ({ history, login, isPostingLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStatus,setPasswordStatus] = useState(1);
  const [errors, setErrors] = useState([]);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const onLogin = () => {
    if (email !== '' && password !== '') {
      setErrors([]);

      let formData = {
        email: email,
        password: password,
        user_role: 'admin',
      };

      login(formData).then(response => {
        history.push('/admin/dashboard'); // redirect to cases page.
      }).catch(err => {
        setErrors(['Email or password is incorrect.']);
        // notifier.error('Can not login!');
      });
    }
  };

  const handlePasswordInputKeypress = e => {
    if (e.nativeEvent.key === 'Enter') {
      onLogin();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-4">
          <div className="modal-dialog" style={{maxWidth: "800px"}} role="document">
            <div className="modal-content" style={{borderRadius: "15px"}}>
              <div className="modal-body" style={{background: "#fff", borderRadius: "15px"}}>
                <div className="signup_popup">
                  <LoadingIndicator isLoading={isPostingLogin} />

                  {!showForgotPassword
                    ? (
                      <>
                        <div className="signup_logo">
                          <h1>Admin Sign In</h1>
                        </div>
                          {!!errors.length && (
                            <div className="alert alert-danger mt-4">
                              {errors.map((val, index) => (<span key={index}>{Array.isArray(val) ? val[0] : val}</span>))}
                            </div>
                          )}

                        <div className="signup_form">
                          <label>Email</label>
                            <div>
                              <img src="/images/email_icon.png" alt=""/>
                              <input placeholder="Enter your email" type="email" id="email" name="email" value={email}
                                  onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="signup_form">
                          <label>Password</label>
                          <div>
                            <img className="lockicon" src="/images/lock_icon.png" alt="" />
                            <input placeholder="Enter password" type={passwordStatus ? 'password' : 'text'} id="password" name="password" value={password}
                                  onKeyPress={handlePasswordInputKeypress}
                                  onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          
                          
                        </div>
                        <div className="signup_form">
                          <button className="register_btn mt-4" onClick={onLogin} disabled={isPostingLogin}>Sign In</button>
                          <a className="other_link" href="#" onClick={() => setShowForgotPassword(true)}>ForgotPassword?</a>
                        </div>
                      </>
                    )
                    : (
                      <>
                        <h1>Admin Forgot Password</h1>

                        <div className="login_form">
                          <input placeholder="Email Address" type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <a className="ml-3" href="#" onClick={() => setShowForgotPassword(false)}>Login</a>
                        </div>
                      </>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminSignIn.propTypes = {
  history: PropTypes.object.isRequired,

  isPostingLogin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  isPostingLogin: store.rootReducer.auth.isPostingLogin,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    login,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignIn);