import React from "react";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
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
                        <input className="newsletter" defaultValue="Email" placeholder="Email Address" type="text" />
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
    )
}
