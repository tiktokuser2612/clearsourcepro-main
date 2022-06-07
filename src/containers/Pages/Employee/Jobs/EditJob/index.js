import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const EmployeeEditJobPage = () => {
  const history = useHistory();

  const gotoUrl = (url) => () => {
    history.push(url);
  };

  return (
    <>

      {/* <!-- Header start here --> */}
      <header className="header">
        <div className="header_top_section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-md-flex justify-content-between align-items-center">
                  <ul className="social_icons">
                    <li><a href="#"><img src="/images/p_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/insta_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/t_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/in_icon.png" alt="" /></a></li>
                  </ul>
                  <ul className="header_top_links">
                    <li><Link to="/need-to-hire">I am an Employer</Link></li>
                    <li><Link to="/looking-for-jobs">I am a Job Seeker</Link></li>
                    <li data-toggle="modal" data-target="#signup"><a href="#">Sign Up</a></li>
                    <li data-toggle="modal" data-target="#signin"><a href="#">Sign In Now</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header_link_section header_innerpage">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav className="navbar navbar-expand-lg navbar-light nav_custon_style d-flex justify-content-between">
                  <Link className="navbar-brand" to="/">
                    <img src="/images/logo.png" alt="" />
                  </Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/employee/account">Home<span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/employee/jobs" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          View all jobs 6
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/looking-for-jobs">Looking for a job?</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/need-to-hire">Need to hire?</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/how-to-apply">How to apply</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="header_top_section link_show">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ul className="header_top_links">
                  <li><a href="#">Employer</a></li>
                  <li><a href="#">Job Seeker</a></li>
                  <li data-toggle="modal" data-target="#signup"><a href="#">Sign Up</a></li>
                  <li><a href="#">Sign In</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- Header End here --> */}


      {/* <!-- Body start here --> */}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="inner_page_heading">
              <h1>Edit My Job</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="account_form_section">
              <h2 className="pt-md-5">Job Detail</h2>
            </div>
          </div>
          <div className="col-md-8">
            <div className="account_form_section m_top">
              <div className="account_form_bg">
                <div className="row">
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Job Title</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Industry</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Offered Salary</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Experience</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Job Type</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Location</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Qualification</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <label>Working Days</label>
                      <input placeholder="text here" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="account_form_section">
              <h2 className="pt-md-5">Description</h2>
            </div>
          </div>
          <div className="col-md-8">
            <div className="account_form_section py-md-3  m_top">
              <div className="account_form_bg">
                <div className="row">
                  <div className="col-md-12">
                    <div className="account_form_style m-0">
                      <textarea placeholder="ABCD Company">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu nt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus com odo viverra maecenas accumsan lacus vel facilisis.</textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="account_form_section">
              <h2 className="pt-md-5">Recommanded Skills</h2>
            </div>
          </div>
          <div className="col-md-8">
            <div className="account_form_section  m_top">
              <div className="account_form_bg">
                <div className="row">
                  <div className="col-md-6">
                    <div className="account_form_style">
                      <div className="custom-select">
                        <select>
                          <option>Add Skills</option>
                          <option>Add Skills 2</option>
                          <option>Add Skills 3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="account_form_style">
                      <label>Skills</label>
                      <div className="tags_pill">
                        <span>Accounting</span>
                        <span>Tally</span>
                        <span>Database managment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="account_form_style">
                <button type="button" onClick={gotoUrl('/employee/jobs/123')}>Update Job</button>
                <button className="cancel" type="button" onClick={gotoUrl('/employee/jobs/123')}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Body end here --> */}


      {/* <!-- Footer start here --> */}

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <a className="footer_logo" href="#"><img src="/images/footer_logo.png" alt="" /></a>
              <p>
                Lorem Ipsum is simply dummy text a type specimen book. a tmen book.  of the and typesetting industry. Lorem Ipsum has is been make a type specimen book. Lorem Ipsum is simply dummen me specimen book.
              </p>
              <ul className="footer_social">
                <li><a href="#"><img src="/images/f_fb_icon.png" alt="" /></a></li>
                <li><a href="#"><img src="/images/f_insta_icon.png" alt="" /></a></li>
                <li><a href="#"><img src="/images/f_twitter_icon.png" alt="" /></a></li>
                <li><a href="#"><img src="/images/f_in_icon.png" alt="" /></a></li>
              </ul>
            </div>
            <div className="col-md-4 d-md-flex justify-content-between">
              <div>
                <h1>Information</h1>
                <ul className="footer_link">
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Tearm & Conditions</Link></li>
                </ul>
              </div>
              <div>
                <h1>Account</h1>
                <ul className="footer_link">
                  <li><Link to="/user/account">My Account</Link></li>
                  <li><Link to="/">Browse Candidates</Link></li>
                  <li><Link to="/">Browse Employees</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <h1>Newsletter</h1>
              <p>
                Lorem Ipsum is simply dummy text a type specimen book. a tmen bis not goodoo typesetting industry.
              </p>
              <input className="newsletter" value="Email" placeholder="Email Address" type="text" />
              <button className="subscribe_btn" type="button">Sign up Now!</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h6 className="copyright_text">Copyright 2020 Clear Source recruitment. All Right Reserved.</h6>
            </div>
          </div>
        </div>
      </footer>

      {/* <!-- Footer end here --> */}

      {/* <!-- Modal sign up --> */}
      <div className="modal fade" id="signup" tabindex="-1" role="dialog"  aria-hidden="true">
        <div className="modal-dialog" style={{ maxWidth: 800 }} role="document">
          <div className="modal-content" style={{ borderRadius: 15 }}>
            <div className="modal-body" style={{ background: '#f3f7fb', borderRadius: 15 }}>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="signup_popup">
                <div className="signup_logo">
                  <span><img src="/images/logo_icon.png" alt="" /></span>
                  <h1>Create An Account</h1>
                </div>
                <div className="text-center">
                  <div className="switch_btns">
                    <button className="active" type="button">Candidate</button>
                    <button type="button">Employer</button>
                  </div>
                </div>
                <div className="signup_form">
                  <label>USERNAME</label>
                  <div>
                    <img src="/images/profile_icon_l.png" alt="" />
                    <input placeholder="Enter user name" type="text" />
                  </div>
                </div>
                <div className="signup_form">
                  <label>Email</label>
                  <div>
                    <img src="/images/email_icon.png" alt="" />
                    <input placeholder="Enter your email" type="text" />
                  </div>
                </div>
                <div className="signup_form mb-1">
                  <label>Password</label>
                  <div>
                    <img className="lockicon" src="/images/lock_icon.png" alt="" />
                    <input placeholder="Enter password" type="text" />
                  </div>
                </div>
                <div className="signup_form">
                  <p></p>
                  <button className="register_btn" type="button">Register</button>

                </div>
                <div className="or_design">
                  <h3>Or</h3>
                </div>
                <div className="social_icons">
                  <ul>
                    <li><a href="#"><img src="/images/fb_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/gplush_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/twitter_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/linkedin_icon.png" alt="" /></a></li>
                  </ul>
                </div>
                <div className="signup_form text-center">
                  <p>Have an account?  <a href="#">Sign In</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal sign up end --> */}

      {/* <!-- Modal sign in --> */}
      <div className="modal fade" id="signin" tabindex="-1" role="dialog"  aria-hidden="true">
        <div className="modal-dialog" style={{ maxWidth: 800 }} role="document">
          <div className="modal-content" style={{ borderRadius: 15 }}>
            <div className="modal-body" style={{ background: '#f3f7fb', borderRadius: 15 }}>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="signup_popup">
                <div className="signup_logo">
                  <span><img src="/images/logo_icon.png" alt="" /></span>
                  <h1>Sign In</h1>
                </div>

                <div className="signup_form">
                  <label>USERNAME</label>
                  <div>
                    <img src="/images/profile_icon_l.png" alt="" />
                    <input placeholder="Enter user name" type="text" />
                  </div>
                </div>
                <div className="signup_form">
                  <label>Email</label>
                  <div>
                    <img src="/images/email_icon.png" alt="" />
                    <input placeholder="Enter your email" type="text" />
                  </div>
                </div>
                <div className="signup_form mb-1">
                  <label>Password</label>
                  <div>
                    <img className="lockicon" src="/images/lock_icon.png" alt="" />
                    <input placeholder="Enter password" type="text" />
                  </div>
                </div>
                <div className="signup_form">
                  <p>By hitting the <a href="#">"Register"</a> button, you agree to the <a href="#">Terms conditions</a>  and <a href="#">Privacy Policy</a>.</p>
                  <button className="register_btn" type="button">Register</button>
                  <a className="other_link" href="#">Forget Password?</a>
                </div>
                <div className="or_design">
                  <h3>Or</h3>
                </div>
                <div className="social_icons">
                  <ul>
                    <li><a href="#"><img src="/images/fb_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/gplush_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/twitter_icon.png" alt="" /></a></li>
                    <li><a href="#"><img src="/images/linkedin_icon.png" alt="" /></a></li>
                  </ul>
                </div>
                <div className="signup_form text-center">
                  <p>Have an account?  <a href="#">Sign In</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal sign in end --> */}
    </>
  );
};

export default EmployeeEditJobPage;
