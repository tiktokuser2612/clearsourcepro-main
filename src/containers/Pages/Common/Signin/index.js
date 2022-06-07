import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  login,
} from 'store/actions/auth';
import notifier from 'utils/notifier';
import LoadingIndicator from 'components/LoadingIndicator';
import AccountExecutive from 'containers/Pages/AccountExecutive';


const SignIn = ({ login, isPostingLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStatus,setPasswordStatus] = useState(1);
  const [errors, setErrors] = useState([]);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [client, setClient] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [accountExecutive, setAccountExecutive] = useState(false);

  const handleClient = (event) => {
    event.preventDefault();
    setClient(true);
    setRecruiter(false);
    setCandidate(false);
    setAccountExecutive(false);
  }
  
  const handleCandidate = (event) => {
    event.preventDefault();
    setClient(false);
    setRecruiter(false);
    setAccountExecutive(false);
    setCandidate(true);
  }

  const handleRecruiter = (event) => {
    event.preventDefault();
    setClient(false);
    setRecruiter(true);
    setCandidate(false);
    setAccountExecutive(false);
  }

  const handleAccountExecutive = (event) => {
    event.preventDefault();
    setClient(false);
    setAccountExecutive(true);
    setRecruiter(false);
    setCandidate(false);
  }


  const onLogin = () => {
    if (email !== '' && password !== '') {
      setErrors([]);
      // Check user role start
      
      if(!candidate && !client && !recruiter && !accountExecutive){
        // notifier.error('Please select a role(Client , Recruiter or Candidate)');
        setErrors(['Please select your role']);
        return
      }

      let role = ''

      if(client){
        role = 'client';
      }
      if(recruiter){
        role = 'recruiter';
      }

      if(candidate){
        role = 'candidate';
      }
      if(accountExecutive){
        role = 'account_executive';
      }
      // Check user role end

      let formData = {
        email: email,
        password: password,
        user_role: role,
      };
      

      login(formData).then(response => {
        history.push(`/${role}`); // redirect to cases page.
      }).catch(err => {
        console.log('AmitGupte',err);
        // setErrors(['Email or password is incorrect.']);
        setErrors([err.msg]);
        
        // notifier.error(err.msg);
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
                <div className="modal-content" style={{bordeRadius: '0.9rem !important'}}>
                    <div className="modal-body" style={{background: '#fff', borderRadius: '15px'}}>
            
                    
                        <div className="signup_popup">
                          <div className="signup_logo">
                            <h1>Sign In</h1>
                          </div>
                          
                          <div className="text-center">
                            <div className="switch_btns">
                              <button className={client === true ? 'active' : ''} onClick={handleClient} type="button">Client</button>
                              <button className={recruiter === true ? 'active' : ''} onClick={handleRecruiter} type="button">Recruiter</button>
                              <button className={candidate === true ? 'active' : ''} onClick={handleCandidate} type="button">Candidate</button>
                              <button className={accountExecutive === true ? 'active' : ''} onClick={handleAccountExecutive} type="button">Account Executive</button>
                            </div>
                          </div>    

                          {!!errors.length && (
                            <div className="alert alert-danger mt-4">
                              {
                                errors.map((val, index) => (
                                  <li key={index}>
                                    
                                    { val /* {Array.isArray(val) ? val : ''} */}
                                  </li>
                                ))
                              }
                            </div>
                          )}

                          <div className="signup_form">
                              <label>Email</label>
                              <div>
                                  <img src="/images/email_icon.png" alt="" />
                                  <input placeholder="Enter your email" type="email" id="email" name="email" value={email}
                                  onChange={(e) => setEmail(e.target.value)} />
                              </div>
                          </div>
                          <div className="signup_form mb-1">
                              <label>Password</label>
                              <div>
                                  <img className="lockicon" src="/images/lock_icon.png" alt="" />
                                  <input placeholder="Enter password" type={passwordStatus ? 'password' : 'text'} id="password" name="password" value={password}
                                        onKeyPress={handlePasswordInputKeypress}
                                        onChange={(e) => setPassword(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className="signup_form mt-4"> 
                              <p >By hitting the <a href="#">"Sign In"</a> button, you agree to the <a href="#">Terms conditions</a>  and <a href="#">Privacy Policy</a>.</p>
                              <button className="register_btn" onClick={onLogin} type="button">Sign In</button>
                              
                          </div>
                          <div className="or_design">
                              <h3>Or</h3>
                          </div>
                          <div className="social_icons">
                              <ul>
                                  <li><a href="#"><img src="./images/fb_icon.png" alt="" /></a></li>
                                  <li><a href="#"><img src="./images/gplush_icon.png" alt="" /></a></li>
                                  <li><a href="#"><img src="./images/twitter_icon.png" alt="" /></a></li>
                                  <li><a href="#"><img src="./images/linkedin_icon.png" alt="" /></a></li>
                              </ul>
                          </div>
                          <div className="signup_form text-center">
                              <p>New User?  <a href="#">Sign Up</a></p>
                          </div>
                        </div>
                    </div>
                </div>
                </div>
          </div>
        </div>
    </div>
  );
};


SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  isPostingLogin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  isPostingLogin: store.rootReducer.auth.isPostingLogin,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    login,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps) (SignIn);