import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';

import { Avatar, Badge } from 'antd';

// const loggedInUser = localStorage.getItem("user");

// console.log(loggedInUser.id);
//     const renderAuthButton = () => {
//         if(loggedInUser.length === 0){
//             console.log(loggedInUser);
//             return <h2>Hello</h2>;
//         }
//     }
const avatarMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/logout">
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  ); 

export default function PublicHeader(props) {
    const location = useLocation() ;
    
    const user = props?.user;

    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //     if (localStorage.getitem('accessToken') === "") {
    //         const data = 1;
    //     }
    // });


    // let navClass = linkArray.includes(location.pathname) ? "header_link_section" : "header_link_section header_innerpage"
    return (
        <header className="header">
            <div className="header_top_section ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-md-flex justify-content-between align-items-center">
                                <ul className="social_icons" style={ {marginBlock : "8px"}}>
                                    <li><a href="#"><img src="/images/p_icon.png" alt="" /></a></li>
                                    <li><a href="#"><img src="/images/insta_icon.png" alt="" /></a></li>
                                    <li><a href="#"><img src="/images/t_icon.png" alt="" /></a></li>
                                    <li><a href="#"><img src="/images/in_icon.png" alt="" /></a></li>
                                </ul>
                                {

                                    (() => {
                                        if (    
                                            location.pathname.includes('candidate')
                                            ||
                                            location.pathname.includes('dashboard') 
                                            ||
                                            location.pathname.includes('client')
                                            ||
                                            location.pathname.includes('requisition') 
                                            ||
                                            location.pathname.includes('recruiter')
                                            ||
                                            location.pathname.includes('report')
                                            ||
                                            location.pathname.includes('user')
                                        ){
                                            return (
                                                <ul className="header_top_links">
                                                    <li><Link to="/need-to-hire">I am an Employer</Link></li>
                                                    <li><Link to="/looking-for-jobs">I am a Job Seeker</Link></li>
                                                    <li data-toggle="modal" data-target="#signup"><a href="#">Sign Up</a></li>
                                                    <li><Link to="/login">Sign In Now</Link></li>
                                                </ul>
                                            )
                                        }else if( location.pathname === "/" ){
                                            return (
                                                <div class="phone_no">
                                                    <p><i class="fa fa-phone" aria-hidden="true"></i> (888)706-0440</p>
                                                </div>
                                            )
                                        }
                                    
                                        
                                    })()
                                }

                                

                                

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
                                    <ul className="navbar-nav mr-auto" >
                                        <li className={ location.pathname === "/" ? "nav-item active" : "nav-item" }>
                                            <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                                        </li>
                                        {/* <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Requisitions
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </li> */}
                                        <li className={ location.pathname === "/looking-for-jobs" ? "nav-item active" : "nav-item" }>
                                            <Link className="nav-link" to="/looking-for-jobs">Looking for a job?</Link>
                                        </li>
                                        <li className={ location.pathname === "/need-to-hire" ? "nav-item active" : "nav-item" }>
                                            <Link className="nav-link" to="/need-to-hire">Need to hire?</Link>
                                        </li>
                                        <li className={ location.pathname === "/how-to-apply" ? "nav-item active" : "nav-item" }>
                                            <Link className="nav-link" to="/how-to-apply">How to Apply</Link>
                                        </li>
                                        <li className={ location.pathname === "/contact" ? "nav-item active" : "nav-item" }>
                                                <Link className="nav-link" to="/contact">Contact Us</Link>
                                        </li>
                                    
                                    {

                                        (() => {

                                            if (    
                                               user && localStorage.getItem('refreshToken') 
                                            ){
                                                return (
                                                    
                                                    // <li className=
                                                    //     { location.pathname === "/how-to-apply" ? "nav-item active" : "nav-item" }
                                                    // >
                                                    // <Link className="nav-link" to="/logout">Logout</Link></li>
                                                    <li className="nav-item nav_btn">
                                                        
                                                        
                                                            <Badge dot={false}>
                                                            <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
                                                                <Avatar size="large"
                                                                        src={(user && user.photo_url) || ''}>{(user && user.username) || ''}</Avatar>
                                                            </Dropdown>
                                                            </Badge>
                                                            
                                                        
                                                    </li>
                                                    
                                                )
                                            }else{
                                                return (
                                                    <Link style={{ marginBlock: "21.10px" }} to="/login"><button class="apply_btn px-3" type="button">Login / Register</button></Link>
                                                )
                                            }

                                        })()    

                                    }






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
