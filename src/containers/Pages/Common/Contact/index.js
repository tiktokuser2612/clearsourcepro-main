import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Common as CommonBanner } from 'components/Banners';

const ContactPage = () => {
  const history = useHistory();

  const gotoUrl = (url) => () => {
    history.push(url);
  };

  return (
    <>
      <div class="container">
        <h4 class="style_h4 mt-4">Contact Us</h4>
        <div class="out_border_wrapper">
            <div class="row">
              <div class="col-md-12">
                  <div class="contact_us_content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.Lorem ipsum dolor sit amet, consectetur adipis cing elit,  eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices vida. Lorem dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum pendisse ultricet amet, consectetur adipis cing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                    </p>
                  </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                  <div class="contact_us_info">
                    <h2>General Enquiries</h2>
                    <div class="d-flex align-items-start">
                        <img src="/images/icon_4.png" alt=""/>
                        <p>
                          <strong>Address</strong>
                          123 Street name, Suit 2B <br/>
                          New York, USA
                        </p>
                    </div>
                    <div class="d-flex align-items-start">
                        <img src="/images/icon_5.png" alt=""/>
                        <p>
                          <strong>Phone</strong>
                          012 345 6789 <br/>
                          123 456 7890
                        </p>
                    </div>
                    <div class="d-flex align-items-start">
                        <img src="/images/icon_6.png" alt=""/>
                        <p>
                          <strong>Email</strong>
                          infoyour@email.com
                        </p>
                    </div>
                    <div class="d-flex align-items-start">
                        <img src="/images/icon_7.png" alt=""/>
                        <p>
                          <strong>Website</strong>
                          companywebsite.com
                        </p>
                    </div>
                  </div>
              </div>
              <div class="col-md-8">
                  <div class="contact_us_form">
                    <h2>Leave us your info</h2>
                    <div class="row">
                        <div class="col-md-6">
                          <input placeholder="Name" type="text"/>
                        </div>
                        <div class="col-md-6">
                          <input placeholder="Email" type="text"/>
                        </div>
                        <div class="col-md-12">
                          <input placeholder="Subject" type="text"/>
                        </div>
                        <div class="col-md-12">
                          <textarea placeholder="Message"></textarea>
                        </div>
                        <div class="col-md-12">
                          <button type="button">Submit Now</button>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
