import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicHeader() {
    return (
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
                                    <li><Link to="/login">Sign In Now</Link></li>
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
                                            <Link className="nav-link" to="/user/account">Home<span className="sr-only">(current)</span></Link>
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
    )
}
