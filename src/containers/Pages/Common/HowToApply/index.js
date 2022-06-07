import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const HowToApplyPage = () => {
  const history = useHistory();

  const gotoUrl = (url) => () => {
    history.push(url);
  };

  return (
    <>

      {/* <!-- Body start here --> */}

      <div class="container">
        <h4 class="style_h4 mt-4">How to Apply</h4>
        <div class="out_border_wrapper">
            
            <div class="row">
              <div class="col-md-4">
                  <div class="how_works_card">
                    <span class="how_works_icon"><img src="/images/how_works_icon_3.png" alt=""/></span>
                    <h5>Create Account</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="how_works_card">
                    <span class="how_works_icon"><img src="/images/how_works_icon_2.png" alt=""/></span>
                    <h5>Job Search</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="how_works_card">
                    <span class="how_works_icon"><img src="/images/how_works_icon_1.png" alt=""/></span>
                    <h5>Save and Apply</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                  </div>
              </div>
            </div>
            <div class="contact_help_section">
              <div class="container">
                  <div class="row">
                    <div class="col-md-7 m-auto">
                        <h1>Need Any Help? </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                        <div class="help_form">
                          <label>Code Name</label>
                          <input type="text"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="help_form">
                          <label>OTP</label>
                          <input type="text"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="help_form">
                          <label>Lot No</label>
                          <input type="text"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="help_form">
                          <label>location</label>
                          <input type="text"/>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="help_form">
                          <label>Your message</label>
                          <textarea></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="help_form">
                          <button type="button">Send</button>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                  <div class="col-md-7 m-auto">
                    <div class="help_section">
                        <h1>Let us help you get started</h1>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been make a type specimen book.
                        </p>
                    </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12 d-md-flex justify-content-between">
                    <div class="help_card">
                        <span><img src="/images/help_icon_1.png" alt=""/></span>
                        <div>
                          <h3>Need to Hire?</h3>
                          <p>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                          </p>
                          <a href="#">HIRE NOW</a>
                        </div>
                    </div>
                    <div class="help_card">
                        <span><img src="/images/help_icon_2.png" alt=""/></span>
                        <div>
                          <h3>Looking for job?</h3>
                          <p>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                          </p>
                          <a href="#">FIND JOB
                          </a>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>

      {/* <!-- Body end here --> */}

    </>
  );
};

export default HowToApplyPage;
