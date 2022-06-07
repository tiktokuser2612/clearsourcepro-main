import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const ApplyToJobPage = () => {
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
                    <li><a href="#">Sign In Now</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header_link_section">
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
                        <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/view-all-jobs" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
      {/* <!-- Banner start here --> */}

      <div className="banner_section job_banner">
        <img src="/images/job_detail_banner.png" alt="" />
        <div className="banner_text align-items-end">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="banner_section_bottom d-md-flex justify-content-between align-items-center">
                  <div className="d-md-flex align-items-center">
                    <span className="job_icon"><img src="/images/job_logo.png" alt="" /></span>
                    <div className="job_info">
                      <h3><Link to="/user/jobs/123">Assistant Bank Manager</Link></h3>
                      <div className="bank_details">
                        <p><img src="/images/bag_icon_3.png" alt="" /> ABCD Bank</p>
                        <p className="ml-4"><img src="/images/calander_icon_2.png" alt="" /> <strong>Post Date :</strong> 09 / 21 / 2020</p>
                      </div>
                      <div className="bank_details">
                        <p><img src="/images/calander_icon_2.png" alt="" /> <strong>Apply Before :</strong> 09 / 30 / 2020</p>
                        <p><img src="/images/bag_icon_3.png" alt="" /> $ 22K/M</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="save_btn" type="button"> <img src="/images/heart_icon.png" alt="" /> Save</button>
                    <button className="save_btn apply_btn ml-3" type="button">Apply Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Banner end here --> */}

      {/* <!-- Body start here --> */}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="inner_page_heading">
              <h1>Apply to Job</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="assistant_manager_section job_detail_body">
              <h3>Job Details</h3>
              <div className="assistant_body p-0 ">
                <div className="row ">
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_6.png" alt="" />
                      <h6><strong>Location: </strong>NewYork</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_3.png" alt="" />
                      <h6><strong>Offered Salary: </strong>$ 50 - 70k</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_1.png" alt="" />
                      <h6><strong>Career Level: </strong>Assistant Manager</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_4.png" alt="" />
                      <h6><strong>Experience: </strong>2 Years</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_5.png" alt="" />
                      <h6><strong>Job Type: </strong>Full Time</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_2.png" alt="" />
                      <h6><strong>Industry: </strong>Bank</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_7.png" alt="" />
                      <h6><strong>Qualification: </strong>Bachelor’s Degree</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="assistant_details">
                      <img src="/images/assistant_icon_8.png" alt="" />
                      <h6><strong>Working Days: </strong>6 Days</h6>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h3>Description:</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia derunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritati.

                      <br /><br />Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium. <a href="#"> More
                      View job posting</a>
                    </p>
                    <h3>Recommended Skills:</h3>
                    <ul className="skilltags">
                      <li>Accounting</li>
                      <li>Tally</li>
                      <li>Database managment</li>
                      <li>Accounting</li>
                      <li>Tally</li>
                    </ul>
                    <h3>Cover Letter</h3>
                    <textarea className="textarea_style"></textarea>
                    <h3>Attachments</h3>
                    <div className="attachment_card">
                      <p>Drag or drop your resume</p>
                    </div>
                    <div className="d-flex justify-content-start mb-md-5">
                      <div className="account_form_style">
                        <button className="ml-md-0" type="button">Apply now</button>
                        <button className="transparent" type="button">Cancel</button>
                      </div>
                    </div>



                  </div>
                </div>
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
                  <p>By hitting the <a href="#">"Register"</a> button, you agree to the <a href="#">Terms conditions</a>  and <a href="#">Privacy Policy</a>.</p>
                  <button className="register_btn" type="button">Register</button>
                  <a className="other_link" href="#">Other</a>
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

      {/* <!-- The Modal Schedule Interview --> */}
      <div className="modal schedule_interview_pop" id="schedule_interview">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            {/* <!-- Modal Header --> */}
            <div className="modal-header align-items-center">
              <h4 className="modal-title">Schedule Interview</h4>
              <div>
                <button type="button" className="close" data-dismiss="modal"><img src="/images/close_icon.png" alt="" /></button>
                <button type="button" className="close" data-dismiss="modal"><img src="/images/scale_down_icon.png" alt="" /></button>
                <button type="button" className="close" data-dismiss="modal"><img src="/images/minmize_icon.png" alt="" /></button>
              </div>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="popup_form">
                    <label>Title</label>
                    <input placeholder="Lorem ipsum" type="text" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="popup_form">
                    <label>Timing</label>
                    <input placeholder="09  /  21   /   2020" type="text" />
                    <img className="icon" src="/images/calander_icon_3.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="popup_form">
                <label>Address</label>
                <textarea placeholder="ABC Block, 2C Street, Suit 1A2 , New York City, USA"></textarea>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer border-0 pt-0 mb-4 justify-content-start">
              <button className="save_btn_style" type="button" data-dismiss="modal">Send</button>
            </div>

          </div>
        </div>
      </div>

      {/* <!-- The Modal Remove Job --> */}
      <div className="modal fade update_job_pop" id="remove_job">
        <div className="modal-dialog modal-md">
          <div className="modal-content border-0">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <div className="tick_box">
                <img src="/images/cross_icon.png" alt="" />
              </div>
              <button type="button" className="close" data-dismiss="modal"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <h3>Are you Sure?</h3>
              <h6 className="mb-5">
                Do you really want to remove this job?
              </h6>
              <div className="text-center mb-3">
                <button className="btn_style_1 mr-3" type="button" data-dismiss="modal">No</button>
                <button className="btn_style_3" type="button" data-dismiss="modal">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ApplyToJobPage;
